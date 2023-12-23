import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../common/apiConfig";
import { IApiResponse } from "../interfaces/apiResponse";
import { ILogin, IOTPValidation } from "../interfaces/auth";
import { IUserObject } from "../interfaces/user";
import { toast } from "react-toastify";

interface LoginResponse {
  message: string;
  userId: string;
}

interface OTPValidationResponse {
  accessToken: string;
  userData: IUserObject;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation<IApiResponse<LoginResponse>, Partial<ILogin>>({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        body: loginData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.payload.message);
          localStorage.setItem("loggedInUserId", data.payload.userId);
          //console.log("userID:", data.payload.userId);
        } catch (error: any) {
          toast.error(error.error.data.message as unknown as string);
        }
      },
    }),

    otpValidation: builder.mutation<
      IApiResponse<OTPValidationResponse>,
      Partial<IOTPValidation>
    >({
      query: ({ otp, userId }) => ({
        url: `auth/verifyOtp/${userId}/${otp}`,
        method: "PATCH",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const authenticatedUserObject = {
            id: data.payload.userData.id,
            userCompanyId: data.payload.userData.company.id,
            accessToken: data.payload.accessToken,
          };

          localStorage.removeItem("loggedInUserId");

          localStorage.setItem(
            "authenticatedUserObject",
            JSON.stringify(authenticatedUserObject)
          );

          toast.success(
            `Welcome, ${data.payload.userData.lastName.toUpperCase()}  ${data.payload.userData.firstName.toUpperCase()}`
          );
          //console.log("access-token:", data.payload.accessToken);
        } catch (error: any) {
          toast.error(error.error.data.message as unknown as string);
        }
      },
    }),
  }),
});

export const { useOtpValidationMutation, useLoginUserMutation } = authApi;
