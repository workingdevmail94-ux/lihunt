import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  CalendarDays
} from "lucide-react";

export default function JobCard(props) {
    function getFormattedDate() {
        const publicationDate = props.job.publication_date;
            if (!publicationDate) {return "no info"}
            const date = new Date(publicationDate);
            return date.toLocaleDateString("ru-RU");
    }
    return <li className="job-card">
                     <button
                    className={"job-card__save-btn" + (props.isSaved ? " job-card__save-btn--active" : "")}
                    onClick={() => props.onToggleSave(props.job.id)}
                    >
                    {props.isSaved ? <BookmarkCheck className="job-card__icon"/> : <Bookmark className="job-card__icon"/>}
                    
                    </button>


                    <a target="_blank" rel="noopener noreferrer" href={props.job.url} className="job-card__link" >{props.job.title || "no info"}</a>

                    <ul className="job-card__info-list">
                    <li className="job-card__info-item"><BriefcaseBusiness className="job-card__icon"/>{props.job.job_type || "no info"}</li>
                    <li className="job-card__info-item"><MapPin className="job-card__icon"/>{props.job.candidate_required_location || "no info"}</li>
                    <li className="job-card__info-item job-card__info-item--salary"><DollarSign className="job-card__icon"/>{props.job.salary || "no info"}</li>
                    </ul>

                

                <div className="job-card__bottom">
                    <div className="job-card__company">
                    <img
                        className="job-card__company-logo"
                        src={props.job.company_logo || "assets/img/default/empty-job.webp"}
                        alt={props.job.company_name || "Default job image"}
                    />
                    <h3 className="job-card__company-name">{props.job.company_name || "no info"}</h3>
                    </div>

                    <div className="job-card__date">
                        <CalendarDays className="job-card__icon"/> {getFormattedDate()}
                    </div>
                </div>
                {/* <p>Job tags: {Array.isArray(props.job.tags) && props.job.tags.length > 0 ? props.job.tags.join(", ") : "no info"}</p> */}
            </li>
}