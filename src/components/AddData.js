import './AddData.css'
import React, { useState } from 'react'
function AddData(){
const [fighterInfo,setFighterInfo] = useState([
   
]);

const [redFighter,setRedFighter] = useState("");

const [blueFighter,setBlueFighter] = useState("");



return (
 <div className='AddData'>
      <h1>Add Data for fight</h1>
      <br/>
      <input onChange={ (e)=>setRedFighter(e.target.value)}  type='text' placeholder='Enter Fighter in the red corner'/> 
      <br/>
      <br/>
      <input onChange={ (e)=>setBlueFighter(e.target.value)} type='text' placeholder='Enter Fighter in the blue corner'/>
      <br/>
      
      
      


 </div>
)
}
export default AddData;