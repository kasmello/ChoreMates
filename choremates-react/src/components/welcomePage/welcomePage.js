import React from 'react';
import PropTypes from 'prop-types';
import './welcomePage.js';
import './welcomePage.css';


const welcomePage = () => {
   return (
      <div>
         <div>ChoreMates</div>
         <div>UserName: <input
            type="text"
            placeholder="Type something here"
         />
         </div>
         <div>Password: <input
            type="text"
            placeholder="Type something here"
         /></div>
         <div>Remember Me <input
          type="checkbox"
         /></div>
         <div><button>Login</button></div>
         <div>Don't have an account? Register</div>
      </div>
      
   );
}

welcomePage.propTypes = {};

welcomePage.defaultProps = {};

export default welcomePage;
