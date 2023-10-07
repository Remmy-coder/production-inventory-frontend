import {
  Autocomplete,
  Box,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import React from "react";
import { CountryType } from "../data";

const CountryInput: React.FC<{ [key: string]: any }> = ({ props }) => {
  return (
    <Field name={props.name}>
      {({ field, meta }: FieldProps) => (
        <>
          <FormGroup>
            <Autocomplete
              fullWidth
              options={props.countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              onChange={(
                event: React.SyntheticEvent<Element, Event>,
                value: CountryType | null
              ) => {
                field.onChange({
                  target: {
                    id: props.name,
                    name: props.name,
                    value: value?.label,
                  },
                });
                props.setSelectedCountry(value?.label);
              }}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code}) +{option.phone}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  label={props.label}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                  error={!!meta.error}
                  fullWidth
                />
              )}
            />
            {meta.error && (
              <FormHelperText error>{String(meta.error)}</FormHelperText>
            )}
          </FormGroup>
        </>
      )}
    </Field>
  );
};

export default CountryInput;
