import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../common/apiConfig";
import { IApiResponse } from "../interfaces/apiResponse";
import { ICompanyObject, ICompanyRegistration } from "../interfaces/company";
import { toast } from "react-toastify";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: baseQuery,
  tagTypes: ["Company"],
  endpoints: (build) => ({
    createCompany: build.mutation<
      IApiResponse<ICompanyObject>,
      Partial<ICompanyRegistration>
    >({
      query: (createCompanyData) => ({
        url: "company",
        method: "POST",
        body: createCompanyData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(
            `Company created, an activation link has been sent to the company's email address.`
          );
          localStorage.setItem("newlyCreatedCompanyId", data.payload.id);
          //console.log("Created User Object:", data.payload);
        } catch (error: any) {
          toast.error(error.error.data.message as unknown as string);
        }
      },
      invalidatesTags: ["Company"],
    }),
  }),
});

export const { useCreateCompanyMutation } = companyApi;
