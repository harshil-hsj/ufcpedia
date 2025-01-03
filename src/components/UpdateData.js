import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './UpdateData.css';
function UpdateData(){
const [wins,setWins] = useState(0);
const [draws,setDraws] = useState(0);
const [losses,setLosses] = useState(0);
const [ufc,setUfc] = useState("");
const location = useLocation();
const fighterName = location.state.fighterName;
function updateRecord(){
    axios.post('http://localhost:5000/updateRecord',{ name:fighterName,wins:wins,losses:losses,draws:draws,UFC:ufc})
    .then(response=>{
        alert("data updated succesfully");
        console.log(response.data);
    } )
    .catch(error=>{
        alert("error");
        console.log(error)
    })
}
return(
 <div className="UpdateData">
  <h1> {fighterName}</h1>
  <input placeholder="enter wins(leave if unchanged)"   onChange={(e)=>setWins(e.target.value)} /> <br/>
  <input placeholder="enter draws(leave if unchanged)"  onChange={(e)=>setDraws(e.target.value)} /> <br/>
  <input placeholder="enter losses(leave if unchanged)" onChange={(e)=>setLosses(e.target.value)} /><br/>
  <input placeholder="currently a UFC athlete (Yes/No)"         onChange={(e)=>setUfc(e.target.value)}/> <br/>
  <button onClick={updateRecord}>Update Record</button>
 </div>
)

}
export default UpdateData;