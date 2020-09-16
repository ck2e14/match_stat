// TODO: PROTECT API KEY IN .env FILE
const API_BASE_URL = "https://api-football-v1.p.rapidapi.com/v2/";
const API_KEY = "3faccf5120msh98e9d7d982b227ap1e20c7jsnd0ff6ae260f9";

const getLeaguesByCountry = country => {
   return fetch(`${API_BASE_URL}leagues/country/${country}/2020`, {
      method: "GET",
      headers: {
         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
         "x-rapidapi-key": API_KEY,
      },
   }).then(resp => resp.json());
};

const getLeagueInfo = leagueId => {
   return fetch(`${API_BASE_URL}leagues/league/${leagueId}`, {
      method: "GET",
      headers: {
         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
         "x-rapidapi-key": API_KEY,
      },
   }).then(resp => resp.json())
};

const getLeagueStandings = leagueId => {
   return fetch(`${API_BASE_URL}leagueTable/${leagueId}`, {
      method: "GET",
      headers: {
         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
         "x-rapidapi-key": API_KEY,
      },
   }).then(resp => resp.json())
}

export default {
   getLeaguesByCountry,
   getLeagueInfo,
   getLeagueStandings
};
