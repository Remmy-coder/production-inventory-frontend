import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import companyAuthService from "./companyAuthService";
import { ICompanyRegistration } from "../../interfaces/company";

export interface CompanyState {
  company: ICompanyRegistration | null; 
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

// Get company and user from localStorage
const company = localStorage.getItem("company");
const parsedCompany: ICompanyRegistration =
  company !== null ? JSON.parse(company) : null;

const initialState: CompanyState = {
  company: parsedCompany ? parsedCompany : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register company
export const registerCompany = createAsyncThunk(
  "auth/company-registration",
  async (company: Partial<ICompanyRegistration>, thunkApi) => {
    try {
      return await companyAuthService.register(company);
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

export const companyAuthSlice = createSlice({
  name: "companyAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerCompany.pending, (state) => {
      state.isLoading = true
    }).addCase(registerCompany.fulfilled, (state, action: PayloadAction<ICompanyRegistration>)=> {
      state.isLoading = false
      state.isSuccess = true
      state.company = action.payload
    }).addCase(registerCompany.rejected, (state, action)=> {
      state.isLoading = false
      state.isError = true
      state.message = action.payload as string
      state.company = null
    });
  },
});

export const { reset } = companyAuthSlice.actions;
export default companyAuthSlice.reducer;
