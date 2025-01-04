import React from 'react';
import PropTypes from 'prop-types';
import './registerPage.js';
import './registerPage.css';
import { Link } from 'react-router-dom';


const registerPage = () => {
   return (
      <div>
         <div className='title'><h1>Register your account</h1></div>
         <div className='credentials'>UserName: <input
            type="text"
            placeholder="Type something here"
         />
         </div>
         <div className='credentials'>Password: <input
            type="text"
            placeholder="Type something here"
         /></div>
         <div className='credentials'>Retype your password: <input
            type="text"
            placeholder="Type something here"
         /></div>
         <div style={{ textAlign: 'center' }}><button>Register and Login</button></div>
         <div style={{ textAlign: 'center' }}>Have an account? <Link to='/'>Login</Link></div>

      </div>
      
   );
}

registerPage.propTypes = {};

registerPage.defaultProps = {};

export default registerPage;
