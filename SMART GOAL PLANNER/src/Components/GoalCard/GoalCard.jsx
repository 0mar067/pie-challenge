import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GoalCard({ goal, onDelete }) {
  const { id, name, category, targetAmount, savedAmount, deadline } = goal;
  const [confirmDelete, setConfirmDelete] = useState(false);

  const remainingAmount = targetAmount - savedAmount;
  const progress = (savedAmount / targetAmount) * 100;
  const isOverdue = new Date(deadline) < new Date();

  const handleDelete = () => {
    fetch(`http://localhost:3001/goals/${id}`, {
      method: 'DELETE',
    }).then(() => {
      onDelete(id);
    });
  };

  return (
    <div className="goal-card">
      {isOverdue && <div className="overdue-badge">Overdue</div>}
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Target: ${targetAmount.toLocaleString()}</p>
      <p>Saved: ${savedAmount.toLocaleString()}</p>
      <p>Remaining: ${remainingAmount.toLocaleString()}</p>
      <p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress.toFixed(1)}% complete</p>
      <div className="actions">
        <button className="quick-deposit-btn">Quick Deposit $100</button>
        <div>
          {confirmDelete ? (
            <div className="confirm-delete">
              <button className="delete-btn" onClick={handleDelete}>Confirm Delete</button>
              <button onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          ) : (
            <button className="delete-btn" onClick={() => setConfirmDelete(true)}>Delete</button>
          )}
          <Link to={`/edit/${id}`} className="edit-link">Edit</Link>
        </div>
      </div>
    </div>
  );
}

export default GoalCard;