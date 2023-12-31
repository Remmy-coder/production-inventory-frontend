import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FormikProps, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ICreateSupplierFormValues,
  ISupplierObject,
} from "../../../interfaces/supplier";
import * as Yup from "yup";
import { AutocompleteOptionProps } from "../../../components/Inputs";
import { countriesWithStates } from "../../../data";
import { useCreateSupplierMutation } from "../../../services/supplierApi";
import { parsedAuthenticatedUserObject } from "../../../common/apiConfig";
import SupplierFormComponent from "./SupplierFormComponent";

interface ICreateSupplierProps {
  openCreateDialog: boolean;
  isEditingSupplier: boolean;
  handleCloseCreateDialog: () => void;
}

const CreateSupplier: React.FC<ICreateSupplierProps> = (props) => {
  const initialValues = {} as unknown as ICreateSupplierFormValues;
  const [initialState, setInitialState] =
    useState<ICreateSupplierFormValues>(initialValues);

  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [countryStateData, setCountryStateData] = useState<
    AutocompleteOptionProps[]
  >([]);

  const [createSupplier] = useCreateSupplierMutation();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    email: Yup.string().email().required().label("Email Address"),
    name: Yup.string().required().label("Supplier"),
    country: Yup.string().required().label("Country"),
    state: Yup.string().required().label("State"),
    address: Yup.string().required().label("Supplier's Address"),
    dialcode: Yup.string().required().label("Dialcode"),
    phoneNumber: Yup.string().required().label("Phone Number"),
    website: Yup.string().nullable().label("Supplier's Website"),
  });

  const createSupplierForm: FormikProps<ICreateSupplierFormValues> =
    useFormik<ICreateSupplierFormValues>({
      initialValues: initialState,
      validationSchema: validationSchema,
      validateOnChange: true,
      validateOnBlur: false,
      validateOnMount: false,
      onSubmit(values, formikHelpers) {
        handleSubmit(values);
      },
    });

  const handleSubmit = async (data: ICreateSupplierFormValues) => {
    const {
      name,
      country,
      state,
      address,
      website,
      firstName,
      lastName,
      email,
      dialcode,
      phoneNumber,
    } = data;

    let dialcodeExtracted = dialcode.split(":")[1];

    const apiBody: Omit<ISupplierObject, "createdAt" | "updatedAt"> = {
      name,
      country,
      state,
      address,
      website,
      companyId: parsedAuthenticatedUserObject.userCompanyId,
      supplierContact: {
        firstName,
        lastName,
        email,
        dialcode: dialcodeExtracted,
        phoneNumber,
      },
    };

    const apiQuery: any = await createSupplier(apiBody);

    if (apiQuery?.data?.success) {
      props.handleCloseCreateDialog();
    }
  };

  useEffect(() => {
    selectedCountry &&
      countriesWithStates.find((value: AutocompleteOptionProps) => {
        if (value.country === selectedCountry) {
          setCountryStateData(value.states);
        }
      });
  }, [selectedCountry]);

  useEffect(() => {
    createSupplierForm.resetForm();
  }, [props.openCreateDialog === false]);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={props.openCreateDialog}
        onClose={props.handleCloseCreateDialog}
      >
        <DialogTitle
          sx={{
            color: "slateblue",
          }}
        >
          {props.isEditingSupplier ? `Edit Supplier` : `Create A New Supplier`}
        </DialogTitle>
        <DialogContent>
          <FormikProvider value={createSupplierForm}>
            <SupplierFormComponent
              createSupplierForm={createSupplierForm}
              setSelectedCountry={setSelectedCountry}
              countryStateData={countryStateData}
              isEditingSupplier={props.isEditingSupplier}
            />
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateSupplier;
