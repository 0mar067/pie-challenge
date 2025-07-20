import React, { useState, useEffect } from 'react';
import GoalList from '../GoalLIst/GoalList';
import DepositForm from '../DepositForm/DepositForm';

function Home() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error('Error fetching goals:', error));
  }, []);

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
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
      .then((response) => response.json())
      .then((data) => {
        setGoals(
          goals.map((goal) => (goal.id === goalId ? data : goal))
        );
      });
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Smart Goal Planner</h1>
      </div>
      <DepositForm goals={goals} onDeposit={handleDeposit} />
      <GoalList goals={goals} onDelete={handleDeleteGoal} />
    </div>
  );
}

export default Home;