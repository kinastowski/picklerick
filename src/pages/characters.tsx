import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Page } from "../layout/Page";
import { CoreDataGrid } from "../components/CoreDataGrid";
// import { InteractiveDataGrid } from "../components/InteractiveDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Loading } from "../components/Loading";
import { ICharactersData, ICharactersVars } from "../interfaces";
import { ShowButton } from "../components/ShowButton";
import { GET_CHARACTERS } from "../graphql/queries";

interface Props {
  label?: string;
}

export const Characters: React.FC<Props> = ({ label }) => {
  const { loading, data, error, refetch } = useQuery<
    ICharactersData,
    ICharactersVars
  >(GET_CHARACTERS);

  const navigate = useNavigate();

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  function onClickRow(id: string) {
    navigate(`/character?id=${id}`);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 80 },
    {
      field: "image",
      headerName: "avatar",
      width: 80,
      renderCell: (params) => {
        return <Avatar src={params.value} />;
      },
    },
    { field: "name", headerName: "name", width: 320 },
    { field: "status", headerName: "status", width: 160 },
    {
      field: "species",
      headerName: "species",
      type: "string",
      width: 160,
    },
    {
      field: "gender",
      headerName: "gender",
      type: "string",
      width: 160,
    },
    {
      field: "action",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <ShowButton id={`${params.id}`} onClick={onClickRow} />
      ),
    },
  ];

  return (
    <Page title="All characters">
      <CoreDataGrid
        data={data ? data.characters.results : []}
        count={data ? data.characters.info.count : 0}
        refetch={refetch}
        isLoading={loading || false}
        columns={columns}
        filters={["name", "status", "species", "gender"]}
        searchLabel="Search for characters..."
      />
    </Page>
  );
};
