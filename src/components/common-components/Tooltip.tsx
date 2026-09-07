import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LightBrownTooltip = styled((props: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: props.className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#d2b48c",
    color: "#8B4513",
    fontSize: 12,
    borderRadius: 4,
    fontWeight: 600,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
}));
