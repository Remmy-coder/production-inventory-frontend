import {
  Button,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Field, FieldProps, Form } from "formik";
import React from "react";
import { ReusableTextField } from "../../../components/Inputs";
import {
  LockOpenRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

interface IUserLogin {
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  showPassword: boolean;
  handleClickShowPassword: React.MouseEventHandler<HTMLButtonElement>;
  handleMouseDownPassword: React.MouseEventHandler<HTMLButtonElement>;
}

const LoginForm: React.FC<IUserLogin> = (props) => {
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
            name="email"
            label="Email Address"
            type="text"
            sx={{ width: 300 }}
          />
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
                    type={props.showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
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
          backgroundColor: "slateblue",
          float: "right",
        }}
        variant="contained"
        endIcon={<LockOpenRounded />}
        type="submit"
      >
        LOGIN
      </Button>
    </Box>
  );
};

export default LoginForm;
