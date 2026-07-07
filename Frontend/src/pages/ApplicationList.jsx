import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ApplicationCard from '../components/ApplicationCard';

function ApplicationList() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter , setStatusFilter] = useState('');

useEffect(() => {
        fetchApplications();
    }, [statusFilter]);

    const fetchApplications = () => {
        setLoading(true);
        const url = statusFilter ? `/applications?status=${statusFilter}` : '/applications';
        api.get(url)
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

            <div>
    <label>Filter by status: </label>
    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEWING">Interviewing</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
        <option value="WITHDRAWN">Withdrawn</option>
    </select>
</div>


            {applications.length === 0 ? (
                <p>No applications yet.</p>

            ) : (
            <ul>
                    {applications.map(app => (
                     <ApplicationCard key={app.id} app={app} onDelete={handleDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ApplicationList;