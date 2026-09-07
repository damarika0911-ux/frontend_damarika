"use client";

import * as React from "react";
import FormLabel, { FormLabelProps } from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";

const StyledFormLabel = styled(FormLabel)(() => ({
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: 1.25,
  color: "#000",
  opacity: 1,
  transition: "opacity 0.2s ease",
  "&.Mui-disabled": {
    cursor: "not-allowed",
    opacity: 0.7,
  },
}));

const Label = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (props, ref) => <StyledFormLabel ref={ref} {...props} />
);

Label.displayName = "Label";

export { Label };
