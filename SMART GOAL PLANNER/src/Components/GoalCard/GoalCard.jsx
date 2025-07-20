import { Link } from 'react-router-dom';

function GoalCard({ goal }) {
    const { id, name, targetAmount, savedAmount, deadline } = goal;
    return (
        <div className="goal-card">
            <h3>{name}</h3>
            <p>Target Amount: ${targetAmount}</p>
            <p>Saved Amount: ${savedAmount}</p>
            <p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
            <Link to={`/edit/${id}`} className="edit-link">Edit</Link>
            <Link to={`/delete/${id}`} className="delete-link">Delete</Link>
        </div>
    );
}

export default GoalCard;