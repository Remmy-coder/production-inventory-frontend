import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserRegistration } from "../../interfaces/user";
import userAuthService from "./userAuthService";

export interface UserState {
  user: IUserRegistration | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Get company and user from localStorage
const user = localStorage.getItem("user");
const parsedUser: IUserRegistration = user !== null ? JSON.parse(user) : null;

const initialState: UserState = {
  user: parsedUser ? parsedUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/user-registration",
  async (user: Partial<IUserRegistration>, thunkApi) => {
    try {
      return await userAuthService.register(user);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message &&
          error.response.data.message.message) ||
        error.message ||
        error.toString();
        //console.log(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IUserRegistration>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset } = userAuthSlice.actions;
export default userAuthSlice.reducer;
