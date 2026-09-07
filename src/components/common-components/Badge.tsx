import * as React from "react";
import { styled } from "@mui/material/styles";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  sx?: React.CSSProperties | ((theme: any) => React.CSSProperties);
}

const StyledBadge = styled("div")<BadgeProps>(
  ({ theme, variant = "default" }) => {
    const baseStyles = {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: 600,
      padding: "2px 10px",
      transition: "background-color 0.2s",
      border: "1px solid transparent",
    };

    switch (variant) {
      case "secondary":
        return {
          ...baseStyles,
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        };
      case "destructive":
        return {
          ...baseStyles,
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.error.dark,
          },
        };
      case "outline":
        return {
          ...baseStyles,
          backgroundColor: "transparent",
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        };
    }
  }
);

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  ...props
}) => {
  return <StyledBadge variant={variant} {...props} />;
};
