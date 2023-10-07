import {
  Button,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, FieldProps, Form } from "formik";
import React from "react";
import {
  ReusableAutocomplete,
  ReusableTextField,
} from "../../../components/Inputs";
import { gender } from "../../../data";
import {
  VisibilityOff,
  Visibility,
  CreateNewFolderRounded,
} from "@mui/icons-material";
import PasswordChecklist from "react-password-checklist";
import { IUserRegistration } from "../../../interfaces/user";

interface IUserCreationFormProp {
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleClickShowPassword: React.MouseEventHandler<HTMLButtonElement>;
  handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement>;
  handleClickShowConfirmPassword: React.MouseEventHandler<HTMLButtonElement>;
  values: Partial<IUserRegistration>;
}

const UserCreationForm: React.FC<IUserCreationFormProp> = (props) => {
  return (
    <Box
      component={Form}
      noValidate
      onSubmit={props.handleSubmit}
      sx={{
        mt: 3,
        mb: 3,
        px: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ReusableTextField name="firstName" label="First Name" type="text" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReusableTextField name="lastName" label="Last Name" type="text" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReusableTextField name="email" label="Email Address" type="email" />
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
                    type={props.showPassword ? "text" : "password"}
                    label="Password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                          onClick={props.handleClickShowPassword}
                          onMouseDown={props.handleMouseDownPassword}
                          edge="end"
                        >
                          {props.showPassword ? (
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
                    type={props.showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                          onClick={props.handleClickShowConfirmPassword}
                          onMouseDown={props.handleMouseDownPassword}
                          edge="end"
                        >
                          {props.showConfirmPassword ? (
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
            value={String(props.values.password)}
            valueAgain={props.values.confirmPassword}
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
  );
};

export default UserCreationForm;
