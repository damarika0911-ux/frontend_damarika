import * as React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledInput = styled((props: TextFieldProps) => (
  <TextField {...props} variant="outlined" />
))(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: 40,
    borderRadius: 6,
    marginTop: "5px",
    backgroundColor: theme.palette.background.paper,
    fontSize: "1rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "0.875rem",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    // borderColor: "#8B4513",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#8B4513",
    borderWidth: 2,
  },
  "& .MuiInputBase-input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  "& .Mui-disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));

const Input = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <StyledInput inputRef={ref} fullWidth className={className} {...props} />
    );
  }
);

Input.displayName = "Input";

export { Input };
