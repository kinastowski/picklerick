import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  id?: string;
  path?: string;
  onClick?: (arg1: any) => void;
}

export const ShowButton: React.FC<Props> = ({ path, onClick, id }) => {
  const navigate = useNavigate();

  function handleClick() {
    if (path) navigate(path);
    if (onClick) onClick({ id: id });
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button variant="outlined" color="primary" onClick={handleClick}>
        show
      </Button>
    </Box>
  );
};
