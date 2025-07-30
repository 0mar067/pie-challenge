import React, { useState } from 'react';
import './Newgoal.css';

function Newgoal({ onAddGoal }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && targetAmount) {
      onAddGoal({
        name,
        targetAmount: parseFloat(targetAmount),
        savedAmount: 0,
      });
      setName('');
      setTargetAmount('');
    }
  };

  return (
    <div className="newgoal-container">
      <h2>Add New Goal</h2>
      <form className="newgoal-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Goal Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="targetAmount">Target Amount ($):</label>
        <input
          type="number"
          id="targetAmount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default Newgoal;
