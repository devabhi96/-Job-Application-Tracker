import { Link, useNavigate } from 'react-router-dom';

function ApplicationCard({ app, onDelete }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/view/${app.id}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); 
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation(); 
        onDelete(app.id);
    };

    return (
        <li className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="card-info">
                <span className="card-title">{app.company} — {app.jobTitle}</span>
                <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
            </div>
            <div className="card-actions">
                <Link to={`/edit/${app.id}`} onClick={handleEditClick}>Edit</Link>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </li>
    );
}

export default ApplicationCard;