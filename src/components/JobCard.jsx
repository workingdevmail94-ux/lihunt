export default function JobCard(props) {
    function getFormattedDate() {
        const publicationDate = props.job.publication_date;
            if (!publicationDate) {return "no info"}
            const date = new Date(publicationDate);
            return date.toLocaleDateString("ru-RU");
    }
    return <li className='jobs-list__card'>
            <img src={props.job.company_logo || "assets/img/default/empty-job.webp"} alt={props.job.company_name || "Default job image"}/>
            <h3>Job title: {props.job.title || "no info"}</h3>
            <p>Company name: {props.job.company_name || "no info"}</p>
            <p>Candidate required location: {props.job.candidate_required_location || "no info"}</p>
            <p>Job type: {props.job.job_type || "no info"}</p>
            <p>Salary: {props.job.salary || "no info"}</p>
            <p>Job tags: {Array.isArray(props.job.tags) && props.job.tags.length > 0 ? props.job.tags.join(", ") : "no info"}</p>
            <p>Publication date: {getFormattedDate()}</p>
            <p>{props.job.url ? <a target="_blank" rel="noopener noreferrer" href={props.job.url}>Read more</a> : "No link"}</p>
            <button className={"save-btn" + (props.isSaved? " active" : "")} onClick={() => props.onToggleSave(props.job.id)}>{props.isSaved ? "Удалить из сохраненных" : "Сохранить"}</button> 
            </li>
}