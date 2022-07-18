import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Page: React.FC<Props> = ({ title, children }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 1, pr: 0 }}>
      <Box
        sx={{
          height: "10vh",
          width: "100%",
          pt: "1vh",
        }}
      >
        <Typography
          component="h4"
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Container>
  );
};
