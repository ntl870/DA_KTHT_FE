import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./reducers/AuthSlice";
import UserSlice from "./reducers/UserSlice";
import ScheduleSlice from "./reducers/ScheduleSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    client: UserSlice,
    schedule: ScheduleSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
