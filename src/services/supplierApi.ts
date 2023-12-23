import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from "../common/apiConfig";
import { IApiPayloadPaginate, IApiResponse } from "../interfaces/apiResponse";
import {
  ICreateSupplierFormValues,
  ISupplierObject,
} from "../interfaces/supplier";
import { toast } from "react-toastify";

export const supplierApi = createApi({
  reducerPath: "supplierApi",
  baseQuery: baseQuery,
  tagTypes: ["Supplier"],
  endpoints: (build) => ({
    createSupplier: build.mutation<
      IApiResponse<ISupplierObject>,
      Partial<ICreateSupplierFormValues>
    >({
      query: (createSupplierData) => ({
        url: "supplier",
        method: "POST",
        body: createSupplierData,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          toast.success(`${data.payload.name} supplier created.`);
        } catch (error: any) {
          toast.error(error.error.data.message.error as unknown as string);
        }
      },
      invalidatesTags: ["Supplier"],
    }),

    getPaginatedSuppliers: build.query<
      IApiResponse<IApiPayloadPaginate<ISupplierObject[]>>,
      Partial<{}>
    >({
      query: (props) => ({
        url: `supplier`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error: any) {
          toast.error(error.error.data.message as unknown as string);
        }
      },
      providesTags: [{ type: "Supplier", id: "LIST" }],
    }),

    getAllSuppliers: build.query<IApiResponse<ISupplierObject[]>, void>({
      query: (props) => ({
        url: `supplier/All`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error: any) {
          toast.error(error.error.data.message as unknown as string);
        }
      },
      providesTags: [{ type: "Supplier", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetPaginatedSuppliersQuery,
  useGetAllSuppliersQuery,
} = supplierApi;
