import { login } from "../../store/reducers/AuthSlice";
import { all, takeLatest } from "@redux-saga/core/effects";
import * as SecureStore from "expo-secure-store";

function* saveToken(action: any) {
  yield SecureStore.setItemAsync("token", action);
}

function* userSaga() {
  try {
    yield takeLatest(login, saveToken);
  } catch (err) {
  }
}

export default function* rootSaga() {
  yield all([userSaga()]);
}
