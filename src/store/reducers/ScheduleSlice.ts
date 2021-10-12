import { Schedule } from "./../../components/Schedule/Schedule";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { authAPI } from "../../apis/axios/auth";
import { Status } from "../../types/status";
export const getUserSchedule = createAsyncThunk(
  "user/getSchedule",
  async (token: string): Promise<Schedule[]> => {
    const { data } = await authAPI(token).get("/users/schedule");
    return data;
  }
);

interface Data {
  status: Status;
  data: Schedule[];
}

const initialState: Data = {
  status: Status.rejected,
  data: [{}],
};

const userScheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserSchedule.fulfilled,
      (state, action: PayloadAction<Schedule[]>) => {
        state.status = Status.fulfilled;
        state.data = action.payload;
      }
    );
    builder.addCase(getUserSchedule.pending, (state) => {
      state.status = Status.pending;
    });
    builder.addCase(getUserSchedule.rejected, (state) => {
      state.status = Status.rejected;
    });
  },
});

export const selectUserSchedule = (state: RootState): Data => state.schedule;

export default userScheduleSlice.reducer;
