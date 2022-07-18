import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const Loading: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    sx={{ height: "80vh" }}
  >
    <CircularProgress />
    <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
      Loading...
    </Typography>
  </Box>
);
