import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import './viewChores.css';
import './viewChores.js'


const ViewChores = () => {
   const [chores, setChores] = useState([]);
   const [choreName, setChoreName] = useState('');
   const [choreDescription, setChoreDescription] = useState('');
   const [loading, setLoading] = useState(true);
   const userId = localStorage.getItem('userId');
   const householdId = localStorage.getItem('householdId');
 
   //Fetch chores for the household to render onto page upon loading
   useEffect(() => {
     const fetchChores = async () => {
       try {
         const response = await fetch(
           `http://127.0.0.1:8000/api/chores/?household=${householdId}`
         );
         if (!response.ok) throw new Error('Failed to fetch chores');
         const data = await response.json();
         setChores(data);
       } catch (error) {
         console.error('Error fetching chores:', error);
       } finally {
         setLoading(false);
       }
     };
 
     if (householdId) {
       fetchChores();
     } else {
       console.error('Household ID not found in local storage.');
       setLoading(false);
     }
   }, [householdId]);
 
   
 
   //Add a new chore
   const createChore = async () => {
     try {
       const response = await fetch('http://127.0.0.1:8000/api/chores/', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          choreName,
          description: choreDescription, 
          household: householdId,
        }),
      });
 
       if (!response.ok) throw new Error('Failed to create chore');
       const data = await response.json();
       setChores([...chores, data]);
       setChoreName(''); 
       setChoreDescription('');
     } catch (error) {
       console.error('Error creating chore:', error);
     }
   };
 
   //Mark chore as done
   const markChoreAsDone = async (choreId) => {
     try {
       const response = await fetch(
         `http://127.0.0.1:8000/api/chores/${choreId}/`,
         {
           method: 'PATCH',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             completedBy: userId,
             completedStatus: 1,
           }),
         }
       );
 
       if (!response.ok) throw new Error('Failed to mark chore as done');
       setChores(
         chores.map((chore) =>
           chore.id === choreId
             ? { ...chore, completedBy: userId, completedStatus: 1 }
             : chore
         )
       );
     } catch (error) {
       console.error('Error marking chore as done:', error);
     }
   };
 

   
   return (
     <div>
       <h1>{localStorage.getItem('householdName')}'s Chores</h1>
       {loading ? (
         <p>Loading chores...</p>
       ) : (
         <>
           <p>Join Code: {localStorage.getItem('householdCode')}</p>
           <div className="choreBox">
             <table>
               <thead>
                 <tr>
                   <th>Chore</th>
                   <th>Description</th>
                   <th>Status</th>
                   <th>Action</th>
                 </tr>
               </thead>
               <tbody>
                 {chores.map((chore) => (
                   <tr key={chore.id}>
                     <td>{chore.choreName}</td>
                     <td>{chore.description}</td>
                     <td>{chore.completedStatus ? 'Done' : 'Pending'}</td>
                     <td>
                       {!chore.completedStatus && (
                         <button onClick={() => markChoreAsDone(chore.id)}>
                           Mark as Done
                         </button>
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
 
           <div className="addChoreForm">
             <h2>Create a New Chore</h2>
             <form
               onSubmit={(e) => {
                 e.preventDefault();
                 createChore();
               }}
             >
               <input
                 type="text"
                 name="choreName"
                 placeholder="Chore Name"
                 value={choreName}
                 onChange={(e) => setChoreName(e.target.value)}
                 required
               />
               <input
                 type="text"
                 name="description"
                 placeholder="Description"
                 value={choreDescription}
                 onChange={(e) => setChoreDescription(e.target.value)}
               />
               <button type="submit">Add Chore</button>
             </form>
           </div>
         </>
       )}
     </div>
   );
 };
 
 export default ViewChores;