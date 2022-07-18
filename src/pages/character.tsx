import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Avatar, Box, Grid, Typography, Button } from "@mui/material";
import { Paragraph } from "../components/Paragraph";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Episodes } from "../components/drawers/Episodes";
import { Loading } from "../components/Loading";
import { ICharacterData, ICharacterVars } from "../interfaces";
import { GET_CHARACTER } from "../graphql/queries";

export const Character: React.FC = () => {
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id") || "0";

  const [open, setOpen] = React.useState<boolean>(false);
  const { loading, error, data } = useQuery<ICharacterData, ICharacterVars>(
    GET_CHARACTER,
    {
      variables: { id },
    }
  );

  if (loading) return <Loading />;
  if (error) {
    return <p>Error :(</p>;
  }
  if (!data) return <p>No data</p>;

  let character = { ...data.character };

  return (
    <>
      <Grid container spacing={1}>
        {/* Chart */}
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="400px"
          >
            <Avatar
              src={data.character.image}
              sx={{ width: 300, height: 300 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            display="flex"
            justifyContent="bottom"
            alignItems="flex-end"
            minHeight="80px"
            sx={{ mt: 6 }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {data.character.name}
            </Typography>
          </Box>
          <Paragraph label="Basic informations" value={character} />
          <Paragraph label="Location" value={character.location} />
          <Paragraph label="Origin" value={character.origin} />

          <Paragraph label="Character appearances">
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              sx={{ mt: 1 }}
            >
              Show episodes
            </Button>
          </Paragraph>
        </Grid>
      </Grid>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box sx={{ width: 600 }} role="presentation">
          {" "}
          <Episodes id={id} />
        </Box>
      </SwipeableDrawer>
    </>
  );
};
