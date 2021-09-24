import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "./../index";

interface IAuth {
  token: string | null;
}

const initialState: IAuth = {
  token: "",
};

export const getToken = createAsyncThunk("auth/token", async () => {
  const token = await AsyncStorage.getItem("jwtToken");
  return token;
});

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
  },
});

export const { login, logout } = userAuthSlice.actions;
export const selectToken = (state: RootState): string | null =>
  state.auth.token;
export default userAuthSlice.reducer;
