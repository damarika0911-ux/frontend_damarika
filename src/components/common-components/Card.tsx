import * as React from "react";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardActions as MuiCardFooter,
  Typography,
  Box,
} from "@mui/material";

const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MuiCard>
>(({ children, className, ...props }, ref) => (
  <MuiCard
    ref={ref}
    elevation={1}
    className={className}
    sx={{
      borderRadius: 2,
      backgroundColor: "background.paper",
      color: "text.primary",
    }}
    {...props}
  >
    {children}
  </MuiCard>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={className}
    sx={{ display: "flex", flexDirection: "column", gap: 1.5, px: 3, py: 1.5 }}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h6"
    fontSize="20px"
    fontWeight={600}
    lineHeight={1.3}
    className={className}
    {...props}
  >
    {children}
  </Typography>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="body2"
    color="text.secondary"
    className={className}
    {...props}
  >
    {children}
  </Typography>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MuiCardContent>
>(({ className, ...props }, ref) => (
  <MuiCardContent
    ref={ref}
    className={className}
    sx={{ pt: 0, px: 3, pb: 2 }}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MuiCardFooter>
>(({ className, ...props }, ref) => (
  <MuiCardFooter
    ref={ref}
    className={className}
    sx={{ pt: 0, px: 3, pb: 3, display: "flex", alignItems: "center" }}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
