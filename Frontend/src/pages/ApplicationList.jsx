import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function ApplicationList() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        api.get('/applications')
            .then(res => setApplications(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;

const handleDelete = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this application?');
        if (!confirmed) return;

        api.delete(`/applications/${id}`)
            .then(() => {
                setApplications(prev => prev.filter(app => app.id !== id));
            })
            .catch(err => setError(err.message));
    };

    return (
        <div>
            <h1>Job Applications</h1>
            <Link to="/new">+ Add Application</Link>
            {applications.length === 0 ? (
                <p>No applications yet.</p>

            ) : (
            <ul>
                    {applications.map(app => (
                        <li key={app.id}>
                            {app.company} - {app.jobTitle} ({app.status})
                            <Link to={`/edit/${app.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(app.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ApplicationList;