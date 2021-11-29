import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import UserSlice from "./reducers/UserSlice";
import ScheduleSlice from "./reducers/ScheduleSlice";
import dashboardGroupSlice from "./reducers/GroupSlice";
import GroupDetailsSlice from "./reducers/GroupDetailsSlice";
import BottomBarStatusSlice from "./reducers/BottomBarStatusSlice";
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    client: UserSlice,
    schedule: ScheduleSlice,
    dashboardGroup: dashboardGroupSlice,
    groupDetails: GroupDetailsSlice,
    bottomBarStatus: BottomBarStatusSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
