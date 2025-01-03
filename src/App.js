import React from 'react';
import './App.css';
import AddData from './components/AddData';
import GetData from './components/GetData';
import AddNewFighter from './components/AddNewFighter';
import UpdateData from './components/UpdateData';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


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
      <div className="buttons">
      <button onClick={goToAddData}>Add Data</button>
      <br/><br/>
      <button onClick={goToGetData}>Get Data</button>
      <br/><br/>      
      <button onClick={goToAddNewFighter}>Add New Fighter</button>
      </div>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
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
