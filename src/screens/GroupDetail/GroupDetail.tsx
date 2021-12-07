import React, { FC } from "react";
import { useRoute } from "@react-navigation/native";
import GroupDetailAdmin from "./GroupDetailAdmin";
import GroupDetailUser from "./GroupDetailUser";
import { GroupScreenProps, GroupRouteProps } from "../../types/screens";

interface Props {
  route: GroupRouteProps;
  navigation: GroupScreenProps;
}
const GroupDetail: FC<Props> = (props) => {
  const { name } = useRoute();
  const fabVisible = name === "GroupDetailScreen";
  const { role } = props.route.params as { role: string };
  if (role === "admin") {
    return <GroupDetailAdmin {...props} fabVisible={fabVisible} />;
  }
  return <GroupDetailUser {...props} fabVisible={fabVisible} />;
};
export default GroupDetail;
