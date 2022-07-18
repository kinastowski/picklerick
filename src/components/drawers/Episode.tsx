import React from "react";
import { useQuery } from "@apollo/client";
import { Paragraph } from "../Paragraph";
import { Loading } from "../Loading";
import { Box } from "@mui/system";
import { CharactersList } from "../CharactersList";
import { IEpisodeData, IEpisodeVars } from "../../interfaces";
import { GET_EPISODE } from "../../graphql/queries";

interface Props {
  id: number;
}

export const Episode: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery<IEpisodeData, IEpisodeVars>(
    GET_EPISODE,
    {
      variables: { id },
    }
  );

  if (loading) return <Loading />;
  if (error) {
    // console.log(error);
    return <p>Error :(</p>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paragraph
        label={data ? "Episode: " + data.episode.episode : ""}
        value={data && data.episode}
      />

      <Paragraph label="Characters">
        <CharactersList characters={data && data.episode.characters} />
      </Paragraph>
    </Box>
  );
};
