import { ShieldRounded } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import OtpVerificationForm from "./LoginForms/OtpVerificationForm";
import { useOtpValidationMutation } from "../../services/authApi";
import { IOTPValidation } from "../../interfaces/auth";
import { useNavigate } from "react-router-dom";

const OtpVerification: React.FC = () => {
  const initialValues = {};
  const [initialState, setInitialState] =
    useState<Partial<IOTPValidation>>(initialValues);

  const navigate = useNavigate();

  const loggedInUserId: string | null = localStorage.getItem("loggedInUserId");

  const [otpValidation] = useOtpValidationMutation();

  const validationSchema = Yup.object().shape({
    otp: Yup.number().typeError("OTP is a number").required().label("OTP"),
  });

  const OtpFormik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: async (data) => {
      //console.log(data.otp);
      const apiQuery: any = await otpValidation({
        otp: data.otp,
        userId: loggedInUserId,
      });

      if (apiQuery?.data?.success) {
        navigate("/dashboard");
      }
    },
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
        <FormikProvider value={OtpFormik}>
          <OtpVerificationForm handleSubmit={OtpFormik.handleSubmit} />
        </FormikProvider>
      </Box>
    </Container>
  );
};

export default OtpVerification;
