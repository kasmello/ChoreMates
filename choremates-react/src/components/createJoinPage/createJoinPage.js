import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './createJoinPage.css';

const CreateJoinPage = () => {
    const [householdName, setHouseholdName] = useState('');
    const [description, setDescription] = useState('');
    const [joinCode, setJoinCode] = useState(''); // State to store the code entered by the user

    const generateHouseholdCode = () => {
        // Generate a unique 6-digit code
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleCreateHousehold = async () => {
        const householdCode = generateHouseholdCode();

        try {
            // Create the household
            const householdResponse = await fetch('http://127.0.0.1:8000/api/households/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: householdName,
                    description: description,
                    code: householdCode,
                }),
            });

            if (!householdResponse.ok) {
                throw new Error('Failed to create household');
            }

            const householdData = await householdResponse.json();

            // Get the user ID from localStorage
            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert('User ID not found. Please register again.');
                return;
            }

            // Update the user with the household ID
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

            alert(`Household created successfully with code: ${householdCode}`);
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleJoinHousehold = async () => {
        try {
            // Fetch the household by code
            const householdResponse = await fetch(`http://127.0.0.1:8000/api/households/?search=${joinCode}`);

            if (!householdResponse.ok) {
                throw new Error('Failed to fetch household');
            }

            const householdData = await householdResponse.json();

            if (householdData.length === 0) {
                alert('No household found with the provided code');
                return;
            }

            const householdId = householdData[0].id; // Assuming the response is an array with one household

            // Get the user ID from localStorage
            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert('User ID not found. Please register again.');
                return;
            }

            // Update the user with the found household ID
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
                throw new Error('Failed to update user with household');
            }

            alert(`Successfully joined the household with code: ${joinCode}`);
        } catch (error) {
            console.error(error);
            alert('An error occurred while joining the household.');
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
