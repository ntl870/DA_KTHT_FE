import React, { FC, useEffect, useState, useCallback } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  LogBox,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { selectToken } from "../../store/reducers/AuthSlice";
import {
  selectDashboardGroups,
  getDashboardGroups,
} from "../../store/reducers/GroupSlice";
import GroupItem from "./GroupItem";
import { Status } from "../../types/status";
import { ActivityIndicator } from "react-native-paper";
import { GroupScreenProps, GroupRouteProps } from "../../types/screens";
import Headers from "../../components/Header/Header";
import AddGroupModal from "./AddGroupModal";

enum Role {
  admin = "admin",
  user = "user",
}
interface Props {
  route: GroupRouteProps;
  navigation: GroupScreenProps;
}
export interface DashboardGroup {
  id: string;
  name: string;
  description: string;
  numbersOfMember: number;
  role: Role;
  avatars: {
    avatar: string;
    name: string;
  }[];
  checkedIn: number;
  groupImage: string;
}
export interface DashboardGroupsData {
  currentPage: number;
  totalPage: number;
  totalGroups: number;
  groups: DashboardGroup[];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  },
});

const GroupList: FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isShownAddGroupModal, setIsShownAddGroupModal] =
    useState<boolean>(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  useEffect(() => {
    dispatch(getDashboardGroups({ token: token as string }));
  }, [dispatch, token]);

  const { data, status } = useSelector(selectDashboardGroups);

  const renderItem: ListRenderItem<DashboardGroup> = ({ item }) => (
    <GroupItem {...item} />
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      dispatch(getDashboardGroups({ token: token as string }));
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, token]);

  const actions = [
    {
      icon: "account-multiple-plus",
      onPress: () => setIsShownAddGroupModal(true),
    },
  ];

  if (status === Status.pending || refreshing) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Headers title="Group List" disableBackAction actions={actions} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={data?.groups}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      {isShownAddGroupModal && (
        <AddGroupModal
          visible={isShownAddGroupModal}
          onDismiss={() => setIsShownAddGroupModal(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default GroupList;
