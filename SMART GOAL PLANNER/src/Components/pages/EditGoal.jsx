import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GoalForm from '../GoalForm/GoalForm';

function EditGoal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/goals/${id}`);
        if (!response.ok) {
          throw new Error('Goal not found');
        }
        const data = await response.json();
        setGoal(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [id]);

  const handleUpdateGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`http://localhost:3001/goals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });

      if (!response.ok) {
        throw new Error('Failed to update goal');
      }

      navigate('/'); // Redirect to home page after successful update
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Edit Goal</h2>
      <GoalForm
        onSubmit={handleUpdateGoal}
        initialData={goal}
        buttonText="Update Goal"
      />
    </div>
  );
}

export default EditGoal;