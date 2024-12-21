import './GetData.css';
import React, { useState } from 'react';
import axios from 'axios';

function GetData() {
  const [retData, setRetData] = useState("yaha par aega");

  const handleData = function() {
    // Using .then() and .catch() instead of async/await
    axios.get('http://localhost:5000/get-data')
      .then(function(response) {
        console.log(response);
        setRetData(JSON.stringify(response.data.RedFighter));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div className='GetData'>
      <button onClick={handleData}>Get Data</button>
      <p>{retData}</p>
    </div>
  );
}

export default GetData;
