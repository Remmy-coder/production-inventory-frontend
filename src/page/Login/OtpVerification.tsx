import { ShieldRounded } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import OtpVerificationForm from "./LoginForms/OtpVerificationForm";

const OtpVerification: React.FC = () => {
  const initialValues = {};
  const [initialState, setInitialState] = useState<{ [field: string]: any }>(
    initialValues
  );

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required().label("OTP"),
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
          <ShieldRounded fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          OTP Verification
        </Typography>
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          validateOnChange={true}
          validateOnBlur={false}
          validateOnMount={false}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <OtpVerificationForm handleSubmit={handleSubmit} />
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default OtpVerification;
