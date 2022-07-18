import React from "react";
import { useQuery } from "@apollo/client";
import { Paragraph } from "../Paragraph";
import { Loading } from "../Loading";
import { Box } from "@mui/system";
import { CharactersList } from "../CharactersList";
import { ILocationData, ILocationVars } from "../../interfaces";
import { GET_LOCATION } from "../../graphql/queries";

interface Props {
  id: number;
}

export const Location: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery<ILocationData, ILocationVars>(
    GET_LOCATION,
    {
      variables: { id },
    }
  );

  if (loading) return <Loading />;
  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paragraph
        label={data ? "Location: " + data.location.name : ""}
        value={data && data.location}
      />

      <Paragraph label="Residents">
        <CharactersList characters={data && data.location.residents} />
      </Paragraph>
    </Box>
  );
};
