import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "formik";
import React from "react";
import { AutocompleteOptionProps, ReusableAutocomplete, ReusableCountryAutocomplete, ReusableTextField } from "../../../components/Inputs";
import { countries } from "../../../data";
import { NavigateNextRounded } from "@mui/icons-material";

interface ICompanyRegistrationFormProp {
    handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    setSelectedCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
    countryStateData: AutocompleteOptionProps[];
}

const CompanyRegistrationForm: React.FC<ICompanyRegistrationFormProp> = ({handleSubmit, setSelectedCountry, countryStateData}) => {
  return (
    <Box
      component={Form}
      noValidate
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        mb: 3,
        px: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ReusableTextField name="name" label="Company Name" type="text" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReusableCountryAutocomplete
            name="country"
            label="Choose a country"
            countries={countries}
            setSelectedCountry={setSelectedCountry}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReusableTextField name="email" label="Email Address" type="email" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReusableAutocomplete
            name="state"
            label="Choose a state"
            options={countryStateData}
          />
        </Grid>

        <Grid item xs={12}>
          <ReusableTextField
            name="address"
            type="text"
            label="Company Address"
            multiline
            rows={2}
          />
        </Grid>
      </Grid>

      <Button
        sx={{
          mt: 3,
          backgroundColor: "#6a5acd",
          float: "right",
        }}
        variant="contained"
        endIcon={<NavigateNextRounded />}
        type="submit"
      >
        PROCEED
      </Button>
    </Box>
  );
};

export default CompanyRegistrationForm;
