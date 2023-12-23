import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AddBusinessRounded } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import { countriesWithStates } from "../../data";
import { ICompanyRegistration } from "../../interfaces/company";
import CompanyRegistrationForm from "./SignupForms/CompanyRegistrationForm";
import { AutocompleteOptionProps } from "../../components/Inputs";
import { RegistrationFlow } from ".";
import { useCreateCompanyMutation } from "../../services/companyApi";

interface IProps {
  setTransition: React.Dispatch<React.SetStateAction<RegistrationFlow>>;
}

const CompanyRegistration: React.FC<IProps> = ({ setTransition }) => {
  const initialValues = {} as unknown as ICompanyRegistration;
  const [initialState, setInitialState] =
    useState<ICompanyRegistration>(initialValues);

  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [countryStateData, setCountryStateData] = useState<
    AutocompleteOptionProps[]
  >([]);

  const [createCompany] = useCreateCompanyMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Company Name"),
    email: Yup.string().email().required().label("Email Address"),
    country: Yup.string().required().label("Country"),
    state: Yup.string().required().label("State"),
    address: Yup.string().required().label("Company's Address"),
  });

  useEffect(() => {
    selectedCountry &&
      countriesWithStates.find((value: AutocompleteOptionProps) => {
        if (value.country === selectedCountry) {
          setCountryStateData(value.states);
        }
      });
  }, [selectedCountry]);

  const handleSubmitForCompanyCreation = async (data: ICompanyRegistration) => {
    const apiQuery: any = await createCompany(data);

    if (apiQuery?.data?.success) {
      setTransition(RegistrationFlow.userRegistration);
    }
  };

  return (
    <Container
      component="main"
      sx={{
        width: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          marginTop: 6,
          marginBottom: 6,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "5px 5px 10px 1px #797474",
          borderRadius: "10px",
          bgcolor: "white",
          maxWidth: "sm",
          //background: '#fff url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810354.jpg?w=900&t=st=1687624611~exp=1687625211~hmac=64f0b1b9d143608303f1f7b32e9621e4c88f0cce3dce204280d6ccf99a6ec62c) center center/cover no-repeat',
        }}
        component="div"
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: "slateblue",
            height: 70,
            width: 70,
          }}
        >
          <AddBusinessRounded fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Company Registration
        </Typography>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={(data) => {
            handleSubmitForCompanyCreation(data);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <CompanyRegistrationForm
              handleSubmit={handleSubmit}
              setSelectedCountry={setSelectedCountry}
              countryStateData={countryStateData}
            />
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default CompanyRegistration;
