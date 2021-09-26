import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import AuthSlice from "./reducers/AuthSlice";
import UserSlice from "./reducers/UserSlice";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    client: UserSlice,
  },
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware()."name": "Nguyen Thanh Long",concat(sagaMiddleware),
});
// sagaMiddleware.run(rootSaga);
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
