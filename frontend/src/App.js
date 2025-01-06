import React from 'react';
import './App.css';
import AddData from './components/AddData';
import GetData from './components/GetData';
import AddNewFighter from './components/AddNewFighter';
import UpdateData from './components/UpdateData';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FightersPage from './components/FightersPage';


function Home() {
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
      <br /><br />
      <button onClick={goToGetData}>Get Data</button>
      <br /><br />
      <button onClick={goToAddNewFighter}>Add New Fighter</button>
    </div>
  </div>
  );
}
function MainApp() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Home route renders the Home component */}
        <Route path="/" element={<Home />} />
        <Route path="/adddata" element={<AddData />} /> {/* AddData Component */}
        <Route path="/getdata" element={<GetData />} /> {/* GetData Component */}
        <Route path="/updatedata" element={<UpdateData/>} />
        <Route path="/addnewfighter" element={<AddNewFighter/>} />
      </Routes>
    </Router>
  );
}

export default MainApp;
