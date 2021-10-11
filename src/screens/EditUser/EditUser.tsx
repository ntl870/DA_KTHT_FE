import React, { FC, useState } from "react";
import { View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, Avatar } from "react-native-paper";
import { Asset, launchImageLibrary } from "react-native-image-picker";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import { selectUserInfo } from "../../store/reducers/UserSlice";
import { AppDispatch } from "../../store";
import getNameAlias from "../../utils/GetNameAlias";
import FormController from "../../components/FormController/FormController";
import { IFormController } from "../../components/FormController/FormController";
import { selectToken } from "../../store/reducers/AuthSlice";
import { updateClientAsync } from "../../store/reducers/UserSlice";
import uploadPictureAndGetURL from "../../utils/UploadImageAndGetURL";
import styles from "./styles";
import { MenuScreenProps } from "../../types/screens";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

export interface IUpdateForm {
  name?: string;
  phone?: string;
  avatar?: string;
  password?: string;
}

const EditUserScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone] = useState<boolean>(false);
  const { data } = useSelector(selectUserInfo);
  const [image, setImage] = useState<string>(data?.avatar as string);
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
        } else {
          setImageSelected(false);
        }
      }
    );
  };

  const nameAlias: string | void = getNameAlias(data?.name as string);

  const { handleSubmit, control } = useForm<MenuScreenProps>();
  const token: string = useSelector(selectToken) as string;
  const navigation = useNavigation<MenuScreenProps>();
  const onSubmit = async (form: IUpdateForm) => {
    try {
      setLoading(true);
      if (!Number(form.phone) && form.phone?.length !== 0) {
        setInvalidPhone(true);
        return;
      }

      const imageURL = imageSelected
        ? await uploadPictureAndGetURL(image, "avatar", data?._id as string)
        : data?.avatar;
      dispatch(
        updateClientAsync({
          token: token,
          form: {
            ...form,
            avatar: imageURL ? imageURL : data?.avatar,
          },
        })
      );
    } catch (err) {
    } finally {
      setLoading(false);
      navigation.navigate("MenuScreen");
    }
  };

  const formControllerProps: IFormController[] = [
    {
      name: "name",
      control: control,
      defaultValue: data?.name,
      label: "Name",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "account",
      style: styles.input,
    },
    {
      name: "phone",
      control: control,
      defaultValue: data?.phone,
      error: invalidPhone,
      label: "phone",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "lock",
      style: styles.input,
    },
  ];

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        keyboardVerticalOffset={130}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.root}
      >
        <ScrollView>
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
                label={nameAlias as string}
                style={styles.image}
              />
            )}
            <Button onPress={selectImage}>Select Image</Button>
          </View>
          <View>
            {formControllerProps.map((props) => {
              return <FormController {...props} key={props.name} />;
            })}
          </View>
          <Button
            onPress={handleSubmit(onSubmit)}
            style={styles.input}
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Submit"}
          </Button>
          <Button
            mode="contained"
            style={styles.input}
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          >
            Change Your Password
          </Button>
          <LogoutButton style={styles.input} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default EditUserScreen;
