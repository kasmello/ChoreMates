import React from 'react';
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
         <div>Display Picture: <button>lol</button>
         </div>
         <div>Who can join: <div>
         <label>
          <input
            type="radio"
            value="A"
            // checked={selectedOption === "A"}
            // onChange={handleChange}
          />
          Anyone with the code
        </label>
        <label>
          <input
            type="radio"
            value="B"
            // checked={selectedOption === "B"}
            // onChange={handleChange}
          />
          Invite only
        </label>
         </div>
         </div>
         

         </div>
         <div className='join'>OR enter a household code to join</div>
         <input
            type="text"
            placeholder="Type something here"
         />
         <button>Join</button>
      </div>
      
   );
}

createJoinPage.propTypes = {};

createJoinPage.defaultProps = {};

export default createJoinPage;