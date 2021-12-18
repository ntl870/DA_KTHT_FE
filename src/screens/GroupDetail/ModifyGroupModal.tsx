import React, { FC, useMemo, useState, useEffect } from "react";
import Modal, { ModalContent } from "react-native-modals";
import { StyleSheet, ScrollView, View } from "react-native";
import { Button, Avatar } from "react-native-paper";
import FormController, {
  IFormController,
} from "../../components/FormController/FormController";
import { useForm } from "react-hook-form";
import MemberList from "./MemberList";
import { Group } from "../../types/group";
import { authAPI } from "../../apis/axios/auth";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/reducers/AuthSlice";
import { getGroupDetails } from "../../store/reducers/GroupDetailsSlice";
import { AppDispatch } from "../../store";
import getNameAlias from "../../utils/GetNameAlias";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { uploadGroupPictureAndGetURL } from "../../utils/UploadImageAndGetURL";
import { enable, disable } from "../../store/reducers/FABSlice";
import { useSnackbarContext } from "../../hooks/useSnackBarContext";
interface Props {
  visible: boolean;
  onDismiss: () => void;
  groupID: string;
  groupData: Group;
}

interface Form {
  name: string;
  description: string;
  feePerHour: number;
}

const styles = StyleSheet.create({
  input: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    padding: 30,
    width: 400,
    // maxHeight: 600,
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  selectTimeSection: {
    display: "flex",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxSection: { display: "flex", flexDirection: "row" },
  inputItem: {
    marginBottom: 10,
  },
  pickTimeSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  image: {
    marginBottom: 10,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

const ModifyGroupModal: FC<Props> = ({
  visible,
  groupID,
  onDismiss,
  groupData,
}) => {
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const [image, setImage] = useState<string>(groupData?.groupImage as string);
  const { setMessage } = useSnackbarContext();

  const selectImage = (): void => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
      },
      ({ assets }) => {
        if (assets) {
          setImage((assets as Asset[])[0]?.uri as string);
          setImageSelected(true);
          return;
        }
        setImageSelected(false);
      }
    );
  };

  useEffect(() => {
    dispatch(disable());
    return () => {
      dispatch(enable());
    };
  }, [dispatch]);

  const onSubmit = async (form: Form) => {
    try {
      setLoading(true);
      const imageURL = imageSelected
        ? await uploadGroupPictureAndGetURL(
            image,
            "groupImage",
            groupData?._id as string
          )
        : groupData?.groupImage;

      await authAPI(String(token)).patch(`/groups/${groupID}`, {
        ...form,
        feePerHour: Number(form.feePerHour),
        groupImage: imageURL ? imageURL : groupData?.groupImage,
      });
      dispatch(getGroupDetails({ token: String(token), id: groupID }));
      setMessage("Group modified successfully");
    } catch (e) {
      setMessage("Group modified failed");
    } finally {
      setLoading(false);
    }
  };

  const formControllerProps: IFormController[] = useMemo(() => {
    return [
      {
        name: "name",
        control: control,
        label: "Name",
        mode: "outlined",
        outlineColor: "#5D3FD3",
        leftIcon: "account",
        style: styles.input,
        defaultValue: groupData.name,
      },
      {
        name: "description",
        control: control,
        label: "Description",
        mode: "outlined",
        outlineColor: "#5D3FD3",
        leftIcon: "card-text",
        style: styles.input,
        multiline: true,
        numberOfLines: 3,
        defaultValue: groupData?.description,
      },
      {
        name: "feePerHour",
        control: control,
        label: "Fine per hour",
        mode: "outlined",
        outlineColor: "#5D3FD3",
        leftIcon: "account-cash",
        style: styles.input,
        defaultValue: String(groupData?.feePerHour),
      },
    ];
  }, [control, groupData]);

  return (
    <Modal visible={visible} onTouchOutside={onDismiss}>
      <ScrollView>
        <ModalContent style={styles.container}>
          <View style={styles.imageContainer}>
            {image ? (
              <Avatar.Image
                size={150}
                source={{ uri: image }}
                style={styles.image}
              />
            ) : (
              <Avatar.Text
                size={150}
                label={String(getNameAlias(getGroupDetails?.name as string))}
                style={styles.image}
              />
            )}
            <Button onPress={selectImage}>Select Image</Button>
          </View>
          {formControllerProps.map((props) => {
            return <FormController {...props} key={props.name} />;
          })}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              icon={loading ? "refresh" : undefined}
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
            <Button
              mode="contained"
              color="red"
              onPress={onDismiss}
              disabled={loading}
            >
              Close
            </Button>
          </View>
          <MemberList id={groupID} groupData={groupData} />
        </ModalContent>
      </ScrollView>
    </Modal>
  );
};

export default ModifyGroupModal;
