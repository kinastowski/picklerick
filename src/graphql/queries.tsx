import { gql } from "@apollo/client";

export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
      created
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      status
      species
      gender
      origin {
        id
        name
        type
        dimension
        created
      }
      location {
        id
        name
        type
        dimension
        created
      }
      image

      created
    }
  }
`;

export const GET_CHARACTER_EPISODES = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      episode {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;

export const GET_EPISODE = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        image
      }
      created
    }
  }
`;

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int, $filter: FilterLocation) {
    locations(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        created
      }
    }
  }
`;

export const GET_EPISODES = gql`
  query GetEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;
