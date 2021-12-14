import { Calendar, ICalendarEvent } from "react-native-big-calendar";
import React, { FC, useMemo, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { selectToken } from "../../store/reducers/AuthSlice";
import { selectUserSchedule } from "../../store/reducers/ScheduleSlice";
import { getUserSchedule } from "../../store/reducers/ScheduleSlice";
import { AppDispatch } from "../../store";
import DialogPopup from "../../components/Dialog/Dialog";
import { Status } from "../../types/status";
import styles from "./ScheduleStyle";

interface Event {
  key: number;
  title: string;
  start: number;
  end: number;
}

export interface Schedule {
  name?: string;
  description?: string;
  feePerHour?: number;
  timeStart?: number;
  timeFinish?: number;
  dayOfWeek?: number;
}

const UserSchedule: FC = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [popUpKey, setPopUpKey] = useState<number | null>(0);

  const currentWeek = useMemo(() => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = first + i;
      week.push(new Date(curr.setDate(date)));
    }
    return week;
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const { data: ScheduleData, status } = useSelector(selectUserSchedule);

  const fetchSchedule = useCallback(() => {
    dispatch(getUserSchedule(token as string));
  }, [dispatch, token]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const events: ICalendarEvent<Event>[] =
    status === Status.fulfilled
      ? ScheduleData.map((item, index) => {
          return {
            key: index,
            title: item.name,
            start: currentWeek[item.dayOfWeek as number].setHours(
              item.timeStart as number,
              0
            ),
            end: currentWeek[item.dayOfWeek as number].setHours(
              item.timeFinish as number,
              0
            ),
          } as ICalendarEvent<Event>;
        })
      : [];

  if (status !== Status.fulfilled) {
    return <ActivityIndicator style={styles.flexOne} />;
  }

  return (
    <>
      <Calendar
        events={events}
        height={300}
        swipeEnabled={false}
        onPressEvent={(date) => {
          setPopUpKey(date.key);
          setDialogVisible(true);
        }}
      />
      <DialogPopup
        popUpData={ScheduleData[popUpKey as number]}
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
      />
    </>
  );
};
export default UserSchedule;
