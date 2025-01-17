import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './viewChores.css';
import './viewChores.js'


const viewChores = () => {

   const testChores = [{
      id: 1,
      choreName: "Test",
      timeReset: 2,
      description: "This is a test",
      household_id: 4,
      completedby_id: 3

   }]

   return (
      <div>
         <div className='title'><h1>All Chores in 'Household'</h1></div>
         <div className='choreBox'>
         <table>
         <tr>
            <th>Chore</th>
            <th>Contact</th>
            <th>Country</th>
         </tr>
         <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
         </tr>
         <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
         </tr>
         </table>
         </div>
      </div>
      
   );
}

viewChores.propTypes = {};

viewChores.defaultProps = {};

export default viewChores;
