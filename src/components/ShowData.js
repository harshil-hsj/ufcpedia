import React from "react";
import './ShowData.css';
function ShowData(fighterDetails){
    console.log(fighterDetails);
    fighterDetails = fighterDetails.fighterDetails;
    return (
        <div className="ShowData">
            <p> Closest Match for athlete</p>
            <h2 >Name : {fighterDetails.name}</h2>
      <h3> {fighterDetails.nickname}</h3>
      <p>Record : {fighterDetails.wins}/{fighterDetails.losses}/{fighterDetails.draws}</p>
      <p>Height(cms): {fighterDetails.height_cm}cms</p>
      <p>Weight(kgs): {fighterDetails.weight_in_kg}kgs</p>
      <p>Reach(cm): {fighterDetails.reach_in_cm}cms</p>
      <p>Stance: {fighterDetails.stance}</p>
      <p>Date of Birth:{fighterDetails.date_of_birth}</p>
      <p>Currently in the UFC:{fighterDetails.UFC}</p>
        </div>
    )
}
export default ShowData;