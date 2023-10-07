import { configureStore } from "@reduxjs/toolkit";
import companyAuthReducer from "../features/auth/companyAuthSlice";
import userAuthReducer from "../features/auth/userAuthSlice";

export const store = configureStore({
  reducer: {
    companyAuth: companyAuthReducer,
    userAuth: userAuthReducer,
  },
  devTools: true,
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
