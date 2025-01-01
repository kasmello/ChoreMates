import React from 'react';
import PropTypes from 'prop-types';
import './welcomePage.js';
import './welcomePage.css';


const welcomePage = () => {
   return (
      <div>
         <div style={{ textAlign: 'center' }}><h1>ChoreMates</h1></div>
         <div className='credentials'>UserName: <input
            type="text"
            placeholder="Type something here"
         />
         </div>
         <div className='credentials'>Password: <input
            type="text"
            placeholder="Type something here"
         /></div>
         <div style={{ textAlign: 'center' }}>Remember Me <input
          type="checkbox"
         /></div>
         <div style={{ textAlign: 'center' }}><button>Login</button></div>
         <div style={{ textAlign: 'center' }}>Don't have an account? Register</div>
      </div>
      
   );
}

welcomePage.propTypes = {};

welcomePage.defaultProps = {};

export default welcomePage;
