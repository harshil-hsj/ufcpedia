import React from 'react';
import './App.css';
import AddData from './components/AddData';
import GetData from './components/GetData';
import AddNewFighter from './components/AddNewFighter';
import UpdateData from './components/UpdateData';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState } from 'react';
import Papa from 'papaparse';
// import FightersPage from './components/FightersPage';
import axios from 'axios';
import { baseUrl } from './Url';
import { Suspense,lazy } from 'react';
const FightersPage = lazy(()=>import('./components/FightersPage'));
const password = process.env.REACT_APP_PASSWORD;
function HomeAdmin() {
  
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
  const navigate = useNavigate();

  // Functions for navigation
  function goToAddData() {
    navigate('/adddata');
  }
  function goToGetData() {
    navigate('/getdata');
  }
  function goToAddNewFighter(){
    navigate('/addnewfighter');
  }
  let arr =[];
  const handleCsv = async(e)=>{
    const file = e.target.files[0];
    Papa.parse(file,{
      step:(row)=>{
        console.log(row.data);
        if(row.data.BlueFighter!==undefined && row.data.BlueFighter.length>0)
         arr.unshift(row.data);
      },
      complete:()=>{
        console.log('parsed result')
        console.log(arr);
      },
      header:true,
    });
  };
  const addCsvFile = async()=>{
    if(arr.length === 0){
      alert("no data to add from csv file");
      return;
    }
    for(const row of arr){
      try{
        const redFighter = await axios.get(`${ baseUrl }/getFighterInfo`,{
          params:{fighter:row.RedFighter}
        });
        row.RedFighter = redFighter.data.name;
        row.RedStance = redFighter.data.stance;
        row.RedHeightCms = redFighter.data.height_cm;
        row.RedReachCms = redFighter.data.reach_in_cm;
        row.RedAge = calculateAge(redFighter.data.date_of_birth);
      }catch(error){
        console.log("failed while at redFighter",error);
        return;
      }
      try{
        const blueFighter = await axios.get(`${ baseUrl }/getFighterInfo`,{
          params:{fighter:row.BlueFighter}
        })
        row.blueFighter = blueFighter.data.name;
        row.BlueStance = blueFighter.data.stance;
        row.BlueHeightCms = blueFighter.data.height_cm;
        row.BlueReachCms = blueFighter.data.reach_in_cm;
        row.BlueAge = calculateAge(blueFighter.data.date_of_birth);
      }
      catch(error){
        console.log("error while catching blue figher",error);
        return;
      }


      row.BlueOdds = parseInt(row.BlueOdds);
      row.RedOdds =  parseInt(row.RedOdds);
      row.TitleBout = JSON.parse(row.TitleBout.toLowerCase());
      console.log(row);
      try{
         
         const res = await axios.post(`${baseUrl}/addFightInfo`,row);
         console.log("data added b/w"+row.RedFighter+" "+row.BlueFighter+res.data);
      }catch(error){
         console.log("failed at "+row.RedFighter+" "+row.BlueFighter);
      }
    }
    alert("data added successfully from csv file");
  }

  return (
    <div className="Admin">
    <div className="buttons">
      <button  onClick={goToAddData}>Add Data</button>
      <br/><br />
      <button onClick={goToGetData}>Get Data</button>
      <br /><br />
      <button onClick={goToAddNewFighter}>Add New Fighter</button>
      <br/>
      <input type='file' accept = '.csv' placeholder='import csv file' onChange={handleCsv}/>
      <button onClick={addCsvFile}>Add Fight Card</button>
    </div>
  </div>
  );
}
function HomeUser(){
  const navigate = useNavigate();
  return(
    <div className="User">
    <h2>CURRENT CHAMPIONS</h2>
    <div className="champions-container">
      <h3>Women's Strawweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Zhang Weili" />
      </Suspense>

      <h3>Women's Flyweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Valentina Shevchenko" />
      </Suspense>

      <h3>Women's Bantamweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Julianna Pena" />
      </Suspense>

      <h3>Flyweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Alexandre Pantoja" />
      </Suspense>

      <h3>Bantamweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Merab Dvalishvili" />
      </Suspense>

      <h3>Featherweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Ilia Topuria" />
      </Suspense>

      <h3>Lightweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Islam Makhachev" />
      </Suspense>

      <h3>Welterweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Belal Muhammad" />
      </Suspense>

      <h3>Middleweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Dricus Du Plessis" />
      </Suspense>

      <h3>Light Heavyweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Alex Pereira" />
      </Suspense>

      <h3>Heavyweight</h3>
      <Suspense fallback={<div>Loading Fighter...</div>}>
        <FightersPage fighter="Jon Jones" />
      </Suspense>
    </div>
  </div>
  )
}










function Home(){
  const navigate = useNavigate();
   const [adminPassword,setPassword] = useState("");
   const [admin,setAdmin] = useState(false);
   const [right,setRight] = useState(false);
   function goToAdmin(){
      navigate('/admin');
   }
   function goToUser(){
      navigate('/user');
   }
   function checkPassword(){
     if(adminPassword===password){
      setRight(true);
      goToAdmin();
     }
     else{
      setRight(false);
      alert("wrong password");
     }
   }
   return(
      <div className='Home'>
        <div className="fighters-container">
      <Suspense fallback={<div>Loading Fighters...</div>}>
      <FightersPage fighter="Dustin Poirier"/>
      <FightersPage fighter="Ilia Topuria"/>
      <FightersPage fighter="Conor McGregor"/>
      <FightersPage fighter="Jon Jones"/>
      <FightersPage fighter="Charles Oliveira"/>
      <FightersPage fighter="Tony Ferguson"/>
      <FightersPage fighter="Dan Hooker"/>
      <FightersPage fighter="Max Holloway"/>
      <FightersPage fighter="Donald Cerrone"/>
      <FightersPage fighter="Robert Whittaker"/>
      <FightersPage fighter="Israel Adesanya"/>
      <FightersPage fighter="Alex Pereira"/>
      </Suspense>
    </div>
      </div>
   )
}
function MainApp() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Home route renders the Home component */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<HomeAdmin/>}/>
        <Route path="/user"element={<HomeUser/>}/>
        <Route path="/athlete"element={<GetData/>}/>
        <Route path="/adddata" element={<AddData />} /> {/* AddData Component */}
        <Route path="/getdata" element={<GetData />} /> {/* GetData Component */}
        <Route path="/updatedata" element={<UpdateData/>} />
        <Route path="/addnewfighter" element={<AddNewFighter/>} />
      </Routes>
    </Router>
  );
}

export default MainApp;
