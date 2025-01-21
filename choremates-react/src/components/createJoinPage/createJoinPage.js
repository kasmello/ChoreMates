import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './createJoinPage.css';
import { Link, useNavigate} from 'react-router-dom';

const CreateJoinPage = () => {
    const [householdName, setHouseholdName] = useState('');
    const [description, setDescription] = useState('');
    const [joinCode, setJoinCode] = useState(''); 
    const navigate = useNavigate();

    //Create new household
    const handleCreateHousehold = async () => {
      try {
          const householdResponse = await fetch('http://127.0.0.1:8000/api/households/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name:householdName,
                  description:description
              }),
          });
  
          if (!householdResponse.ok) {
              throw new Error('Failed to create household');
          }
  
          const householdData = await householdResponse.json();
  
      
          localStorage.setItem('householdId', householdData.id);
  
        
          const userId = localStorage.getItem('userId');
          if (!userId) {
              alert('User ID not found. Please register again.');
              return;
          }
  
        
          const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  household: householdData.id,
              }),
          });
  
          if (!userResponse.ok) {
              throw new Error('Failed to update user with household');
          }
  
          navigate('/chores');
      } catch (error) {
          alert('Error occured');
      }
  };
  
  //Joins user to household
  const handleJoinHousehold = async () => {
    try {
    
        const householdResponse = await fetch(`http://127.0.0.1:8000/api/households/?code=${joinCode}`);

        if (!householdResponse.ok) {
            throw new Error('Failed to fetch household');
        }

        const householdData = await householdResponse.json();

        if (householdData.length === 0) {
            alert('No household found with the provided code');
            return;
        }

        const householdId = householdData[0].id; 

    
        localStorage.setItem('householdId', householdId);

    
        const userId = localStorage.getItem('userId');

        
        const userResponse = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                household: householdId,
            }),
        });

        if (!userResponse.ok) {
            alert('Failed to update user with household');
        }

        alert(`Successfully joined household`);
        navigate('/chores');
    } catch (error) {
        alert('Error joining household');
    }
};
  

    return (
        <div>
            <div className='title'><h1>Create a Household</h1></div>
            <div className='registerBox'>
                <div>
                    Household Name*: 
                    <input
                        type="text"
                        placeholder="Type something here"
                        value={householdName}
                        onChange={(e) => setHouseholdName(e.target.value)}
                    />
                </div>
                <div>
                    Description: 
                    <input
                        type="text"
                        placeholder="Type something here"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleCreateHousehold}>Create Household</button>
                </div>
            </div>
            <div className='join'>
                OR enter a household code to join
                <div>
                    <input
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                    />
                    <button onClick={handleJoinHousehold}>Join</button>
                </div>
            </div>
        </div>
    );
};

CreateJoinPage.propTypes = {};

CreateJoinPage.defaultProps = {};

export default CreateJoinPage;
