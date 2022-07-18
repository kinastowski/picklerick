import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { Page } from "../layout/Page";
// import { CoreDataGrid } from "../components/CoreDataGrid";
import { InteractiveDataGrid } from "../components/InteractiveDataGrid";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Loading } from "../components/Loading";
import { Episode } from "../components/drawers/Episode";
import { IEpisodesData, IEpisodesVars } from "../interfaces";
import { GET_EPISODES } from "../graphql/queries";
import { ShowButton } from "../components/ShowButton";

interface Props {
  label?: string;
}

export const Episodes: React.FC<Props> = ({ label }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    setSelectedId(id ? parseInt(id) : null);
  }, [searchParams]);

  const { loading, error, data, refetch } = useQuery<
    IEpisodesData,
    IEpisodesVars
  >(GET_EPISODES);

  if (loading) return <Loading />;
  if (error) return <p>Error :(</p>;

  function onClickRow(row: any) {
    setSearchParams({ id: row.id });
    setSelectedId(parseInt(row.id));
  }

  function onClose() {
    setSelectedId(null);
    setSearchParams({});
  }

  const columns: GridColDef[] = [
    { field: "episode", headerName: "episode", width: 80 },
    { field: "name", headerName: "title", width: 400 },
    { field: "air_date", headerName: "air date", width: 150 },
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
    <Page title="All episodes">
      <InteractiveDataGrid
        data={data ? data.episodes.results : []}
        count={data ? data.episodes.info.count : 0}
        refetch={refetch}
        isLoading={loading || false}
        columns={columns}
        selectedId={selectedId}
        onClose={onClose}
        filters={["name", "episode"]}
        searchLabel="Search for episodes..."
      >
        {selectedId && <Episode id={selectedId} />}
      </InteractiveDataGrid>
    </Page>
  );
};
