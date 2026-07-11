import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../css/ViewApplication.css';

function ViewApplication() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/applications/${id}`)
            .then(res => setApp(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!app) return <p>Application not found.</p>;

    return (
        <div className="page">
            <Link to="/">&larr; Back to list</Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <h1>{app.company} — {app.jobTitle}</h1>
                <span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span>
            </div>

            <div className="view-details">
                <div className="view-field">
                    <span className="view-label">Company</span>
                    <span className="view-value">{app.company}</span>
                </div>

                <div className="view-field">
                    <span className="view-label">Job Title</span>
                    <span className="view-value">{app.jobTitle}</span>
                </div>

                <div className="view-field">
                    <span className="view-label">Status</span>
                    <span className="view-value">{app.status}</span>
                </div>

                <div className="view-field">
                    <span className="view-label">Date Applied</span>
                    <span className="view-value">{app.dateApplied || '—'}</span>
                </div>

                <div className="view-field">
                    <span className="view-label">Job URL</span>
                    <span className="view-value">
                        {app.jobUrl
                            ? <a href={app.jobUrl} target="_blank" rel="noopener noreferrer">{app.jobUrl}</a>
                            : '—'}
                    </span>
                </div>

                <div className="view-field">
                    <span className="view-label">Notes</span>
                    <p className="view-value view-notes">{app.notes || 'No notes added.'}</p>
                </div>
            </div>

            <button
                onClick={() => navigate(`/edit/${app.id}`)}
                style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}
            >
                Edit this application
            </button>
        </div>
    );
}

export default ViewApplication;