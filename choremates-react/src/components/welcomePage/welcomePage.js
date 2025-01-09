import React from 'react';
import PropTypes from 'prop-types';
import './welcomePage.js';
import './welcomePage.css';
import { Link } from 'react-router-dom';


const welcomePage = () => {

   return (
      <div>
         <div className='title'><h1>ChoreMates</h1></div>
         <div className='credentials'>Username: <input
            type="text"
            className='credTextBox'
            placeholder="Type something here"
         />
         </div>
         <div className='credentials'>Password: <input
            type="text"
            className='credTextBox'
            placeholder="Type something here"
         /></div>
         <div style={{ textAlign: 'center' }}>Remember Me <input
          type="checkbox"
          className='credTextBox'
         /></div>
         <div style={{ textAlign: 'center' }}><button>Login</button></div>
         <div style={{ textAlign: 'center' }}>Don't have an account? <Link to="/register">Register</Link></div>
      </div>
      
   );
}

welcomePage.propTypes = {};

welcomePage.defaultProps = {};

export default welcomePage;
