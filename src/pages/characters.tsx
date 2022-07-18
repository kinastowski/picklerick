import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Page } from "../layout/Page";
import { CoreDataGrid } from "../components/CoreDataGrid";
// import { InteractiveDataGrid } from "../components/InteractiveDataGrid";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import Avatar from "@mui/material/Avatar";
import { Loading } from "../components/Loading";
import { ICharactersData, ICharactersVars } from "../interfaces";
import { Button } from "@mui/material";
import { ShowButton } from "../components/ShowButton";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        image
        gender
      }
    }
  }
`;

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
    renderCell: (params) => <ShowButton path={`/character?id=${params.id}`} />,
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

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

  function onClickRow(row: any) {
    navigate(`/character?id=${row.id}`);
  }

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
      {/* <nav>
        <Link to="/about">About</Link>
      </nav> */}
    </Page>
  );
};
