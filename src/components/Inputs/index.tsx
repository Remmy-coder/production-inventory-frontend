import {
  Autocomplete,
  FormGroup,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Field, FieldProps } from "formik";
import { CountryType } from "../../data";
import CountryInput from "./CountryInput";

interface ReusableComponentsPropBase {
  name: string;
  label: string;
  [key: string]: any;
}

export interface AutocompleteOptionProps {
  [key: string | number]: any;
}

interface ReusableTextFieldProps extends ReusableComponentsPropBase {
  type: string;
}

interface ReusableAutocompleteProps extends ReusableComponentsPropBase {
  options: AutocompleteOptionProps[];
}

interface ReusableCountryAutocompleteProps extends ReusableComponentsPropBase {
  countries: CountryType[];
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// interface ReusableStateAutocompleteProps extends ReusableComponentsPropBase {
//   options: string[];
// }

export const ReusableTextField: React.FC<ReusableTextFieldProps> = ({
  name,
  label,
  type,
  ...props
}) => {
  return (
    <>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <>
            <TextField
              label={label}
              type={type}
              {...field}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(event);
              }}
              error={!!meta.error}
              fullWidth
              value={field.value || ""}
              {...props}
            />
            {meta.error && (
              <FormHelperText error>{String(meta.error)}</FormHelperText>
            )}
          </>
        )}
      </Field>
    </>
  );
};

export const ReusableAutocomplete: React.FC<ReusableAutocompleteProps> = ({
  name,
  label,
  options,
  ...props
}) => {
  return (
    <>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <>
            <FormGroup>
              <Autocomplete
                fullWidth
                options={options}
                autoHighlight
                onChange={(
                  event:  any,
                  value: AutocompleteOptionProps | null
                ) => {
                  field.onChange({
                    target: {
                      id: name,
                      name,
                      value: event.target.innerText,
                    },
                  });
                }}
                {...props}
                renderInput={(params) => (
                  <TextField {...params} label={label} error={!!meta.error} />
                )}
              />
              {meta.error && (
                <FormHelperText error>{String(meta.error)}</FormHelperText>
              )}
            </FormGroup>
          </>
        )}
      </Field>
    </>
  );
};

// export const ReusableCountryStateAutocomplete: React.FC<
//   ReusableStateAutocompleteProps
// > = ({ name, label, options }) => {
//   return (
//     <>
//       <Field name={name}>
//         {({ field, meta }: FieldProps) => (
//           <>
//             <FormGroup>
//               <Autocomplete
//                 fullWidth
//                 options={options}
//                 autoHighlight
//                 onChange={(
//                   event: React.SyntheticEvent<Element, Event>,
//                   value: string | null
//                 ) => {
//                   field.onChange({
//                     target: {
//                       id: "state",
//                       name: "state",
//                       value: value,
//                     },
//                   });
//                 }}
//                 renderInput={(params) => (
//                   <TextField {...params} label={label} error={!!meta.error} />
//                 )}
//               />
//               {meta.error && (
//                 <FormHelperText error>{String(meta.error)}</FormHelperText>
//               )}
//             </FormGroup>
//           </>
//         )}
//       </Field>
//     </>
//   );
// };

export const ReusableCountryAutocomplete: React.FC<
  ReusableCountryAutocompleteProps
> = ({ name, label, countries, setSelectedCountry }) => {
  const props = { name, label, countries, setSelectedCountry };
  return <CountryInput props={props} />;
};