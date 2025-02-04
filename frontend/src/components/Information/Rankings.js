import React from 'react';
import list from './divisions.json';
import { useLocation } from 'react-router-dom';
const Rankings = () => {
  const location = useLocation();
  const {division} = location.state || {};
  console.log(division);
  if(!division){
    return <div> wrong division entry</div>
  }
  let rankings = list.Weighclass[division];
  
  if (!rankings) {
    return <div>No rankings for {division}</div>;
  }

  return (
    <div>
      <h2>{division}</h2>
      <ul>
        {rankings.map((fighter) => (
          <li key={fighter.rank}>
            Rank {fighter.rank}: {fighter.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rankings;
