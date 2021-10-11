import { View } from "react-native";
import { Button } from "react-native-paper";
import React, { FC } from "react";
import styles from "./styles";
import { Text } from "react-native-paper";
import { Schedule } from "../Schedule/Schedule";
import { weekDaysArr } from "../../utils/GetAllWeekDays";
import { Avatar } from "react-native-paper";
import Modal from "react-native-modals";
import { ModalContent } from "react-native-modals";
import getNameAlias from "../../utils/GetNameAlias";

interface Props {
  popUpData: Schedule;
  dialogVisible: boolean;
  setDialogVisible: (state: boolean) => void;
}

const DialogPopup: FC<Props> = ({
  popUpData,
  dialogVisible,
  setDialogVisible,
}) => {
  const convertTime = (time: number): string => {
    if (time < 10) {
      return `0${time}:00`;
    }
    return `${time}:00`;
  };
  const nameAlias = getNameAlias(popUpData.name as string);
  return (
    <Modal
      visible={dialogVisible}
      onTouchOutside={() => setDialogVisible(false)}
    >
      <ModalContent style={styles.container}>
        <Avatar.Text label={nameAlias as string} />
        <View style={styles.textContainer}>
          <Text style={styles.largeText}>{popUpData.name}</Text>
          <Text style={styles.mediumText}>{popUpData.description}</Text>
          <Text style={styles.mediumText}>{`From ${convertTime(
            popUpData.timeStart as number
          )} to ${convertTime(popUpData.timeFinish as number)} ${
            weekDaysArr[popUpData.dayOfWeek as number]
          }`}</Text>
        </View>
      </ModalContent>
      <Button onPress={() => setDialogVisible(false)} style={styles.button}>
        Close
      </Button>
    </Modal>
  );
};

export default DialogPopup;
