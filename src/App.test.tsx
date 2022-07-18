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

it("renders Location drawer component without error", async () => {
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

it("changes value when clicked", () => {
  const onChange = jest.fn();
  act(() => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <Locations />
        </MockedProvider>
      </MemoryRouter>
    );
  });

  // get a hold of the button element, and trigger some clicks on it
  // const button = document.querySelector("[data-testid=toggle]");
  // expect(button.innerHTML).toBe("Turn on");

  // act(() => {
  //   button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  // });

  // expect(onChange).toHaveBeenCalledTimes(1);
  // expect(button.innerHTML).toBe("Turn off");

  // act(() => {
  //   for (let i = 0; i < 5; i++) {
  //     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  //   }
  // });

  // expect(onChange).toHaveBeenCalledTimes(6);
  // expect(button.innerHTML).toBe("Turn on");
});
