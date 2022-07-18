import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, TextField, Button } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { ICharacter, ILocation, IEpisode, RefetchObject } from "../interfaces";

interface Props {
  data: Array<ICharacter> | Array<ILocation> | Array<IEpisode>;
  count: number;
  isLoading: boolean;
  searchLabel?: string;
  filters?: Array<string>;
  columns: Array<GridColDef>;
  refetch?: (arg0: RefetchObject) => void;
}

export const CoreDataGrid: React.FC<Props> = ({
  data,
  count,
  refetch,
  filters,
  columns,
  searchLabel,
}) => {
  const [search, setSearch] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<string>("name");

  const handleChangeFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  // React.useEffect(() => {
  //   console.log("CoreDataGrid: useEffect", data);
  // }, [data]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value as string);
  }

  function handleSearch() {
    search && refetch && refetch({ filter: { [filter]: search } });
  }
  function handleClearSearch() {
    setSearch("");
    setFilter("name");
    refetch && refetch({ filter: { [filter]: "" } });
    // refetch && refetch({ page: 1 });
  }

  return (
    <Box sx={{ height: "75vh", width: "100%" }}>
      {filters && filters.length && (
        <Box sx={{ mb: 2 }}>
          <TextField
            id="search-input"
            label={searchLabel || "Search"}
            value={search}
            onChange={handleChange}
            size="small"
            sx={{ minWidth: 300 }}
          />
          <FormControl sx={{ mr: 1, ml: 1, minWidth: 120 }} size="small">
            <InputLabel id="search-select-label">Search by</InputLabel>
            <Select
              labelId="search-select-label-id"
              id="search-select"
              value={filter}
              label="Search by"
              onChange={handleChangeFilter}
            >
              {filters &&
                filters.map((f) => (
                  <MenuItem key={f} value={f}>
                    {f}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSearch}
            sx={{ mt: "2px" }}
          >
            Search
          </Button>
          {search && search.length > 0 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClearSearch}
              sx={{ mt: "2px", ml: 1 }}
            >
              Clear
            </Button>
          )}
        </Box>
      )}
      <DataGrid
        rows={data}
        columns={columns}
        rowCount={count}
        paginationMode={refetch ? "server" : "client"}
        onPageChange={
          refetch
            ? (newPage: number) => refetch({ page: newPage + 1 })
            : undefined
        }
        // density="compact"
        pageSize={20}
        rowsPerPageOptions={[20]}
        // checkboxSelection
      />
    </Box>
  );
};
