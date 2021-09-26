import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./../index";
import { IUser } from "../../types/user";
import { Status } from "../../types/status";
import { authAPI } from "./../../apis/axios/auth";
import { IUpdateForm } from "../../screens/EditUser/EditUser";

export interface UserSliceState {
  status: Status;
  data: IUser | null;
}

const initialState: UserSliceState = {
  status: Status.rejected,
  data: null,
};

export const getClientAsync = createAsyncThunk(
  "user/fetchUserInfo",
  async (token: string): Promise<IUser> => {
    const { data } = await authAPI(token).get("/auth/me");
    return data;
  }
);

export const updateClientAsync = createAsyncThunk(
  "user/updateUserInfo",
  async ({
    token,
    form,
  }: {
    token: string;
    form: IUpdateForm;
  }): Promise<IUser> => {
    const { data } = await authAPI(token).patch("/users", form);
    return data;
  }
);

const userServiceSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getClientAsync.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.status = Status.fulfilled;
        state.data = action.payload;
      }
    );
    builder.addCase(getClientAsync.pending, (state) => {
      state.status = Status.pending;
    });
    builder.addCase(getClientAsync.rejected, (state) => {
      state.status = Status.rejected;
    });
    builder.addCase(
      updateClientAsync.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.status = Status.fulfilled;
        state.data = action.payload;
      }
    );
    builder.addCase(updateClientAsync.pending, (state) => {
      state.status = Status.pending;
    });
    builder.addCase(updateClientAsync.rejected, (state) => {
      state.status = Status.rejected;
    });
  },
});

export const selectUserInfo = (state: RootState): UserSliceState =>
  state.client;

export default userServiceSlice.reducer;
