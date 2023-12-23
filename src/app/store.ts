import {
  Middleware,
  MiddlewareAPI,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "../services/userApi";
import { companyApi } from "../services/companyApi";
import { supplierApi } from "../services/supplierApi";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      console.log("rtkQueryErrorLogger action:", action);
      //toast.warn({ title: "Async error!", message: action.error.data.message });
    }

    return next(action);
  };

const AppMiddlewares = [
  authApi.middleware,
  userApi.middleware,
  companyApi.middleware,
  supplierApi.middleware,
];

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AppMiddlewares),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
setupListeners(store.dispatch);
