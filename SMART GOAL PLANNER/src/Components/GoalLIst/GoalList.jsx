import { useEffect, useState } from 'react';
import GoalCard from '../GoalCard/GoalCard';
import './GoalList.css';

function GoalList() {
    const [goals, setGoals] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3001/goals')
            .then(response => response.json())
            .then(data => {
                setGoals(data);
            })
            .catch(error => console.error('Error fetching goals:', error));
    }, []);
    return (
        <div className="goal-list">
            <h2> My Goals</h2>
            {goals.length > 0 ? (
                goals.map(goal => <GoalCard key={goal.id} goal={goal} />)
            ) : (
                <p>No goals found.Add a new goal to get started!</p>
            )}
        </div>
    );
       
}
export default GoalList;