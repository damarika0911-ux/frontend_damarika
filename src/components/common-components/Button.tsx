import { Button } from "@mui/material";

export const ActionButton = (props: any) => (
  <Button
    {...props}
    className={`font-medium rounded-lg capitalize text-sm ${props.className}`}
    variant={props.variant || "contained"}
    disableElevation
    sx={{ textTransform: "capitalize", ...props.style }}
  >
    {props.children}
  </Button>
);
