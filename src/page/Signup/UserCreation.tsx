import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useEffect } from "react";
import {
  CreateNewFolderRounded,
  PersonAddAltRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Form, Formik, Field, FormikValues, FieldProps } from "formik";
import * as Yup from "yup";
import { Gender, gender } from "../../data";
import PasswordChecklist from "react-password-checklist";
import { IUserRegistration } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toast } from "react-toastify";
import { registerUser, reset } from "../../features/auth/userAuthSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ICompanyRegistration } from "../../interfaces/company";
import {
  ReusableAutocomplete,
  ReusableTextField,
} from "../../components/Inputs";

const UserCreation: React.FC = () => {
  const initialValues = {};
  const [initialState, setInitialState] =
    useState<Partial<IUserRegistration>>(initialValues);

  const company = localStorage.getItem("company");
  const parsedCompany: ICompanyRegistration =
    company !== null ? JSON.parse(company) : null;

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    email: Yup.string().email().required().label("Email Address"),
    gender: Yup.string().required().label("Gender"),
    password: Yup.string().required().min(8).label("Password"),
    confirmPassword: Yup.string().required().min(8).label("Confirm Password"),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.userAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      toast.success("User created");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handleSubmit = (data: Partial<IUserRegistration>) => {
    const userData = {
      companyId: parsedCompany?.id,
      ...data,
    };
    dispatch(registerUser(userData) as unknown as AnyAction);
  };

  //console.log(parsedCompany);

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
          marginTop: 5,
          marginBottom: 5,
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
            backgroundColor: "#FF7F50",
            height: 70,
            width: 70,
          }}
        >
          <PersonAddAltRounded fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          User Creation
        </Typography>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={(data) => {
            handleSubmit(data);
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
                  <ReusableTextField
                    name="firstName"
                    label="First Name"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ReusableTextField
                    name="lastName"
                    label="Last Name"
                    type="text"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ReusableTextField
                    name="email"
                    label="Email Address"
                    type="email"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <ReusableAutocomplete
                    name="gender"
                    label="Choose a gender"
                    options={gender}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="password">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <FormGroup>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            fullWidth
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  id: "password",
                                  name: "password",
                                  value: event.target.value,
                                },
                              });
                            }}
                            error={!!(touched && errors.password)}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {touched && errors.password && (
                            <FormHelperText error>
                              {String(errors.password)}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </FormGroup>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field name="confirmPassword">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <FormGroup>
                        <FormControl fullWidth>
                          <InputLabel htmlFor="outlined-adornment-password">
                            Confirm Password
                          </InputLabel>
                          <OutlinedInput
                            fullWidth
                            id="outlined-adornment-password"
                            type={showConfirmPassword ? "text" : "password"}
                            label="Confirm Password"
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              onChange({
                                ...event,
                                target: {
                                  ...event.target,
                                  id: "confirmPassword",
                                  name: "confirmPassword",
                                  value: event.target.value,
                                },
                              });
                            }}
                            error={!!(touched && errors.confirmPassword)}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showConfirmPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                          {touched && errors.confirmPassword && (
                            <FormHelperText error>
                              {String(errors.confirmPassword)}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </FormGroup>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <PasswordChecklist
                    rules={["specialChar", "number", "capital", "match"]}
                    value={String(values.password)}
                    valueAgain={values.confirmPassword}
                    //onChange={(isValid: boolean) => console.log(isValid)}
                    style={{
                      fontSize: "12px",
                    }}
                    iconSize={10}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{
                      mt: 3,
                      backgroundColor: "#FF7F50",
                      float: "right",
                    }}
                    variant="contained"
                    endIcon={<CreateNewFolderRounded />}
                    type="submit"
                  >
                    CREATE
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserCreation;
