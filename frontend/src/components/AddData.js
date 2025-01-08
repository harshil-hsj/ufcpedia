
import './AddData.css'
import axios from 'axios';
import React, { use, useState } from 'react'
import GetData from './GetData';
import { baseUrl } from '../Url';
 ///////////// import { response } from 'express';    !!!!! polyfills
function AddData(){
const [additionalDetails,setAdditionalDetails] = useState(false);
const [date,setDate] = useState("");
const [location,setLocation] = useState("");
const [country,setCountry] = useState("");
const [event,setEvent] = useState("");
const [details,setDetails] = useState(false);
function handleForm(){
     setDetails(!details);
}
const [redFighter,setRedFighter] = useState("");
const [redFighterDetails , setRedFighterDetails] = useState({
    name:"",
    nickname:"",
    wins:0,
    losses:0,
    draws:0,
    height_cm:0,
    weight_in_kg:0,
    reach_in_cm: 0,
    stance:"",
    date_of_birth:""
})

function calculateAge(dateOfBirth) {
     const [day, month, year] = dateOfBirth.split('-').map(Number);
     const birthDate = new Date(year, month - 1, day); 
     const currentDate = new Date();
     let age = currentDate.getFullYear() - birthDate.getFullYear();
     const monthDifference = currentDate.getMonth() - birthDate.getMonth();
     if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
         age--;
     }
     return age;
 }
const [blueFighter,setBlueFighter] = useState("");
const [blueFighterDetails,setBlueFighterDetails] = useState({
    name:"",
    nickname:"",
    wins:0,
    losses:0,
    draws:0,
    height_cm:0,
    weight_in_kg:0,
    reach_in_cm: 0,
    stance:"",
    date_of_birth:""
})

const [fightDetails,setFightDetails] = useState({
    RedFighter:"",
    BlueFighter:"",
    RedOdds:0,
    BlueOdds:0,
    Date:'',
    Location:'',
    Country:'',
    Winner:'',
    TitleBout:'',
    WeightClass:'',
    Gender:'',
    BlueStance:'',
    BlueHeightCms:0,
    BlueReachCms:0,
    RedStance:'',
    RedHeightCms:0,
    RedReachCms:0,
    RedAge:0,
    BlueAge:0,
    Finish:'',
    FinishDetails:'',
    FinishRound:0,
    FinishRoundTime:'',
    UfcEvent:''
})

const handleAdditional = async function () {
     try {
         // Toggle the state only if data is successfully fetched
         setAdditionalDetails(!additionalDetails);
 
         // Fetch both fighters concurrently
         const [redResponse, blueResponse] = await Promise.all([
             axios.get(`${baseUrl}/getFighterInfo`, {
                 params: { fighter: redFighter }
             }),
             axios.get(`${baseUrl}/getFighterInfo`, {
                 params: { fighter: blueFighter }
             }),
         ]);
 
         // Update state with fetched data
         if (redResponse?.data) {
             console.log("Red Fighter Data:", redResponse.data); 
             setRedFighterDetails(redResponse.data);
         } else {
             alert("No data found for red fighter.");
             return; 
         }
 
         if (blueResponse?.data) {
             console.log("Blue Fighter Data:", blueResponse.data); 
             setBlueFighterDetails(blueResponse.data);
         } else {
             alert("No data found for blue fighter.");
             return;
         }
 
         // Calculate additional fight details
         setFightDetails(prevDetails => ({
             ...prevDetails,
             RedFighter: redResponse.data.name,
             BlueFighter: blueResponse.data.name,
             Date: date,
             Location: location,
             Country: country,
             BlueStance: blueResponse.data.stance,
             BlueHeightCms: blueResponse.data.height_cm,
             BlueReachCms: blueResponse.data.reach_in_cm,
             RedStance: redResponse.data.stance,
             RedHeightCms: redResponse.data.height_cm,
             RedReachCms: redResponse.data.reach_in_cm,
             RedAge: calculateAge(redResponse.data.date_of_birth),
             BlueAge: calculateAge(blueResponse.data.date_of_birth),
             UfcEvent: event,
         }));
     } catch (error) {
         console.error("Error fetching fighter data:", error);
         alert("Failed to fetch fighter details. Please try again later.");
     }
 };
 
function addToDatabase(){
     axios.post( `${baseUrl}/addFightInfo`,fightDetails)
     .then(response =>{
      console.log("data added succesfully",response.data);
      setFightDetails({
        RedFighter:"",
        BlueFighter:"",
        RedOdds:0,
        BlueOdds:0,
        Date:date,
        Location:location,
        Country:country,
        Winner:'',
        TitleBout:'',
        WeightClass:'',
        Gender:'',
        BlueStance:'',
        BlueHeightCms:0,
        BlueReachCms:0,
        RedStance:'',
        RedHeightCms:0,
        RedReachCms:0,
        RedAge:0,
        BlueAge:0,
        Finish:'',
        FinishDetails:'',
        FinishRound:0,
        FinishRoundTime:'',
        UfcEvent:event
    })
     })
     .catch(error =>{
      console.log("unable to update database",error);
     });
}
return (
 <div className='AddData'>
    <div className='getData'>
      <GetData/> 
      <GetData/>
    </div>
      
      <br/>
      <br/>
      <h1>Add Data for fight</h1>
      <input onChange={(e)=>setDate(e.target.value) } type='date' placeholder='enter date'></input>
      <br/>
      <input onChange={(e)=>setLocation(e.target.value) } type='text' placeholder='enter location'></input>
      <br/>
      <input onChange={(e)=>setCountry(e.target.value) } type='text' placeholder='enter country'></input>
      <br/>
      <input onChange={(e)=>setEvent(e.target.value) } type='text' placeholder='enter event'></input>
      <br/>

      <button onClick={handleForm}>{details?"Hide Form":"Add Fight Details"}</button>
      { details && (
          <div>
               <input onChange={(e)=>{setRedFighter(e.target.value)}} type='text' placeholder='enter red fighter' required/>
               <br/>
               <input onChange={(e)=>{setBlueFighter(e.target.value)}} type='text' placeholder='enter blue fighter' required/>
               <br/>
               <button onClick ={handleAdditional} >add fight details</button>
               { additionalDetails && (
                    <div>
                         <input onChange={(e)=>{fightDetails.RedOdds = e.target.value}} type='number' placeholder='Red Odds' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.BlueOdds = e.target.value}} type='number' placeholder='Blue Odds' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.Winner = e.target.value}} type='text' placeholder='Who won(Red/Blue)' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.TitleBout = e.target.value}} type='text' placeholder='TitleBout(true/false)' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.WeightClass = e.target.value}} type='text' placeholder="WeightClass(Ex.Bantamweight or Women's Strawweight" required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.Gender = e.target.value}} type='text' placeholder='Gender(MALE/FEMALE) caps' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.Finish = e.target.value}} type='text' placeholder='Finish(U-DEC/SUB/(KO/TKO))' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.FinishDetails = e.target.value}} type='text' placeholder='Ex.Rear Naked Chpke' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.FinishRound = e.target.value}} type='number' placeholder='Finish Round' required/>
                         <br/>
                         <input onChange={(e)=>{fightDetails.FinishRoundTime = e.target.value}} type='text' placeholder='Finish Round Time' required/>
                         <br/>
                         <button onClick={addToDatabase}> Add data To Database</button>
                         
                    </div>

               )}
          </div>
      )}
 </div>
)
}
export default AddData;