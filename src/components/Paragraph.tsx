import React from "react";
import { Box, Typography } from "@mui/material";
import { Line } from "./Line";

interface Props {
  label: string;
  value?: any;
  children?: React.ReactNode;
}

export const Paragraph: React.FC<Props> = ({ label, value, children }) => (
  <Box sx={{ mt: 1 }}>
    <Typography
      component="h4"
      variant="h5"
      color="inherit"
      noWrap
      sx={{
        flexGrow: 1,
        borderBottom: "1px solid #e0e0e0",
        mt: 3,
        mb: 1,
      }}
    >
      {label}
    </Typography>
    {value &&
      Object.keys(value).map((key) => (
        <Line key={key + label} label={key} value={value[key]} />
      ))}
    {children}
  </Box>
);
