import { Link } from 'react-router-dom';

function ApplicationCard({ app, onDelete }) {
    return (
        <li className="card">
            <div className="card-info">
                <span className="card-title">{app.company} — {app.jobTitle}</span>
                <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
            </div>
            <div className="card-actions">
                <Link to={`/edit/${app.id}`}>Edit</Link>
                <button onClick={() => onDelete(app.id)}>Delete</button>
            </div>
        </li>
    );
}

export default ApplicationCard;