interface Info {
  count: number;
  pages: number;
  next?: number;
  prev?: number;
}

interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin?: ILocation;
  location?: ILocation;
  episode?: IEpisode[];
}

interface ICharacterAvatar {
  id: number;
  name: string;
  image: string;
}

interface ICharacterData {
  character: ICharacter;
}

interface ICharacterEpisodeData {
  character: {
    episode: IEpisode[];
  };
}

interface ICharacterVars {
  id: string;
}

interface ICharactersData {
  characters: { results: ICharacter[]; info: Info };
}

interface ICharactersFilter {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

interface ICharactersVars {
  page: number;
  filter: ICharactersFilter;
}

interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  created: string;
  characters?: ICharacterAvatar[];
}

interface IEpisodeData {
  episode: IEpisode;
}

interface IEpisodeVars {
  id: number;
}

interface IEpisodesData {
  episodes: { results: IEpisode[]; info: Info };
}

interface IEpisodesFilter {
  name?: string;
  episode?: string;
}

interface IEpisodesVars {
  page: number;
  filter: IEpisodesFilter;
}

interface ILocation {
  id: number;
  name: string;
  dimension: string;
  type: string;
  created: string;
  residents?: ICharacter[];
}

interface ILocationData {
  location: ILocation;
}

interface ILocationVars {
  id: number;
}

interface ILocationsData {
  locations: { results: ILocation[]; info: Info };
}

interface ILocationsFilter {
  name?: string;
  type?: string;
  dimension?: string;
}

interface ILocationsVars {
  page: number;
  filter: ILocationsFilter;
}

interface RefetchObject {
  page?: number;
  filter?: ICharactersFilter | ILocationsFilter | IEpisodesFilter | undefined;
}

export {
  ICharacter,
  ICharacterAvatar,
  ICharacterData,
  ICharacterEpisodeData,
  ICharacterVars,
  ICharactersData,
  ICharactersVars,
  IEpisode,
  IEpisodeData,
  IEpisodeVars,
  IEpisodesData,
  IEpisodesVars,
  ILocation,
  ILocationData,
  ILocationVars,
  ILocationsData,
  ILocationsVars,
  RefetchObject,
};
