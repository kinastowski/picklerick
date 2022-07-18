import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import React from "react";
import { CoreDataGrid } from "../CoreDataGrid";
import { useNavigate } from "react-router-dom";
import { ICharacterEpisodeData, ICharacterVars } from "../../interfaces";
import { useQuery } from "@apollo/client";
import { Loading } from "../Loading";
import { GET_CHARACTER_EPISODES } from "../../graphql/queries";
import { ShowButton } from "../ShowButton";

interface Props {
  id: string;
}

export const Episodes: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<
    ICharacterEpisodeData,
    ICharacterVars
  >(GET_CHARACTER_EPISODES, {
    variables: { id },
  });

  function onClickRow(row: GridRowParams) {
    navigate(`/episodes?id=${row.id}`);
  }

  if (loading) return <Loading />;
  if (error) {
    return <p>Error :(</p>;
  }
  if (!data) return <p>No data</p>;
  const columns: GridColDef[] = [
    { field: "episode", headerName: "episode", width: 90 },
    { field: "name", headerName: "name", width: 240 },
    { field: "air_date", headerName: "on air", width: 160 },
    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <ShowButton id={"" + params.id} onClick={onClickRow} />
      ),
    },
  ];

  return (
    <>
      <CoreDataGrid
        data={data.character.episode}
        count={data.character.episode.length}
        isLoading={false}
        columns={columns}
      />
    </>
  );
};
