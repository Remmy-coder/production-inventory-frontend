import { LoginRounded } from "@mui/icons-material";
import { Avatar, Box, Container, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { IUserRegistration } from "../../interfaces/user";
import * as Yup from "yup";
import LoginForm from "./LoginForms/LoginForm";
import { LoginFlow } from ".";

interface IProps {
  setTransition: React.Dispatch<React.SetStateAction<LoginFlow>>;
}

const UserLogin: React.FC<IProps> = (props) => {
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
          marginTop: 10,
          marginBottom: 10,
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
            backgroundColor: "slateblue",
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
          validateOnChange={true}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={(data) => {
            console.log(data);
            props.setTransition(LoginFlow.otpLogin);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <LoginForm
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default UserLogin;
