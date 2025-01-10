import React from 'react';
import './App.css';
import AddData from './components/AddData';
import GetData from './components/GetData';
import AddNewFighter from './components/AddNewFighter';
import UpdateData from './components/UpdateData';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState } from 'react';
import FightersPage from './components/FightersPage';
const password = process.env.REACT_APP_PASSWORD;
function HomeAdmin() {
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
  return (
    <div className="App">
    <div className="fighters-container">
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
    </div>
  
    <div className="buttons">
      <button onClick={goToAddData}>Add Data</button>
      <br/><br />
      <button onClick={goToGetData}>Get Data</button>
      <br /><br />
      <button onClick={goToAddNewFighter}>Add New Fighter</button>
    </div>
  </div>
  );
}
function HomeUser(){
  const navigate = useNavigate();
  // function goToGetData(){
  //   navigate('/getdata');
  // }
  return(
  <div className="App">
    <div className="fighters-container">
    <FightersPage fighter="Zhang Weili"/>
      <FightersPage fighter="Valentina Shevchenko"/>
      <FightersPage fighter="Julianna Pena"/>
      <FightersPage fighter="Alexandre Pantoja"/>
      <FightersPage fighter="Merab Dvalishvili"/>
      <FightersPage fighter="Ilia Topuria"/>
      <FightersPage fighter="Islam Makhachev"/>
      <FightersPage fighter="Belal Muhammad"/>
      <FightersPage fighter="Dricus Du Plessis"/>
      <FightersPage fighter="Alex Pereira"/>
      <FightersPage fighter="John Jones"/>
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
    </div>
    <div className="buttons">
    <button onClick={() => setAdmin(true)}>ADMIN</button>
{admin && (
  <div>
    <input 
      type="password" 
      placeholder="Enter Admin Password" 
      onChange={(e) => setPassword(e.target.value)} 
    />
    <button onClick={checkPassword}>Enter</button>
  </div>
)}


      
      <br/><br />
      <button onClick={goToUser}>USER</button>
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
        <Route path="/adddata" element={<AddData />} /> {/* AddData Component */}
        <Route path="/getdata" element={<GetData />} /> {/* GetData Component */}
        <Route path="/updatedata" element={<UpdateData/>} />
        <Route path="/addnewfighter" element={<AddNewFighter/>} />
      </Routes>
    </Router>
  );
}

export default MainApp;
