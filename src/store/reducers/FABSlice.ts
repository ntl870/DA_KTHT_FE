import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const initialState: { isActive: boolean } = {
  isActive: true,
};

const FABStatus = createSlice({
  name: "FABStatus",
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

export const selectFABStatus = (state: RootState): { isActive: boolean } => {
  return state.FABStatus;
};
export const { enable, disable } = FABStatus.actions;

export default FABStatus.reducer;
