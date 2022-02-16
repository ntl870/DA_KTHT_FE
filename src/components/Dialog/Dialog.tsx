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
const convertTime = (time: number): string => {
  if (time < 10) {
    return `0${time}:${String(time).split(".")[1] || "00"}`;
  }
  return `${time}:${String(time).split(".")[1] || "00"}`;
};

const convertTimeLate = (time: string) => {
  const [hour, minute] = time.split(".");
  if (minute) {
    return `${hour}:${minute}`;
  }
  return "";
};

const DialogPopup: FC<Props> = ({
  popUpData,
  dialogVisible,
  setDialogVisible,
}) => {
  console.log(111122222)
  console.log(11111111)
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
          {popUpData?.checkedIn ? (
            <>
              <Text style={{ ...styles.mediumText, color: "green" }}>
                Checked in
              </Text>
              <Text style={{ color: "red" }}>
                {popUpData?.timeLate !== 0 &&
                  `Late ${convertTimeLate(String(popUpData?.timeLate))} hour`}
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  ...styles.mediumText,
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Haven't Checked in
              </Text>
            </>
          )}
        </View>
      </ModalContent>
      <Button onPress={() => setDialogVisible(false)} style={styles.button}>
        Close
      </Button>
    </Modal>
  );
};

export default DialogPopup;
