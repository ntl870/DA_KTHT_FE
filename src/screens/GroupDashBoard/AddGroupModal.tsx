/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { Button, Checkbox } from "react-native-paper";
import FormController, {
  IFormController,
} from "../../components/FormController/FormController";
import validateEmail from "../../utils/ValidateEmail";
import { authAPI } from "../../apis/axios/auth";
import { selectToken } from "../../store/reducers/AuthSlice";
import DatePicker from "react-native-date-picker";
import Modal, { ModalContent } from "react-native-modals";
import { useSelector, useDispatch } from "react-redux";
import { getGroupDetails } from "../../store/reducers/GroupDetailsSlice";
import { getDashboardGroups } from "../../store/reducers/GroupSlice";
import { AppDispatch } from "../../store";
interface Props {
  visible: boolean;
  onDismiss: () => void;
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
    display: "flex",
    flexDirection: "column",
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
});

const AddGroupModal: FC<Props> = ({ visible, onDismiss }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const formControllerProps: IFormController[] = [
    {
      name: "name",
      control: control,
      label: "Name",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "account",
      style: styles.input,
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
    },
    {
      name: "feePerHour",
      control: control,
      label: "Fine per hour",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "account-cash",
      style: styles.input,
    },
  ];

  const onSubmit = async (form: Form) => {
    try {
      setLoading(true);
      await authAPI(String(token)).put("/groups", form);
    } catch (err) {
    } finally {
      dispatch(getDashboardGroups({ token: String(token), page: 1 }));
      setLoading(false);
      onDismiss();
    }
  };
  return (
    <Modal visible={visible} onTouchOutside={onDismiss}>
      <ModalContent style={styles.container}>
        <ScrollView>
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
        </ScrollView>
      </ModalContent>
    </Modal>
  );
};
export default AddGroupModal;
