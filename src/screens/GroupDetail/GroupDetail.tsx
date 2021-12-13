import React, { FC } from "react";
import GroupDetailAdmin from "./GroupDetailAdmin";
import GroupDetailUser from "./GroupDetailUser";
import { GroupScreenProps, GroupRouteProps } from "../../types/screens";

interface Props {
  route: GroupRouteProps;
  navigation: GroupScreenProps;
}
const GroupDetail: FC<Props> = (props) => {
  const { role } = props.route.params as { role: string };
  if (role === "admin") {
    return <GroupDetailAdmin {...props} />;
  }
  return <GroupDetailUser {...props} />;
};
export default GroupDetail;
