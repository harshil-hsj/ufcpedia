import React from 'react'
import { useState,useEffect } from 'react';
import './FightersPage.css'
import axios from 'axios';
import { baseUrl } from '../Url';
import { useLocation, useNavigate } from 'react-router-dom';
const FightersPage = ({fighter , division}) => {
    const [link,setLink]=useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
      const handleName = async ()=>{
         try{
           const res = await axios.get(`${baseUrl}/getLink`,
             {params:{fighter},}
           );
           
           console.log("zero");
           setLink(res.data.link);
           console.log("received res",res.data);
         }
         catch(error){
           console.log("error ",error);
         }
      };
      if(fighter ){
       handleName();
      }},[fighter]);
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
            const response = await axios.get(`${baseUrl}/getFighterInfo`, {
              params: { fighter }
            });
            setRetData(response.data);
          } catch (error) {
            console.log("Error fetching data", error);
          }
        };
        fetchFighterData();
      }, [fighter]);
    const handleClick = ()=>{
        console.log(location);
        if( location.pathname ==='/user'){
        navigate('/rankings' , {state:{division}});
        }
      
    }
  return (

    <div className='Page' onClick={handleClick} style={{ backgroundImage: `url(${link})` }}>
      <div className='Info'>
      <h2 >{retData.name}</h2>
      <h3> {retData.nickname}</h3>
      <p>Record : {retData.wins}-{retData.losses}-{retData.draws}</p>
      </div>
    </div>
  )
}

export default FightersPage
