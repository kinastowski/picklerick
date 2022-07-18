import * as React from "react";

import "./App.css";
import MainLayout from "./layout";
import { useRoutes } from "react-router-dom";
import { Character } from "./pages/character";
import { Characters } from "./pages/characters";

import { Episodes } from "./pages/episodes";

import { Locations } from "./pages/locations";

export default function App() {
  let element = useRoutes([
    { path: "/", element: <Characters /> },

    {
      path: "character",
      element: <Character />,
    },
    {
      path: "episodes",
      element: <Episodes />,
    },
    {
      path: "locations",
      element: <Locations />,
    },
  ]);

  return <MainLayout>{element}</MainLayout>;
}
