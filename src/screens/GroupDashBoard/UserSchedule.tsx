import { Calendar, ICalendarEvent } from "react-native-big-calendar";
import React, { FC, useMemo, useState, useEffect, useCallback } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { useToken } from "../../hooks/useToken";
import DialogPopup from "../../components/Dialog/Dialog";
import styles from "./ScheduleStyle";
import { authAPI } from "../../apis/axios/auth";
import { GroupRouteProps, GroupScreenProps } from "../../types/screens";
import { View } from "react-native";

interface Event {
  key: number;
  title: string;
  start: number;
  end: number;
}

export interface Schedule {
  name?: string;
  timeLate: number;
  timeStart?: number;
  timeFinish?: number;
  dayOfWeek?: number;
  _id: string;
  checkedIn: boolean;
}

interface Props {
  route: GroupRouteProps;
  navigation: GroupScreenProps;
}

const UserSchedule: FC<Props> = ({ route }) => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [popUpKey, setPopUpKey] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const { userId, groupId, name, userName } = route?.params as {
    userId: string;
    groupId: string;
    name: string;
    userName: string;
  };
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
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

  const { token } = useToken();

  const fetchSchedule = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await authAPI(String(token)).get(
        `groups/${groupId}/member/${userId}`
      );
      const newData = data.map((item: Schedule) => ({
        ...item,
        name: name,
      }));
      setScheduleData(newData);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [token, groupId, userId, name]);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const events: ICalendarEvent<Event>[] = useMemo(() => {
    return (
      scheduleData.map((item: Schedule, index: number) => {
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
      }) || []
    );
  }, [scheduleData, currentWeek]);

  if (loading) {
    return <ActivityIndicator style={styles.flexOne} />;
  }

  return (
    <>
      <View style={styles.userInfos}>
        <View>
          <Text style={styles.userInfosUpperText}>{userName}</Text>
        </View>
        {/* <View>
          {scheduleData.map((item) => {
            if (item.checkedIn) {
              return (
                <>
                  {item.timeLate > 0 && (
                    <Text>{String(item.timeLate).split(".")[1]}</Text>
                  )}
                  <Text>{item.timeLate}</Text>
                </>
              );
            }
          })}
        </View> */}
      </View>
      <Calendar
        events={events}
        height={300}
        swipeEnabled={false}
        onPressEvent={(date) => {
          setPopUpKey(date.key);
          setDialogVisible(true);
        }}
      />
      {dialogVisible && (
        <DialogPopup
          popUpData={scheduleData[popUpKey as number]}
          dialogVisible={dialogVisible}
          setDialogVisible={setDialogVisible}
        />
      )}
    </>
  );
};
export default UserSchedule;
