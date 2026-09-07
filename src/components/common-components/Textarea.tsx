import * as React from "react";
import { TextField } from "@mui/material";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof TextField>
>(({ className, ...props }, ref) => {
  return (
    <TextField
      multiline
      minRows={5}
      variant="outlined"
      fullWidth
      inputRef={ref}
      sx={{
        marginTop: "5px",
      }}
      className={`flex w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
