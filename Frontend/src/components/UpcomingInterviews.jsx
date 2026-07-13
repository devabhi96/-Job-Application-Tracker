import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function UpcomingInterviews(){
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/applications/upcoming')
        .then(res=> setUpcoming(res.data))
        .catch(() => setUpcoming([]))
        .finally(() => setLoading(false));
    },[]);

    if(loading || upcoming.length === 0 ) return null;

    return (
         <div className="upcoming-banner">
            <h2>Upcoming Interviews</h2>
            <ul>
                {upcoming.map(app => (
                    <li key={app.id}>
                        <strong>{app.company}</strong> — {app.jobTitle} on {app.interviewDate}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default UpcomingInterviews;