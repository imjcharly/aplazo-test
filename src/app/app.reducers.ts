export interface Character {
  created: string; //	Time at which the character was created in the database
  episode: Array<string>; // (urls)	List of episodes in which this character appeared
  id: number; //	The id of the character
  gender: string; //	The gender of the character('Female', 'Male', 'Genderless' or 'unknown')
  image: string; // (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars
  location: {
    name: string,
    url: string
  }; //	Name and link to the character's last known location endpoint
  name: string; //	The name of the character
  origin: {
    name: string,
    url: string
  }; //	Name and link to the character's origin location
  status: string; //	The status of the character('Alive', 'Dead' or 'unknown')
  species: string; //	The species of the character
  type: string; //	The type or subspecies of the character
  url: string; // (url)	Link to the character's own URL endpoint
}

export interface Episode {
  id: number; //	The id of the episode.
  name: string; //	The name of the episode.
  air_date: string; //	The air date of the episode.
  episode: string; //	The code of the episode.
  characters: Array<string>; // (urls)	List of characters who have been seen in the episode.
  url: string; // (url)	Link to the episode's own endpoint.
  created: string; //	Time at which the episode was created in the database.
}

export interface Location {
  id: number; //	The id of the location.
  name: string; // The name of the location.
  type: string; // The type of the location.
  dimension: string; //	The dimension in which the location is located.
  residents: Array<string>; // (urls)	List of character who have been last seen in the location.
  url: string; //(url) Link to the location's own endpoint.
  created: string; // Time at which the location was created in the database.
}

export interface AppState {
  characters: Array<Character>;
  episodes: Array<Episode>;
  locations: Array<Location>;
  paginator: {
    firstPage: number,
    currentPage: number,
    maxPages: number,
  }
}


