import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  FormGroup,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useEffect } from "react";
import { AddBusinessRounded, NavigateNextRounded } from "@mui/icons-material";
import { Form, Formik, Field, FieldProps } from "formik";
import * as Yup from "yup";
import {
  countries,
  countriesWithStates,
  CountryType,
  CountryWithState,
} from "../../data";
import { ICompanyRegistration } from "../../interfaces/company";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, registerCompany } from "../../features/auth/companyAuthSlice";
import { AnyAction } from "@reduxjs/toolkit";
import {
  ReusableAutocomplete,
  ReusableCountryAutocomplete,
  ReusableCountryStateAutocomplete,
  ReusableTextField,
} from "../../components/Inputs";

interface IProps {
  setTransition: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyRegistration: React.FC<IProps> = ({ setTransition }) => {
  const initialValues = {};
  const [initialState, setInitialState] =
    useState<Partial<ICompanyRegistration>>(initialValues);

  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [countryStateData, setCountryStateData] = useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Company Name"),
    email: Yup.string().email().required().label("Email Address"),
    country: Yup.string().required().label("Country"),
    state: Yup.string().required().label("State"),
    address: Yup.string().required().label("Company Address"),
  });

  useEffect(() => {
    selectedCountry &&
      countriesWithStates.find((value: CountryWithState) => {
        if (value.country === selectedCountry) {
          setCountryStateData(value.states);
        }
      });
  }, [selectedCountry]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { company, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.companyAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Company created");
      setTransition(true);
    }

    dispatch(reset());
  }, [company, isError, isSuccess, message, setTransition, dispatch]);

  const handleSubmit = (data: Partial<ICompanyRegistration>) => {
    dispatch(registerCompany(data) as unknown as AnyAction);
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
            //handleSubmit(data);
            console.log(data);
            setTransition(true);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
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
                  {/* <Field name="name">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <>
                        <FormGroup>
                          <TextField
                            type="text"
                            label="Company Name"
                            {...field}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  id: "name",
                                  name: "name",
                                  value: event.target.value,
                                },
                              });
                            }}
                            error={!!(touched && errors.name)}
                            fullWidth
                          />
                          {touched && errors.name && (
                            <FormHelperText error>
                              {String(errors.name)}
                            </FormHelperText>
                          )}
                        </FormGroup>
                      </>
                    )}
                  </Field> */}
                  <ReusableTextField
                    name="name"
                    label="Company Name"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* <Field name="country">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <>
                        <FormGroup>
                          <Autocomplete
                            fullWidth
                            sx={{}}
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            onChange={(
                              event: React.SyntheticEvent<Element, Event>,
                              value: CountryType | null
                            ) => {
                              onChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  id: "country",
                                  name: "country",
                                  value: value?.label,
                                },
                              });

                              setSelectedCountry(value?.label);
                            }}
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                <img
                                  loading="lazy"
                                  width="20"
                                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                  alt=""
                                />
                                {option.label} ({option.code}) +{option.phone}
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                {...field}
                                label="Choose a country"
                                inputProps={{
                                  ...params.inputProps,
                                  autoComplete: "new-password", // disable autocomplete and autofill
                                }}
                                error={!!(touched && errors.country)}
                                fullWidth
                              />
                            )}
                          />
                          {touched && errors.country && (
                            <FormHelperText error>
                              {String(errors.country)}
                            </FormHelperText>
                          )}
                        </FormGroup>
                      </>
                    )}
                  </Field> */}
                  <ReusableCountryAutocomplete
                    name="country"
                    label="Choose a country"
                    countries={countries}
                    setSelectedCountry={setSelectedCountry}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* <Field name="email">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <>
                        <FormGroup>
                          <TextField
                            type="email"
                            label="Email Address"
                            {...field}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  id: "email",
                                  name: "email",
                                  value: event.target.value,
                                },
                              });
                            }}
                            fullWidth
                            error={!!(touched && errors.email)}
                          />
                          {touched && errors.email && (
                            <FormHelperText error>
                              {String(errors.email)}
                            </FormHelperText>
                          )}
                        </FormGroup>
                      </>
                    )}
                  </Field> */}
                  <ReusableTextField
                    name="email"
                    label="Email Address"
                    type="email"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  {/* <Field name="state">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <>
                        <FormGroup>
                          <Autocomplete
                            fullWidth
                            sx={{}}
                            options={countryStateData}
                            autoHighlight
                            onChange={(
                              event: React.SyntheticEvent<Element, Event>,
                              value: string | null
                            ) => {
                              onChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  id: "state",
                                  name: "state",
                                  value: value,
                                },
                              });
                              //console.log(value);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Choose a state"
                                error={!!(touched && errors.state)}
                              />
                            )}
                          />
                          {touched && errors.state && (
                            <FormHelperText error>
                              {String(errors.state)}
                            </FormHelperText>
                          )}
                        </FormGroup>
                      </>
                    )}
                  </Field> */}
                  <ReusableCountryStateAutocomplete
                    name="state"
                    label="Choose a state"
                    options={countryStateData}
                  />
                </Grid>

                <Grid item xs={12}>
                  {/* <Field name="address">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <>
                        <FormGroup>
                          <TextField
                            type="text"
                            label="Company Address"
                            {...field}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  id: "address",
                                  name: "address",
                                  value: event.target.value,
                                },
                              });
                            }}
                            error={!!(touched && errors.address)}
                            fullWidth
                            multiline
                            rows={2}
                          />
                          {touched && errors.address && (
                            <FormHelperText error>
                              {String(errors.address)}
                            </FormHelperText>
                          )}
                        </FormGroup>
                      </>
                    )}
                  </Field> */}
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
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default CompanyRegistration;
