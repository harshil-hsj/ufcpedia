import React from 'react'
import { useState,useEffect } from 'react';
import './FightersPage.css'
import axios from 'axios';
const FightersPage = (name) => {
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
    useEffect(() => {
        const fetchFighterData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/getFighterInfo', {
              params: { fighter: name }
            });
            setRetData(response.data);
          } catch (error) {
            console.log("Error fetching data", error);
          }
        };
        fetchFighterData();
      }, [name]);
  return (
    <div className='Page'>
        <div className='Info'>
             <h6>Name</h6>
        </div>
    </div>
  )
}

export default FightersPage
