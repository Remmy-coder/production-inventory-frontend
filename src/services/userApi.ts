import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../common/apiConfig";
import { IApiResponse } from "../interfaces/apiResponse";
import { IUserObject, IUserRegistration } from "../interfaces/user";
import { toast } from "react-toastify";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (build) => ({
    createUser: build.mutation<
      IApiResponse<IUserObject>,
      Partial<IUserRegistration>
    >({
      query: (createUserData) => ({
        url: "user",
        method: "POST",
        body: createUserData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          toast.success(
            `User created, a verification link has been sent to the user's email address.`
          );

          //console.log("Created User Object:", data.payload);
        } catch (error: any) {
          toast.error(error.error.data.message as unknown as string);
        }
      },
      invalidatesTags: ["User"],
    }),

    getUserById: build.query<IApiResponse<IUserObject>, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: arg }],
    }),
  }),
});

export const { useCreateUserMutation, useGetUserByIdQuery } = userApi;
