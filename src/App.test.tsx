import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { gql } from "@apollo/client";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { Locations } from "./pages/locations";
import { Character } from "./pages/character";
import { Episodes } from "./components/drawers/Episodes";
import { Episode } from "./components/drawers/Episode";
import { Location } from "./components/drawers/Location";
import { Line } from "./components/Line";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import {
  GET_LOCATION,
  GET_LOCATIONS,
  GET_CHARACTER,
  GET_CHARACTER_EPISODES,
  GET_EPISODE,
} from "./graphql/queries";

it("renders Character component without error", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTER,
        variables: {
          id: "1",
        },
      },
      result: {
        data: {
          character: {
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            gender: "Male",
            origin: {
              id: "1",
              name: "Earth (C-137)",
              type: "Planet",
              dimension: "Dimension C-137",
              created: "2017-11-10T12:42:04.162Z",
              __typename: "Location",
            },
            location: {
              id: "3",
              name: "Citadel of Ricks",
              type: "Space station",
              dimension: "unknown",
              created: "2017-11-10T13:08:13.191Z",
              __typename: "Location",
            },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            created: "2017-11-04T18:48:46.250Z",
            __typename: "Character",
          },
        },
      },
    },
  ];
  act(() => {
    render(
      <MemoryRouter initialEntries={["/character?id=1"]}>
        <MockedProvider mocks={mocks}>
          <Character />
        </MockedProvider>
      </MemoryRouter>
    );
  });
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findAllByText("Rick Sanchez")).toHaveLength(2);
  expect(await screen.findByText("Planet")).toBeVisible();
  expect(await screen.findByText("Human")).toBeVisible();
  expect(await screen.findByText("Alive")).toBeVisible();

  // expect(await screen.findByText("/Sanchez/")).toBeInTheDocument();
});

it("renders Episodes drawer component without error", async () => {
  const mocks = [
    {
      request: {
        query: GET_CHARACTER_EPISODES,
        variables: {
          id: "65",
        },
      },
      result: {
        data: {
          character: {
            episode: [
              {
                id: "17",
                name: "The Ricks Must Be Crazy",
                air_date: "August 30, 2015",
                episode: "S02E06",
                created: "2017-11-10T12:56:35.467Z",
                __typename: "Episode",
              },
            ],
            __typename: "Character",
          },
        },
      },
    },
  ];

  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <Episodes id="65" />
      </MockedProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findAllByText("The Ricks Must Be Crazy")).toHaveLength(1);

  // expect(await screen.findByText("/Sanchez/")).toBeInTheDocument();
});

it("renders Episode drawer component without error", async () => {
  const mocks = [
    {
      request: {
        query: GET_EPISODE,
        variables: {
          id: 50,
        },
      },
      result: {
        data: {
          episode: {
            id: "50",
            name: "Forgetting Sarick Mortshall",
            air_date: "September 5, 2021",
            episode: "S05E09",
            characters: [
              {
                id: "1",
                name: "Rick Sanchez",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                __typename: "Character",
              },
              {
                id: "2",
                name: "Morty Smith",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                __typename: "Character",
              },
              {
                id: "5",
                name: "Jerry Smith",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
                __typename: "Character",
              },
              {
                id: "787",
                name: "Two Crows",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/787.jpeg",
                __typename: "Character",
              },
              {
                id: "788",
                name: "Mr. Cookie President",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/788.jpeg",
                __typename: "Character",
              },
              {
                id: "789",
                name: "Nick",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/789.jpeg",
                __typename: "Character",
              },
              {
                id: "790",
                name: "Harold (Garbage Goober)",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/790.jpeg",
                __typename: "Character",
              },
              {
                id: "791",
                name: "Harold's Wife",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/791.jpeg",
                __typename: "Character",
              },
              {
                id: "792",
                name: "Alien Crow",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/792.jpeg",
                __typename: "Character",
              },
              {
                id: "793",
                name: "Alien Crow",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/793.jpeg",
                __typename: "Character",
              },
            ],
            created: "2021-10-15T17:00:24.105Z",
            __typename: "Episode",
          },
        },
      },
    },
  ];

  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <Episode id={50} />
      </MockedProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(
    await screen.findAllByText("Forgetting Sarick Mortshall")
  ).toHaveLength(1);

  // expect(await screen.findByText("/Sanchez/")).toBeInTheDocument();
});

it("renders Locations drawer component without error", async () => {
  const mocks = [
    {
      request: {
        query: GET_LOCATION,
        variables: {
          id: 2,
        },
      },
      result: {
        data: {
          location: {
            id: "2",
            name: "Abadango",
            type: "Cluster",
            dimension: "unknown",
            residents: [
              {
                id: "6",
                name: "Abadango Cluster Princess",
                image:
                  "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
                __typename: "Character",
              },
            ],
            created: "2017-11-10T13:06:38.182Z",
            __typename: "Location",
          },
        },
      },
    },
  ];

  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <Location id={2} />
      </MockedProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findAllByText("Abadango")).toHaveLength(1);

  // expect(await screen.findByText("/Sanchez/")).toBeInTheDocument();
});

it("renders Line component", async () => {
  act(() => {
    render(<Line label="label_test" value="value_test" />);
  });
  expect(await screen.findByText("label test:")).toBeInTheDocument();
  expect(await screen.findByText("value_test")).toBeInTheDocument();
});

it("renders Locations component without error", async () => {
  const mocks = [
    {
      request: {
        query: GET_LOCATIONS,
      },
      result: {
        data: {
          locations: {
            info: {
              count: 126,
              pages: 7,
              next: 2,
              prev: null,
              __typename: "Info",
            },
            results: [
              {
                id: "1",
                name: "Earth (C-137)",
                type: "Planet",
                dimension: "Dimension C-137",
                created: "2017-11-10T12:42:04.162Z",
                __typename: "Location",
              },
              {
                id: "2",
                name: "Abadango",
                type: "Cluster",
                dimension: "unknown",
                created: "2017-11-10T13:06:38.182Z",
                __typename: "Location",
              },
              {
                id: "3",
                name: "Citadel of Ricks",
                type: "Space station",
                dimension: "unknown",
                created: "2017-11-10T13:08:13.191Z",
                __typename: "Location",
              },
              {
                id: "4",
                name: "Worldender's lair",
                type: "Planet",
                dimension: "unknown",
                created: "2017-11-10T13:08:20.569Z",
                __typename: "Location",
              },
              {
                id: "5",
                name: "Anatomy Park",
                type: "Microverse",
                dimension: "Dimension C-137",
                created: "2017-11-10T13:08:46.060Z",
                __typename: "Location",
              },
              {
                id: "6",
                name: "Interdimensional Cable",
                type: "TV",
                dimension: "unknown",
                created: "2017-11-10T13:09:09.102Z",
                __typename: "Location",
              },
              {
                id: "7",
                name: "Immortality Field Resort",
                type: "Resort",
                dimension: "unknown",
                created: "2017-11-10T13:09:17.136Z",
                __typename: "Location",
              },
              {
                id: "8",
                name: "Post-Apocalyptic Earth",
                type: "Planet",
                dimension: "Post-Apocalyptic Dimension",
                created: "2017-11-10T13:09:22.551Z",
                __typename: "Location",
              },
              {
                id: "9",
                name: "Purge Planet",
                type: "Planet",
                dimension: "Replacement Dimension",
                created: "2017-11-10T13:09:29.566Z",
                __typename: "Location",
              },
              {
                id: "10",
                name: "Venzenulon 7",
                type: "Planet",
                dimension: "unknown",
                created: "2017-11-18T11:21:51.643Z",
                __typename: "Location",
              },
              {
                id: "11",
                name: "Bepis 9",
                type: "Planet",
                dimension: "unknown",
                created: "2017-11-18T11:26:03.325Z",
                __typename: "Location",
              },
              {
                id: "12",
                name: "Cronenberg Earth",
                type: "Planet",
                dimension: "Cronenberg Dimension",
                created: "2017-11-18T11:29:27.857Z",
                __typename: "Location",
              },
              {
                id: "13",
                name: "Nuptia 4",
                type: "Planet",
                dimension: "unknown",
                created: "2017-11-18T11:30:29.780Z",
                __typename: "Location",
              },
              {
                id: "14",
                name: "Giant's Town",
                type: "Fantasy town",
                dimension: "Fantasy Dimension",
                created: "2017-11-18T11:31:15.248Z",
                __typename: "Location",
              },
              {
                id: "15",
                name: "Bird World",
                type: "Planet",
                dimension: "unknown",
                created: "2017-11-18T11:32:26.752Z",
                __typename: "Location",
              },
              {
                id: "16",
                name: "St. Gloopy Noops Hospital",
                type: "Space station",
                dimension: "unknown",
                created: "2017-11-18T11:43:20.075Z",
                __typename: "Location",
              },
              {
                id: "17",
                name: "Earth (5-126)",
                type: "Planet",
                dimension: "Dimension 5-126",
                created: "2017-11-18T11:41:08.486Z",
                __typename: "Location",
              },
              {
                id: "18",
                name: "Mr. Goldenfold's dream",
                type: "Dream",
                dimension: "Dimension C-137",
                created: "2017-11-18T11:46:22.933Z",
                __typename: "Location",
              },
              {
                id: "19",
                name: "Gromflom Prime",
                type: "Planet",
                dimension: "Replacement Dimension",
                created: "2017-11-18T11:39:52.165Z",
                __typename: "Location",
              },
              {
                id: "20",
                name: "Earth (Replacement Dimension)",
                type: "Planet",
                dimension: "Replacement Dimension",
                created: "2017-11-18T19:33:01.173Z",
                __typename: "Location",
              },
            ],
            __typename: "Locations",
          },
        },
      },
    },
  ];

  jest.useFakeTimers();

  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <Locations />
      </MockedProvider>
    </MemoryRouter>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();

  expect(await screen.findByText("Abadango")).toBeInTheDocument();
  expect(await screen.findByText("Earth (C-137)")).toBeInTheDocument();

  // const button = await screen.findByTestId("show-1");
  // console.log(button, "!!");
  // if (button) {
  //   expect(button.innerHTML).toBe("SHOW");

  //   // act(() => {
  //   //   button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  //   // });
  // }
});
