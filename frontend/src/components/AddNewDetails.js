import React from "react";
import {useState} from 'react';
import axios from "axios";
import { baseUrl } from "../Url";
function AddNewDetails(){
   const [fighterDetails,setFighterDetails] = useState({
        name:"",
        nickname:"",
        wins:0,
        losses:0,
        draws:0,
        height_cm:0,
        weight_in_kg:0,
        reach_in_cm:0,
        stance:"",
        date_of_birth:"",
        inUFC:false
   })
   const handleSubmit = async function(){
     try{
        console.log("first");
       const response = await axios.post(`${baseUrl}/addNewFighter`,fighterDetails);
       console.log("second");
       console.log(response);
     }
     catch(error){
       console.log(error);
       
     }
   }
   return(
     <div className="AddNewDetails">
           <input onChange={(e)=>fighterDetails.name = e.target.value} placeholder="Enter Name..." required  /><br/>
           <input onChange={(e)=>fighterDetails.nickname = e.target.value} placeholder="Enter NickName..." required /><br/>
           <input onChange={(e)=>fighterDetails.wins = e.target.value} placeholder="Enter Total Wins..." required /><br/>
           <input onChange={(e)=>fighterDetails.losses = e.target.value} placeholder="Enter Total Losses..." required /><br/>
           <input onChange={(e)=>fighterDetails.draws = e.target.value} placeholder="Enter Total Draws..." required /><br/>
           <input onChange={(e)=>fighterDetails.height_cm = e.target.value} placeholder="Enter Height in cm..." required /><br/>
           <input onChange={(e)=>fighterDetails.weight_in_kg = e.target.value} required  placeholder="Enter Total Weight in kgs..."/><br/>
           <input onChange={(e)=>fighterDetails.reach_in_cm = e.target.value} required  placeholder="Enter Reach in cms..."/><br/>
           <input onChange={(e)=>fighterDetails.stance = e.target.value}  required placeholder="Enter Stance..."/><br/>
           <input onChange={(e)=>fighterDetails.date_of_birth = e.target.value}  required placeholder="Enter D.O.B (dd-mm-yyyy)..."/><br/>
           <input onChange={(e)=>fighterDetails.inUFC = e.target.value}  required placeholder="Currently in the UFC?"/><br/>
           <button onClick={handleSubmit}>Add Details</button>
     </div>
   )
}
export default AddNewDetails;