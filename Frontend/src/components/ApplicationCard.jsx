import {Link} from 'react-router-dom';

function ApplicationCard({app, onDelete}){
    return (

        <li>
            {app.company} - {app.jobTitle} ({app.status})
            <Link to={`/edit/${app.id}`}>Edit</Link>
            <button onClick={() => onDelete(app.id)}>Delete</button>
        </li>
    );
}
export default ApplicationCard;