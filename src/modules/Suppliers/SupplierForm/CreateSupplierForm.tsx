import { Form, FormikProps, FormikProvider } from "formik";
import React from "react";
import { ICreateSupplierFormValues } from "../../../interfaces/supplier";
import { Box, Button, Grid } from "@mui/material";
import {
  AutocompleteOptionProps,
  ReusableAutocomplete,
  ReusableCountryAutocomplete,
  ReusableTextField,
} from "../../../components/Inputs";
import { countries } from "../../../data";
import { AddBoxRounded } from "@mui/icons-material";

interface ICreateSupplierFormProps {
  createSupplierForm: FormikProps<ICreateSupplierFormValues>;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
  countryStateData: AutocompleteOptionProps[];
}

const CreateSupplierForm: React.FC<ICreateSupplierFormProps> = (props) => {
  const dialCodeList: { label: string; value: string }[] = countries.map(
    ({ label, phone }) => ({
      label: `${label}: +${phone}`,
      value: `+${phone}`,
    })
  );

  return (
    <FormikProvider value={props.createSupplierForm}>
      <Box
        component={Form}
        noValidate
        sx={{
          mt: 2,
          px: 2,
        }}
        onSubmit={props.createSupplierForm.handleSubmit}
      >
        <Grid container spacing={4}>
          <Grid item xs={8} sm={4}>
            <ReusableTextField
              name="name"
              label="Supplier's Name"
              type="text"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableTextField
              name="firstName"
              label="Supplier's Contact: First Name"
              type="text"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableTextField
              name="lastName"
              label="Supplier's Contact: Last Name"
              type="text"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableTextField
              name="email"
              label="Supplier's Email Address"
              type="email"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableAutocomplete
              name="dialcode"
              label="Supplier's Contact: Dialcode"
              options={dialCodeList}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableTextField
              name="phoneNumber"
              label="Supplier's Contact: Phone Number"
              type="text"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableCountryAutocomplete
              name="country"
              label="Choose a country"
              countries={countries}
              setSelectedCountry={props.setSelectedCountry}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableAutocomplete
              name="state"
              label="Choose a state"
              options={props.countryStateData}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <ReusableTextField
              name="website"
              label="Supplier's Website"
              type="text"
            />
          </Grid>

          <Grid item xs={12}>
            <ReusableTextField
              name="address"
              type="text"
              label="Supplier's Address"
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={24}>
            <Button
              sx={{
                backgroundColor: "slateblue",
                float: "right",
              }}
              variant="contained"
              endIcon={<AddBoxRounded />}
              type="submit"
            >
              CREATE SUPPLIER
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FormikProvider>
  );
};

export default CreateSupplierForm;
