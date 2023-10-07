import {
  AccountCircle,
  LockOpenRounded,
  LoginRounded,
  Person2Rounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Field, FieldProps, Form, Formik } from "formik";
import React, { useState } from "react";
import { IUserRegistration } from "../../interfaces/user";
import * as Yup from "yup";

const UserLogin = () => {
  const initialValues = {};
  const [initialState, setInitialState] =
    useState<Partial<IUserRegistration>>(initialValues);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email Address"),
    password: Yup.string().required().min(8).label("Password"),
  });

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          marginBottom: 12,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "5px 5px 10px 1px #797474",
          borderRadius: "10px",
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
          <LoginRounded fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={(data) => {
            console.log(data);
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
                px: 2,
              }}
            >
              <Grid
                container
                spacing={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12}>
                  <Field name="email">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <>
                        <FormGroup>
                          <TextField
                            {...field}
                            label="Email Address"
                            id="outlined-start-adornment"
                            sx={{ width: 300 }}
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
                            type="email"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Person2Rounded />
                                </InputAdornment>
                              ),
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
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="password">
                    {({
                      field: { name, value, onChange, ...field },
                      form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }: FieldProps) => (
                      <>
                        <FormGroup>
                          <TextField
                            {...field}
                            label="Password"
                            id="outlined-start-adornment"
                            sx={{ width: 300 }}
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
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
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
                              ),
                            }}
                            fullWidth
                            error={!!(touched && errors.password)}
                          />
                          {touched && errors.password && (
                            <FormHelperText error>
                              {String(errors.password)}
                            </FormHelperText>
                          )}
                        </FormGroup>
                      </>
                    )}
                  </Field>
                </Grid>
              </Grid>

              <Button
                sx={{
                  mt: 3,
                  backgroundColor: "#FF7F50",
                  float: "right",
                }}
                variant="contained"
                endIcon={<LockOpenRounded />}
                type="submit"
              >
                LOGIN
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserLogin;
