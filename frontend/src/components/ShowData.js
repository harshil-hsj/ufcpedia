import React from "react";
import './ShowData.css';
function ShowData(fighterDetails){
    console.log(fighterDetails);
    fighterDetails = fighterDetails.fighterDetails;
    return (
        <div className="ShowData">
           
            <h2 >{fighterDetails.name}</h2>
      <h3> {fighterDetails.nickname}</h3>
      <p>Record : {fighterDetails.wins}-{fighterDetails.losses}-{fighterDetails.draws}</p>
      <p>Height : {fighterDetails.height_cm}cms</p>
      <p>Weight : {fighterDetails.weight_in_kg}kgs</p>
      <p>Reach : {fighterDetails.reach_in_cm}cms</p>
      <p>Stance : {fighterDetails.stance}</p>
      <p>Date of Birth :{fighterDetails.date_of_birth}</p>
      <p>Currently in the UFC :{fighterDetails.inUFC?"Yes":"No"}</p>
        </div>
    )
}
export default ShowData;