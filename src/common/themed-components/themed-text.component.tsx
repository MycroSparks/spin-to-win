import { Typography } from "@mui/material";
import { ComponentProps } from "react";
import theme from "../../core/theme/theme.constant";

export const ThemedText: React.FC<ComponentProps<typeof Typography>> = (
  props
) => {
  return (
    <Typography color={theme.palette.text.primary} {...props}></Typography>
  );
};
