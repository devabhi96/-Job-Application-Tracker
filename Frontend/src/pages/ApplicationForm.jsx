import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function ApplicationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    status: 'APPLIED',
    dateApplied: '',
    jobUrl: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    api.post('/applications', formData)
      .then(() => navigate('/'))
      .catch(err => setError(err.message))
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <h1>Add Application</h1>
      {error && <p>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company</label>
          <input name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div>
          <label>Job Title</label>
          <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
        </div>
        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEWING">Interviewing</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>
        <div>
          <label>Date Applied</label>
          <input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} required />
        </div>
        <div>
          <label>Job URL</label>
          <input name="jobUrl" value={formData.jobUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;