import React, { useState } from "react";
import "./LeagueSelector-style.css";
import API from "../../Adapters/API/API";

const LeagueSelector = props => {
   const { getCountryLeagues } = props;

   const handleCountryClick = country => {
      getCountryLeagues(country);
   };

   return (
      <div className='league-selector-container'>
         <div className='league-item-container' onClick={() => handleCountryClick("england")}>
            &nbsp;ENGLISH &nbsp;
         </div>{" "}
         <div className='league-item-container' onClick={() => handleCountryClick("france")}>
            &nbsp;FRENCH &nbsp;
         </div>
         <div className='league-item-container' onClick={() => handleCountryClick("spain")}>
            &nbsp;SPANISH &nbsp;
         </div>
         <div className='league-item-container' onClick={() => handleCountryClick("italy")}>
            &nbsp;ITALIAN &nbsp;
         </div>
         <div className='league-item-container' onClick={() => handleCountryClick("germany")}>
            &nbsp;GERMAN &nbsp;
         </div>
         <div className='league-item-container' onClick={() => handleCountryClick("netherlands")}>
            &nbsp;DUTCH &nbsp;
         </div>
      </div>
   );
};

export default LeagueSelector;
