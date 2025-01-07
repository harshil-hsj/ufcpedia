
import React from "react";
import axios from "axios";
import {useState} from 'react';
import ShowData from './ShowData.js';
import { baseUrl } from "../Url.js";
import AddNewDetails from "./AddNewDetails.js";
function AddNewFighter(){
    const [flag,setFlag] = useState(false);
    
    const [f,setF] = useState(false);
    const [name,setName] = useState("");
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
        UFC :""
    })
    const handleCheck= async function() {
        setFlag(!flag);
     try{   const response = await axios.get(`${baseUrl}/getFighterInfo`,{
      params:{fighter:name}
    })
    console.log("data received (new fighter added)",response.data);
    setFighterDetails({...response.data});
    }
    catch(error){
        console.log("data not received",error);
    }
    }

    return(
       <div className="AddNewFighter">
           <div className="checkFighter">
           <p>check if athlete already exists in the system</p>
           <input placeholder="enter athletes name" onChange={(e)=>{setName(e.target.value)}}/>
           <button onClick={handleCheck}>Check</button>
           {flag && <ShowData fighterDetails={fighterDetails}/>}
           </div>
           <br/>
           <div className="addFighter"> 
                <button onClick={()=>{setF(!f)}} >Add Data</button>
                { f && <AddNewDetails/>}
           </div>
       </div>
    )
};
export default AddNewFighter