import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState: { isActive: boolean } = {
  isActive: true,
};

const BottomBarStatus = createSlice({
  name: "bottomBarStatus",
  initialState,
  reducers: {
    enable: (state) => {
      state.isActive = true;
    },
    disable: (state) => {
      state.isActive = false;
    },
  },
});

export const selectBottomBarStatus = (
  state: RootState
): { isActive: boolean } => {
  return state.bottomBarStatus;
};
export const { enable, disable } = BottomBarStatus.actions;

export default BottomBarStatus.reducer;
