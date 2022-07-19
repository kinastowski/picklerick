import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { Page } from "../layout/Page";
// import { CoreDataGrid } from "../components/CoreDataGrid";
import { InteractiveDataGrid } from "../components/InteractiveDataGrid";
import { Location } from "../components/drawers/Location";
import { GridColDef } from "@mui/x-data-grid";

import { Loading } from "../components/Loading";
import { ILocationsData, ILocationsVars } from "../interfaces";
import { GET_LOCATIONS } from "../graphql/queries";
import { ShowButton } from "../components/ShowButton";

interface Props {
  label?: string;
}

export const Locations: React.FC<Props> = ({ label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const { loading, error, data, refetch } = useQuery<
    ILocationsData,
    ILocationsVars
  >(GET_LOCATIONS);

  useEffect(() => {
    const id = searchParams.get("id");
    id && setSelectedId(parseInt(id));
  }, [searchParams]);

  if (loading) return <Loading />;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }

  function onClickRow(id: string) {
    setSearchParams({ id });
    setSelectedId(parseInt(id));
  }

  function onClose() {
    setSelectedId(null);
    setSearchParams({});
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 80 },
    { field: "name", headerName: "name", width: 400 },
    { field: "type", headerName: "type", width: 150 },
    { field: "dimension", headerName: "dimension", width: 150 },
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
    <Page title="All locations">
      <InteractiveDataGrid
        data={data ? data.locations.results : []}
        count={data ? data.locations.info.count : 0}
        refetch={refetch}
        isLoading={loading || false}
        columns={columns}
        selectedId={selectedId}
        onClose={onClose}
        filters={["name", "type", "dimension"]}
        searchLabel="Search for location..."
      >
        {selectedId && <Location id={selectedId} />}
      </InteractiveDataGrid>
    </Page>
  );
};
