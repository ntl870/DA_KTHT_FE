import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import FormController, {
  IFormController,
} from "../../components/FormController/FormController";
import validateEmail from "../../utils/ValidateEmail";
import { authAPI } from "../../apis/axios/auth";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/reducers/AuthSlice";
import DatePicker from "react-native-date-picker";
import Modal, { ModalContent } from "react-native-modals";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  groupID: string;
}
interface WorkDays {
  dayOfWeek: number;
  timeStart: number;
  timeFinish: number;
}
interface Form {
  email: string;
  workDays: WorkDays[];
}
const styles = StyleSheet.create({
  input: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    padding: 20,
    // width: 300,
    height: 600,
    // display: "flex",
    flexDirection: "row",
    flex: 1,
  },
});

const AddMemberModal: FC<Props> = ({ visible, groupID, onDismiss }) => {
  const token = useSelector(selectToken);
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [workDays, setWorkDays] = useState<WorkDays[]>([]);
  const [inputErrorsIndex, setInputErrorsIndex] = useState<number | null>(null);

  const inputErrors = [
    {
      type: "email",
      error: "Invalid email form",
    },
  ];
  const onSubmit = async (form: Form) => {
    try {
      setLoading(true);
      if (!validateEmail(form.email)) {
        setLoading(false);
        setInputErrorsIndex(0);
        return;
      }
      await authAPI(String(token)).put(`/groups/${groupID}/members`, form);
    } catch (err) {}
  };
  const formControllerProps: IFormController[] = [
    {
      name: "email",
      control: control,
      error: inputErrorsIndex === 0,
      label: "Email",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "email",
      style: styles.input,
    },
  ];
  return (
    <Modal
      visible={visible}
      onTouchOutside={onDismiss}
      style={styles.container}
    >
      <ModalContent>
        {formControllerProps.map((props) => {
          return <FormController {...props} key={props.name} />;
        })}
        <DatePicker date={new Date()} mode="time" />
      </ModalContent>
    </Modal>
  );
};
export default AddMemberModal;
