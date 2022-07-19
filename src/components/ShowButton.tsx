import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

interface Props {
  id: string;
  onClick: (arg1: any) => void;
}

export const ShowButton: React.FC<Props> = ({ onClick, id }) => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <Button
      size="small"
      variant="outlined"
      color="primary"
      onClick={() => onClick(id)}
      data-testid={`show-${id}`}
    >
      show
    </Button>
  </Box>
);
