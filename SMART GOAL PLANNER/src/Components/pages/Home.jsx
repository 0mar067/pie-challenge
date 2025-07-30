import React, { useState, useEffect } from 'react';
import GoalList from '../GoalLIst/GoalList';
import DepositForm from '../DepositForm/DepositForm';
import { Link } from 'react-router-dom';

function Home({ goals, onDeleteGoal, onDeposit }) {
  return (
    <div className="app">
      <div className="header">
        <h1>Smart Goal Planner</h1>
        <Link to="/newgoal" className="newgoal-link">Add New Goal</Link>
      </div>
      <DepositForm goals={goals} onDeposit={onDeposit} />
      <GoalList goals={goals} onDelete={onDeleteGoal} />
    </div>
  );
}

export default Home;
