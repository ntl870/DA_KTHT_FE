import { Group } from "../../types/group";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { authAPI } from "../../apis/axios/auth";
import { Status } from "../../types/status";

export const getGroupDetails = createAsyncThunk(
  "group/details",
  async ({ token, id }: { token: string; id: string }): Promise<Group> => {
    const { data } = await authAPI(token).get(`/groups/${id}`);
    return data;
  }
);

export interface GroupDetailsData {
  status: Status;
  data: Group | null;
}

const initialState: GroupDetailsData = {
  status: Status.rejected,
  data: null,
};

const groupDetailsSlice = createSlice({
  name: "groupDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getGroupDetails.fulfilled,
      (state, action: PayloadAction<Group>) => {
        state.status = Status.fulfilled;
        state.data = action.payload;
      }
    );
    builder.addCase(getGroupDetails.pending, (state) => {
      state.status = Status.pending;
    });
    builder.addCase(getGroupDetails.rejected, (state) => {
      state.status = Status.rejected;
    });
  },
});

export const selectGroupDetails = (state: RootState): GroupDetailsData =>
  state.groupDetails;

export default groupDetailsSlice.reducer;
