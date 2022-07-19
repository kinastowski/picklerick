import React from "react";
import { Avatar, Box, Tooltip } from "@mui/material";

import { Link } from "react-router-dom";
import { ICharacterAvatar } from "../interfaces";

interface Props {
  characters: any;
}

export const CharactersList: React.FC<Props> = ({ characters }) => {
  //   const [value, setValue] = React.<string | null>(null);

  return (
    characters &&
    characters.map((item: ICharacterAvatar, i: number) => (
      <Tooltip key={"character" + i} title={item.name}>
        <Link to={"/character?id=" + item.id}>
          <Box sx={{ display: "inline-block" }}>
            <Avatar src={item.image} alt={item.name} />
          </Box>
        </Link>
      </Tooltip>
    ))
  );
};
