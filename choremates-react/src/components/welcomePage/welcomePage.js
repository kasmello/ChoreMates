import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './welcomePage.css';
import { Link, useNavigate} from 'react-router-dom';

const WelcomePage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //Login existing user
    const handleLogin = async () => {
        try {
    
            const response = await fetch('http://127.0.0.1:8000/api/users/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                alert('Failed to fetch users');
            }

            const users = await response.json();
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
               navigate('/chores');
               localStorage.setItem('userId', user.id);
               localStorage.setItem('householdId', user.household);
               const householdResponse = await fetch(`http://127.0.0.1:8000/api/households/?id=${user.household}`);
               if (!householdResponse.ok) {
                  console.log('Failed to grab household details')
               }
               const household = await householdResponse.json()
               localStorage.setItem('householdName',household[0].name);
               localStorage.setItem('householdDescription',household[0].description)
               localStorage.setItem('householdCode',household[0].code)
            } else {
               alert('Invalid username or password');
            }
        } catch (error) {
            alert('Login error');
        }
    };

    return (
        <div>
            <div className="title">
                <h1>ChoreMates</h1>
            </div>
            <div className="credentials">
                Username: <input
                    type="text"
                    className="credTextBox"
                    placeholder="Type something here"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="credentials">
                Password: <input
                    type="password"
                    className="credTextBox"
                    placeholder="Type password here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div style={{ textAlign: 'center' }}>
                Remember Me <input type="checkbox" className="credTextBox" />
            </div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={handleLogin}>Login</button>
            </div>
            <div style={{ textAlign: 'center' }}>
                Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

WelcomePage.propTypes = {};

WelcomePage.defaultProps = {};

export default WelcomePage;
