import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import ApplicationCard from '../components/ApplicationCard';
import UpcomingInterviews from '../components/UpcomingInterviews';

function ApplicationList() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [search, setSearch] = useState('');
    const [sortBy,setSortBy] = useState('dateApplied');
    const [sortOrder,setSortOrder] = useState('desc');


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    const statusCounts = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {});

    const sortedApplications = [...applications].sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'company') {
            comparison = a.company.localeCompare(b.company);
        } else if (sortBy === 'interviewDate') {
            const aDate = a.interviewDate ? new Date(a.interviewDate) : new Date(8640000000000000); // push nulls to the end
            const bDate = b.interviewDate ? new Date(b.interviewDate) : new Date(8640000000000000);
            comparison = aDate - bDate;
        } else {
            comparison = new Date(a.dateApplied) - new Date(b.dateApplied);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const visibleApplications = sortedApplications.filter(app =>
        app.company.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        console.log("MY TOKEN IS: ", localStorage.getItem('jwtToken'));
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
        <div className="page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Job Applications</h1>
                <button 
                    onClick={handleLogout} 
                    style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                >
                    Logout
                </button>
            </div>
            
            <Link className="add-link" to="/new">+ Add Application</Link>
            
            <div className="filter-bar">
                <label>Filter by status: </label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="">All</option>
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEWING">Interviewing</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by company.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                />

        <label></label>
        <select value ={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value ="dateApplied">Date Applied</option>
            <option value ="interviewDate">Interview Date</option>
            <option value ="company">Company Name</option>
        </select>


        <select value ={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Descending</option>
            <option value ="asc">Ascending</option>
        </select>
            </div>

            <p className="summary">
                Total: {applications.length} | 
                Applied: {statusCounts.APPLIED || 0} | 
                Interviewing: {statusCounts.INTERVIEWING || 0} | 
                Offer: {statusCounts.OFFER || 0} | 
                Rejected: {statusCounts.REJECTED || 0}
            </p>

             <UpcomingInterviews/>

            {visibleApplications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul className="card-list">
                    {visibleApplications.map(app => (
                        <ApplicationCard key={app.id} app={app} onDelete={handleDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ApplicationList;