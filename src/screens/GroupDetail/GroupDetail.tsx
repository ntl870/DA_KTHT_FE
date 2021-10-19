import React, { FC } from "react";
import { View, Text } from "react-native";
import { GroupScreenProps, GroupRouteProps } from "../../types/screens";
interface Props {
  route: GroupRouteProps;
  navigation: GroupScreenProps;
}

const GroupDetail: FC<Props> = ({ route, navigation }) => {
  const { id } = route.params as { id: string };
  console.log(id);
  return (
    <View>
      <Text>1231</Text>
    </View>
  );
};

export default GroupDetail;
