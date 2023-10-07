import {
  Avatar,
  Box,
  Container,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  PersonAddAltRounded,
} from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import { IUserRegistration } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toast } from "react-toastify";
import { registerUser, reset } from "../../features/auth/userAuthSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { ICompanyRegistration } from "../../interfaces/company";
import UserCreationForm from "./SignupForms/UserCreationForm";

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
            //handleSubmit(data);
            console.log(data);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <UserCreationForm
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              handleClickShowConfirmPassword={handleClickShowConfirmPassword}
              values={values}
            />
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserCreation;
