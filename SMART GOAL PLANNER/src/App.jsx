
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import Home from './Components/pages/Home';
import EditGoal from './Components/pages/EditGoal';
import Newgoal from './Components/pages/Newgoal';


function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error('Error fetching goals:', error));
  }, []);

  const handleAddGoal = (newGoal) => {
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add goal');
        }
        return response.json();
      })
      .then((data) => {
        setGoals([...goals, data]);
      })
      .catch((error) => console.error('Error adding goal:', error));
  };

  const handleDeleteGoal = (id) => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete goal');
        }
        setGoals(goals.filter((goal) => goal.id !== id));
      })
      .catch((error) => console.error('Error deleting goal:', error));
  };

  const handleDeposit = (goalId, amount) => {
    const goalToUpdate = goals.find((goal) => goal.id === goalId);
    const updatedGoal = {
      ...goalToUpdate,
      savedAmount: goalToUpdate.savedAmount + amount,
    };

    fetch(`http://localhost:3001/goals/${goalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGoal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update goal');
        }
        return response.json();
      })
      .then((data) => {
        setGoals(
          goals.map((goal) => (goal.id === goalId ? data : goal))
        );
      })
      .catch((error) => console.error('Error updating goal:', error));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              goals={goals}
              onDeleteGoal={handleDeleteGoal}
              onDeposit={handleDeposit}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              goals={goals}
              onDeleteGoal={handleDeleteGoal}
              onDeposit={handleDeposit}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={<EditGoal />}
        />
        <Route
          path="/newgoal"
          element={<Newgoal onAddGoal={handleAddGoal} />}
        />
      </Routes>
    </Router>
  );
}

export default App
