import React from "react";
import { Typography } from "@mui/material";

interface Props {
  label: string;
  value: string;
}

export const Line: React.FC<Props> = ({ label, value }) => {
  const excludedFields = [
    "id",
    "image",
    "__typename",
    "origin",
    "location",
    "episode",
    "characters",
    "residents",
  ];
  if (!label || excludedFields.indexOf(label) >= 0) return null;

  let _value = value;
  if (label === "created" && value)
    _value = new Date(value).toLocaleDateString("en-EN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ minWidth: "100px", float: "left" }}
      >
        {label.split("_").join(" ")}:
      </Typography>

      <Typography
        variant="body1"
        color="textPrimary"
        sx={{ fontWeight: "bold", display: "inline" }}
      >
        {_value || "-"}
      </Typography>
      <br />
    </>
  );
};
