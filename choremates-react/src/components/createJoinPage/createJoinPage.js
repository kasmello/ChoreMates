import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './createJoinPage.css';
import './createJoinPage.js'


const createJoinPage = () => {



   return (
      <div>
         <div className='title'><h1>Create a Household</h1></div>
         <div className='registerBox'>
         <div>Household Name*: <input
            type="text"
            placeholder="Type something here"
         />
         </div>
         <div>Description: <input
            type="text"
            placeholder="Type something here"
         /></div>
         <div><button>Upload Display Picture</button>
         </div>
         
         </div>
         <div className='join'>
            OR enter a household code to join
            <div>
               <input
                  type="text"
                  placeholder="Type something here"
               />
               <button>Join</button>
            </div>
         </div>
      </div>
      
   );
}

createJoinPage.propTypes = {};

createJoinPage.defaultProps = {};

export default createJoinPage;
