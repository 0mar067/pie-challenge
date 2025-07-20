import React, { useState, useEffect } from 'react';
import './GoalForm.css';

function GoalForm({ onSubmit, initialData = {}, buttonText = "Add Goal" }) {
  const [name, setGoal] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [savedAmount, setSavedAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) { 
      setGoal(initialData.name || ''); 
      setTargetAmount(initialData.targetAmount || '');
      setSavedAmount(initialData.savedAmount || '');
      setDeadline(initialData.deadline || '');
      setCategory(initialData.category || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && targetAmount && savedAmount && deadline && category) {
      onSubmit({ name, targetAmount, savedAmount, deadline, category });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        placeholder="Goal"
        value={name}
        onChange={(e) => setGoal(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Saved Amount"
        value={savedAmount}
        onChange={(e) => setSavedAmount(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="Health">Health</option>
        <option value="Finance">Finance</option>
        <option value="Career">Career</option>
        <option value="Personal Development">Personal Development</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default GoalForm;