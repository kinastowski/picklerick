import React, { useEffect } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { CoreDataGrid } from "./CoreDataGrid";
import Box from "@mui/material/Box";
import { GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { ICharacter, ILocation, IEpisode, RefetchObject } from "../interfaces";

interface Props {
  data: Array<ICharacter> | Array<ILocation> | Array<IEpisode>;
  selectedId: number | null;
  count: number;
  isLoading: boolean;
  searchLabel?: string;
  filters?: Array<string>;
  columns: Array<GridColDef>;
  refetch: (arg0: RefetchObject) => void;
  onClose: () => void;
  children: React.ReactNode;
}

export const InteractiveDataGrid: React.FC<Props> = ({
  children,
  selectedId,
  data,
  count,
  refetch,
  columns,
  onClose,
  isLoading,
  searchLabel,
  filters,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  useEffect(() => {
    setOpen(selectedId != null);
  }, [selectedId]);

  function closeDrawer() {
    setOpen(false);
    onClose();
  }

  return (
    <>
      <CoreDataGrid
        data={data}
        count={count}
        columns={columns}
        refetch={refetch}
        isLoading={isLoading}
        filters={filters}
        searchLabel={searchLabel}
      />
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={closeDrawer}
        onOpen={() => setOpen(true)}
      >
        <Box sx={{ width: 600 }} role="presentation" onKeyDown={closeDrawer}>
          {" "}
          {children}
        </Box>
        <Button
          variant="outlined"
          onClick={closeDrawer}
          sx={{ width: 100, m: 2 }}
        >
          Close
        </Button>
      </SwipeableDrawer>
    </>
  );
};
