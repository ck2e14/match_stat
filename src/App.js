import React, { useState } from "react";
import LeagueSelector from "./Components/LeagueSelector/LeagueSelector";
import API from "./Adapters/API/API";
import "./App.css";

function App() {
   const [currentCountryLeagues, setCurrentCountryLeagues] = useState();
   const [currentLeagueInfo, setCurrentLeagueInfo] = useState();
   const [currentLeagueStanding, setCurrentLeagueStandings] = useState();
   const [currentTeamInfo, setCurrentTeamInfo] = useState();
   const [currentTeamFixtures, setCurrentTeamFixtures] = useState();

   const getCountryLeagues = country => {
      setCurrentLeagueStandings();
      setCurrentLeagueInfo();
      return API.getLeaguesByCountry(country).then(data => setCurrentCountryLeagues(data.api.leagues));
   };

   const listFromCountryLeagues = countryLeagues => {
      const leaguesWithStandings = countryLeagues?.filter(league => {
         return league.standings > 0;
      });

      const leaguesWithoutStandings = countryLeagues?.filter(league => {
         return league.standings === 0;
      });

      const listOfLeagueComps = leaguesWithStandings?.map(leagueObj => {
         return (
            <div className='active-competitions'>
               <li
                  key={leagueObj.league_id}
                  onClick={() => individualLeagueClickHandler(leagueObj.league_id)}>
                  {leagueObj.name}
               </li>
            </div>
         );
      });

      const listOfCupComps = leaguesWithoutStandings?.map(leagueObj => {
         return (
            <div className='inactive-competitions'>
               <li
                  key={leagueObj.league_id}
                  onClick={() => individualLeagueClickHandler(leagueObj.league_id)}>
                  {leagueObj.name}
               </li>
            </div>
         );
      });

      return (
         <div className='competitions-container'>
            <div className='league-comps'>
               <h1>League Competitions</h1>
               {listOfLeagueComps} <br />
            </div>
            <div className='cup-comps'>
               {leaguesWithoutStandings?.length > 0 && (
                  <>
                     <h1>Cup Competitions</h1>
                     {listOfCupComps}{" "}
                  </>
               )}
            </div>
         </div>
      );
   };

   const teamInTableClickHandler = teamId => {
      API.getSpecificTeamInfo(teamId).then(data => setCurrentTeamInfo(data));
      API.getFixturesByTeam(teamId).then(data => setCurrentTeamFixtures(data));
   };

   const buildLeagueTableList = () => {
      if (!currentLeagueStanding) return;
      return currentLeagueStanding[0]?.map(teamObj => {
         return (
            <li key={teamObj.teamName} onClick={() => teamInTableClickHandler(teamObj.team_id)}>
               {teamObj.teamName} ~ {teamObj.points} pts.
            </li>
         );
      });
   };

   const individualLeagueClickHandler = leagueId => {
      setCurrentCountryLeagues();
      setLeagueStandings(leagueId);
      API.getLeagueInfo(leagueId).then(data => setCurrentLeagueInfo(data.api.leagues[0]));
   };

   const setLeagueStandings = leagueId => {
      return API.getLeagueStandings(leagueId).then(data => setCurrentLeagueStandings(data.api.standings));
   };

   return (
      <div className='app-container'>
         <div className='app-content'>
            <div className='app-league-selector-container'>
               <LeagueSelector getCountryLeagues={getCountryLeagues} />
            </div>

            <div className='app-main-content-panel'>
               {currentCountryLeagues && (
                  <div className='choose-country-league'>
                     <ul className='league-list'>{listFromCountryLeagues(currentCountryLeagues)}</ul>
                  </div>
               )}
               {currentLeagueInfo && (
                  <div className='league-table'>
                     <ol className=''>{buildLeagueTableList()}</ol>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default App;
