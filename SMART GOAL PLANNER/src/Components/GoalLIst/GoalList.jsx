import { useEffect, useState } from 'react';
import GoalCard from '../GoalCard/GoalCard';
import './GoalList.css';

function GoalList({ goals, onDelete }) {
  return (
    <div className="goal-list">
      <h2>My Goals</h2>
      {goals.length > 0 ? (
        goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onDelete={onDelete} />
        ))
      ) : (
        <p>No goals found. Add a new goal to get started!</p>
      )}
    </div>
  );
}
export default GoalList;