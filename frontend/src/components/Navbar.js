import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const password = process.env.REACT_APP_PASSWORD;
 //paths
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/user', label: 'User' },
    { path: '/admin', label: 'Admin' },
    {path:'/athlete',label:'Fighter'}
  ];
  const handleAdminAccess = (e) => {
    e.preventDefault(); 
    const enteredPassword = prompt('Enter Admin Password: (Only admins can change data)');
    if (password === enteredPassword) {
      navigate('/admin'); 
    } else {
      alert('Incorrect password! Access denied');
    }
  };
  return (
    <div className={`Navbar ${location.pathname ==='/' ?'home' : location.pathname === '/user' ? 'user' : 'admin'}`}>
      <h1>UFCpedia</h1>
      <nav>
        {routes.map(route => (
          <Link
            key={route.path}
            to={route.path}
            className={location.pathname === route.path ? 'active' : ''}
            onClick={route.path === '/admin'?handleAdminAccess:null}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
