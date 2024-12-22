import './GetData.css';
import React, { useState } from 'react';
import axios from 'axios';

function GetData() {
  const [retData, setRetData] = useState({
    name:"",
    nickname:"",
    wins:0,
    losses:0,
    draws:0,
    height_cm:0,
    weight_in_kg:0,
    reach_in_cm: 0,
    stance:0,
    date_of_birth:""
});
  const [fighter,setFighterName ] = useState("fighter info");

  const handleData = function() {
    // Using .then() and .catch() instead of async/await
    axios.get('http://localhost:5000/getFighterInfo',{
      params:{fighter:fighter}
    })
      .then(function(response) {
        console.log(response);
        console.log(typeof(response.data))
        setRetData(response.data);
      })
      .catch(function(error) {
        setRetData({name:"",
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
      <button onClick={handleData}>Get Data</button>
      
      <h2 >Name : {retData.name}</h2>
      <h3> {retData.nickname}</h3>
      <p>Record : {retData.wins}/{retData.losses}/{retData.draws}</p>
      <p>Height(cms): {retData.height_cm}cms</p>
      <p>Weight(kgs): {retData.weight_in_kg}kgs</p>
      <p>Reach(cm): {retData.reach_in_cm}cms</p>
      <p>Stance: {retData.stance}</p>
      <p>Date of Birth:{retData.date_of_birth}</p>

      
    </div>
  );
}

export default GetData;
