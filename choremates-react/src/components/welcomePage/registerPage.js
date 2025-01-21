import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registerPage.css';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [retypePassword, setRetypePassword] = useState('');
   const navigate = useNavigate();


   //Create new user
   const handleRegister = async () => {
      if (password !== retypePassword) {
         alert('Passwords do not match!');
         return;
      }

      try {
         const response = await fetch('http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
               username, 
               password }),
         });

         const user = await response.json();
         
         localStorage.setItem('userId', user.id);
         localStorage.setItem('householdId', user.household);

      
         navigate('/join');
      } catch (error) {
         alert('Error registering');
      }
   };

   
   return (
      <div>
         <div className='title'><h1>Register your account</h1></div>
         <div className='credentials'>
            UserName: 
            <input
               type="text"
               placeholder="Type something here"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
         </div>
         <div className='credentials'>
            Password: 
            <input
               type="password"
               placeholder="Type something here"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
         </div>
         <div className='credentials'>
            Retype your password: 
            <input
               type="password"
               placeholder="Type something here"
               value={retypePassword}
               onChange={(e) => setRetypePassword(e.target.value)}
            />
         </div>
         <div style={{ textAlign: 'center' }}>
            <button onClick={handleRegister}>Register and Login</button>
         </div>
         <div style={{ textAlign: 'center' }}>
            Have an account? <Link to='/'>Login</Link>
         </div>
      </div>
   );
};

RegisterPage.propTypes = {};

RegisterPage.defaultProps = {};

export default RegisterPage;
