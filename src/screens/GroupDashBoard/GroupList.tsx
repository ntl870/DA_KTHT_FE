import React, { FC, useEffect } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { selectToken } from "../../store/reducers/AuthSlice";
import {
  selectDashboardGroups,
  getDashboardGroups,
} from "../../store/reducers/GroupSlice";
import GroupItem from "./GroupItem";

enum Role {
  admin = "Admin",
  user = "User",
}

export interface DashboardGroup {
  id: string;
  name: string;
  description: string;
  numbersOfMember: number;
  role: Role;
  avatars: string[];
  checkedIn: number;
}
export interface DashboardGroupsData {
  currentPage: number;
  totalPage: number;
  totalGroups: number;
  groups: DashboardGroup[];
}

const GroupList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);

  useEffect(() => {
    dispatch(getDashboardGroups({ token: token as string, page: 1 }));
  }, [dispatch, token]);

  const { data } = useSelector(selectDashboardGroups);
  const renderItem: ListRenderItem<DashboardGroup> = ({ item }) => (
    <GroupItem {...item} />
  );

  return (
    <SafeAreaProvider>
      <FlatList
        data={data?.groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaProvider>
  );
};

export default GroupList;
