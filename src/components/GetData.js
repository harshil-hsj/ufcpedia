import './GetData.css';
import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import UpdateData from './UpdateData.js'
import Image from './Image.js'
import ShowData from './ShowData.js';
import './GetData.css';
function GetData() {
  const navigate = useNavigate();
  const [retData, setRetData] = useState({
    name:"",
    nickname:"",
    wins:0,
    losses:0,
    draws:0,
    height_cm:0,
    weight_in_kg:0,
    reach_in_cm: 0,
    stance:"",
    date_of_birth:"",
    UFC:""
});
  const [fighter,setFighterName ] = useState("fighter info");
  const [flag,setFlag] = useState(false);
  const handleData = function() {
    // Using .then() and .catch() instead of async/await
    axios.get('http://localhost:5000/getFighterInfo',{
      params:{fighter:fighter}
    })
      .then(function(response) {
        console.log(response);
        console.log(typeof(response.data))
        setRetData(response.data);
        setFlag(true);
      })
      .catch(function(error) {
        setRetData({
          name:"",
          nickname:"",
          wins:0,
          losses:0,
          draws:0,
          height_cm:0,
          weight_in_kg:0,
          reach_in_cm: 0,
          stance:0,
          date_of_birth:""})
        alert("data bhejne me dikkt")
        console.log(error);
      });
  }
  return (
    <div className='GetData'>
      
      <input type='text' onChange={(e)=>{setFighterName(e.target.value)}} placeholder='type fighters name'/>
      <button className = 'search' onClick={handleData}>Get Data</button>
      
      {/* <h2 >Name : {retData.name}</h2>
      <h3> {retData.nickname}</h3>
      <pre>Record : {retData.wins}/{retData.losses}/{retData.draws}     <button onClick={()=>navigate('/updatedata',{ state:{fighterName:retData.name}})}>Click to Update Record</button>  </pre>
      <p>Height(cms): {retData.height_cm}cms</p>
      <p>Weight(kgs): {retData.weight_in_kg}kgs</p>
      <p>Reach(cm): {retData.reach_in_cm}cms</p>
      <p>Stance: {retData.stance}</p>
      <p>Date of Birth:{retData.date_of_birth}</p> */}
      <div className = 'show'>
      <ShowData fighterDetails = {retData}/>
      <Image name = {retData.name}/>
      { flag && <button  className='updateRecord' onClick={()=>navigate('/updatedata',{state:{fighterName:retData.name}})}  >Update Athletes Data</button>}
      </div>
    </div>
  );
}
export default GetData;
