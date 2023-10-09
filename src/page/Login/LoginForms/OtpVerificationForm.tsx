import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Form } from "formik";
import React from "react";
import { ReusableTextField } from "../../../components/Inputs";
import { LockOpenRounded } from "@mui/icons-material";

interface IOtpValidation {
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

const OtpVerificationForm: React.FC<IOtpValidation> = (props) => {
  return (
    <Box
      component={Form}
      noValidate
      onSubmit={props.handleSubmit}
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
            <ReusableTextField 
            name="otp"
            label="OTP"
            type="text"
            />
        </Grid>
      </Grid>

      <Button
        sx={{
          mt: 4,
          backgroundColor: "slateblue",
          float: "right",
        }}
        variant="contained"
        endIcon={<LockOpenRounded />}
        type="submit"
      >
        PROCEED
      </Button>
    </Box>
  );
};

export default OtpVerificationForm;
