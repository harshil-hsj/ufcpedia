
import React from "react";
import axios from "axios";
import {useState} from 'react';
import ShowData from './ShowData.js';
function AddNewFighter(){
    const [flag,setFlag] = useState(false)
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
        date_of_birth:""
    })
    const handleCheck= async function() {
        setFlag(!flag);
     try{   const response = await axios.get('http://localhost:5000/getFighterInfo',{
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
           <p>check if athlete already exists in the system</p>
           <input placeholder="enter athletes name" onChange={(e)=>{setName(e.target.value)}}/>
           <button onClick={handleCheck}>Check</button>
           {flag && <ShowData fighterDetails={fighterDetails}/> }
       </div>
    )
};
export default AddNewFighter