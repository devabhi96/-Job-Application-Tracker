import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axiosConfig';

function ApplicationForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    company: '',
    jobTitle: '',
    status: 'APPLIED',
    dateApplied: '',
    jobUrl: '',
    notes: '',
  });

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    if (isEditMode) {
      // FIX 1: Changed single quotes to backticks for string interpolation
      api.get(`/applications/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

  
    const request = isEditMode
      ? api.put(`/applications/${id}`, formData)
      : api.post('/applications', formData);

    request.then(() => navigate('/'))
      .catch(err => setError(err.message))
      .finally(() => setSubmitting(false));

  };

  if (loading) return <p>Loading ...</p>;

  return (
    <div className="page">
      <div className ="form-page">
      <h1>{isEditMode ? 'Edit Application' : 'Add Application'}</h1>
      {error && <p className ="error-text">Error: {error}</p>}
        

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
    </div>
  );
}

export default ApplicationForm;