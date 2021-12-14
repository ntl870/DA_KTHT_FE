/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from "react";
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
import { AppDispatch } from "../../store";
import { enable, disable } from "../../store/reducers/FABSlice";

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
interface Input {
  name: string;
  openStartTime: boolean;
  openEndTime: boolean;
  status: "checked" | "unchecked";
  workDay: Partial<WorkDays>;
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
    height: 600,
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
});

const formatDate = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (isNaN(hours) || isNaN(minutes)) {
    return "";
  }
  const ampm = hours >= 12 ? "pm" : "am";
  const hour = hours % 12;
  const minute = minutes < 10 ? `0${minutes}` : minutes;
  return `${hour}:${minute} ${ampm}`;
};

const AddMemberModal: FC<Props> = ({ visible, groupID, onDismiss }) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [inputErrorsIndex, setInputErrorsIndex] = useState<number | null>(null);

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

  const initialWeekDaysInputs: Input[] = [
    {
      name: "Monday",
      openStartTime: false,
      openEndTime: false,
      status: "unchecked",
      workDay: {},
    },
    {
      name: "Tuesday",
      openStartTime: false,
      openEndTime: false,
      status: "unchecked",
      workDay: {},
    },
    {
      name: "Wednesday",
      openStartTime: false,
      openEndTime: false,
      status: "unchecked",
      workDay: {},
    },
    {
      name: "Thursday",
      openStartTime: false,
      openEndTime: false,
      status: "unchecked",
      workDay: {},
    },
    {
      name: "Friday",
      openStartTime: false,
      openEndTime: false,
      status: "unchecked",
      workDay: {},
    },
    {
      name: "Saturday",
      openStartTime: false,
      openEndTime: false,
      status: "unchecked",
      workDay: {},
    },
    {
      name: "Sunday",
      openStartTime: false,
      openEndTime: false,
      status: "unchecked",
      workDay: {},
    },
  ];

  const [workDaysInputs, setWorkDaysInputs] = useState<Input[]>(
    initialWeekDaysInputs
  );

  const onChangeInput = (index: number, key: string, value: any) => {
    setWorkDaysInputs((prevState) => {
      const clone = [...prevState];
      clone[index] = { ...clone[index], [key]: value };
      return clone;
    });
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
      if (!validateEmail(form.email)) {
        setLoading(false);
        setInputErrorsIndex(0);
        return;
      }
      const workDays = workDaysInputs
        .map((input) => {
          if (input.status === "checked") {
            return {
              ...input.workDay,
              timeStart: Number(
                `${new Date(
                  String(input.workDay.timeStart)
                ).getHours()}.${new Date(
                  String(input.workDay.timeStart)
                ).getMinutes()}`
              ),
              timeFinish: Number(
                `${new Date(
                  String(input.workDay.timeFinish)
                ).getHours()}.${new Date(
                  String(input.workDay.timeFinish)
                ).getMinutes()}`
              ),
            };
          }
        })
        .filter((workDay) => workDay !== undefined);

      await authAPI(String(token)).put(`/groups/${groupID}/member`, {
        ...form,
        workDays: workDays,
      });
    } catch (err) {
    } finally {
      dispatch(getGroupDetails({ token: String(token), id: groupID }));
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
          {workDaysInputs.map(
            ({ name, status, openStartTime, openEndTime }, index) => {
              return (
                <View key={name} style={styles.inputItem}>
                  <Text>{name}</Text>
                  <View style={styles.checkBoxSection}>
                    <Checkbox
                      status={status}
                      onPress={() => {
                        const value =
                          status === "checked" ? "unchecked" : "checked";
                        onChangeInput(index, "status", value);
                      }}
                    />
                    <View style={styles.pickTimeSection}>
                      <Button
                        onPress={() => {
                          onChangeInput(index, "openEndTime", false);
                          onChangeInput(index, "openStartTime", true);
                        }}
                        disabled={status === "unchecked"}
                      >
                        Start
                      </Button>
                      {(openStartTime ||
                        !!workDaysInputs[index]?.workDay?.timeStart) &&
                        status === "checked" && (
                          <Text style={{ fontSize: 20 }}>
                            {formatDate(
                              new Date(
                                String(
                                  workDaysInputs[index]?.workDay?.timeStart
                                )
                              ) || new Date()
                            )}
                          </Text>
                        )}
                    </View>
                    <View style={styles.pickTimeSection}>
                      <Button
                        onPress={() => {
                          onChangeInput(index, "openStartTime", false);
                          onChangeInput(index, "openEndTime", true);
                        }}
                        disabled={status === "unchecked"}
                      >
                        End
                      </Button>
                      {(openEndTime ||
                        !!workDaysInputs[index]?.workDay?.timeFinish) &&
                        status === "checked" && (
                          <Text style={{ fontSize: 20 }}>
                            {formatDate(
                              new Date(
                                String(
                                  workDaysInputs[index]?.workDay?.timeFinish
                                )
                              )
                            )}
                          </Text>
                        )}
                    </View>
                  </View>

                  {openStartTime && (
                    <View style={styles.selectTimeSection}>
                      <DatePicker
                        date={
                          workDaysInputs[index]?.workDay?.timeStart
                            ? new Date(
                                String(
                                  workDaysInputs[index]?.workDay?.timeStart
                                )
                              )
                            : new Date()
                        }
                        mode="time"
                        onDateChange={(date) => {
                          const target = openStartTime
                            ? "timeStart"
                            : "timeFinish";
                          const clone = { ...workDaysInputs[index].workDay };
                          const value = {
                            ...clone,
                            dayOfWeek: index === 6 ? 0 : index + 1,
                            [target]: date,
                          };
                          onChangeInput(index, "workDay", value);
                        }}
                      />
                      <Button
                        onPress={() => {
                          onChangeInput(index, "openStartTime", false);
                          onChangeInput(index, "openEndTime", false);
                        }}
                      >
                        Close
                      </Button>
                    </View>
                  )}
                  {openEndTime && (
                    <View style={styles.selectTimeSection}>
                      <DatePicker
                        date={
                          workDaysInputs[index]?.workDay?.timeFinish
                            ? new Date(
                                String(
                                  workDaysInputs[index]?.workDay?.timeFinish
                                )
                              )
                            : new Date()
                        }
                        mode="time"
                        onDateChange={(date) => {
                          const target = openStartTime
                            ? "timeStart"
                            : "timeFinish";
                          const clone = { ...workDaysInputs[index].workDay };
                          const value = {
                            ...clone,
                            dayOfWeek: index === 6 ? 0 : index + 1,
                            [target]: date,
                          };
                          onChangeInput(index, "workDay", value);
                        }}
                      />
                      <Button
                        onPress={() => {
                          onChangeInput(index, "openStartTime", false);
                          onChangeInput(index, "openEndTime", false);
                        }}
                      >
                        Close
                      </Button>
                    </View>
                  )}
                </View>
              );
            }
          )}
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
export default AddMemberModal;
