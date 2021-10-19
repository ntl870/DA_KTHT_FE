import React, { FC } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GroupItem from "./GroupItem";

enum Role {
  admin = "Admin",
  user = "User",
}

export interface Group {
  id: string;
  name: string;
  numbersOfMember: number;
  checkedIn: number;
  role: Role;
}

const GroupList: FC = () => {
  const DATA: Group[] = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "First Item",
      numbersOfMember: 20,
      checkedIn: 10,
      role: Role.admin,
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "First Item",
      numbersOfMember: 20,
      checkedIn: 10,
      role: Role.admin,
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "First Item",
      numbersOfMember: 20,
      checkedIn: 10,
      role: Role.admin,
    },
    {
      id: "28694a0f-3da1-471f-bd96-145571e29d72",
      name: "First Item",
      numbersOfMember: 20,
      checkedIn: 10,
      role: Role.admin,
    },
  ];
  const renderItem: ListRenderItem<Group> = ({ item }) => (
    <GroupItem {...item} />
  );

  return (
    <SafeAreaProvider>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaProvider>
  );
};

export default GroupList;
