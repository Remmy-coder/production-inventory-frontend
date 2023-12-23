import { Avatar, Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { PersonAddAltRounded } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import { IUserRegistration } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
import UserCreationForm from "./SignupForms/UserCreationForm";
import { useCreateUserMutation } from "../../services/userApi";

const UserCreation: React.FC = () => {
  const initialValues = {} as unknown as IUserRegistration;
  const [initialState, setInitialState] =
    useState<IUserRegistration>(initialValues);

  const newlyCreatedCompanyId: string | null = localStorage.getItem(
    "newlyCreatedCompanyId"
  );

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [createUser] = useCreateUserMutation();

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

  const handleSubmit = async (data: IUserRegistration) => {
    const apiQuery: any = await createUser({
      companyId: newlyCreatedCompanyId,
      ...data,
    });

    if (apiQuery?.data?.success) {
      localStorage.removeItem("newlyCreatedCompanyId");
      navigate("/");
    }
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
            backgroundColor: "slateblue",
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
            //console.log(data);
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
