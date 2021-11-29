import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardGroupsData } from "../../screens/GroupDashBoard/GroupList";
import { RootState } from "../index";
import { authAPI } from "../../apis/axios/auth";
import { Status } from "../../types/status";

export const getDashboardGroups = createAsyncThunk(
  "group/dashboardGroups",
  async ({
    token,
    page,
  }: {
    token: string;
    page: number;
  }): Promise<DashboardGroupsData> => {
    const { data } = await authAPI(token).get("/groups", {
      params: {
        page: page,
      },
    });
    return data;
  }
);

const initialState: { status: Status; data: DashboardGroupsData | null } = {
  status: Status.rejected,
  data: null,
};

const DashboardGroupSlice = createSlice({
  name: "dashboardGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDashboardGroups.fulfilled,
      (state, action: PayloadAction<DashboardGroupsData>) => {
        state.status = Status.fulfilled;
        state.data = action.payload;
      }
    );
    builder.addCase(getDashboardGroups.pending, (state) => {
      state.status = Status.pending;
    });
    builder.addCase(getDashboardGroups.rejected, (state) => {
      state.status = Status.rejected;
    });
  },
});

export const selectDashboardGroups = (
  state: RootState
): { status: Status; data: DashboardGroupsData | null } => state.dashboardGroup;

export default DashboardGroupSlice.reducer;
