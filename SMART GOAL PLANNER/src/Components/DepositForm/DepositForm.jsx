import React, { useState, useEffect } from 'react';
import './DepositForm.css';

function DepositForm({ goals, onDeposit }) {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGoal && amount) {
      onDeposit(selectedGoal, parseFloat(amount));
      setAmount('');
    }
  };

  return (
    <form className="deposit-form" onSubmit={handleSubmit}>
      <h2>Add Deposit</h2>
      <select
        value={selectedGoal}
        onChange={(e) => setSelectedGoal(e.target.value)}
        required
      >
        <option value="">Select Goal</option>
        {goals.map((goal) => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Amount ($)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Deposit</button>
    </form>
  );
}

export default DepositForm;