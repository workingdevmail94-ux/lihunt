import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  CalendarDays,
  X
} from "lucide-react";

export default function JobPage(props) {
    function formatJobType(type) {
            if (!type) {
                return "no info"
            }
            else if (type === "full_time") {
                return "Full time"
            }
            else if (type === "part_time") {
                return "Part time"
            }
            return type
        }

            function getFormattedDate() {
        const publicationDate = props.selectedJob.publication_date;
            if (!publicationDate) {return "no info"}
            const date = new Date(publicationDate);
            return date.toLocaleDateString("ru-RU");
    }
    return  (    
     
       
        <article className="job-card job-page">
           <button className="job-card__action-btn" onClick={() => props.setSelectedJob(null)}><X /></button>
                     {/* <button
                    className={"job-card__save-btn" + (props.isSaved ? " job-card__save-btn--active" : "")}
                    onClick={() => props.onToggleSave(props.selectedJob.id)}
                    >
                    {props.isSaved ? <BookmarkCheck className="job-card__icon"/> : <Bookmark className="job-card__icon"/>}
                    
                    </button> */}


                    <h3 className="job-card__title">{props.selectedJob.title || "no title"}</h3>

                    <ul className="job-card__info-list">
  <li className="job-card__info-item">
    <span className="job-card__icon-box job-card__icon-box--briefcase">
      <BriefcaseBusiness className="job-card__icon" />
    </span>

    <span className="job-card__info-text">
      <span className="job-card__info-label">Job type:</span>
      <span className="job-card__info-value">{formatJobType(props.selectedJob.job_type)}</span>
    </span>
  </li>

  <li className="job-card__info-item">
    <span className="job-card__icon-box job-card__icon-box--location">
      <MapPin className="job-card__icon" />
    </span>

    <span className="job-card__info-text">
      <span className="job-card__info-label">Location:</span>
      <span className="job-card__info-value">
        {props.selectedJob.candidate_required_location || "no info"}
      </span>
    </span>
  </li>

  <li className="job-card__info-item job-card__info-item--salary">
    <span className="job-card__icon-box job-card__icon-box--salary">
      <DollarSign className="job-card__icon" />
    </span>

    <span className="job-card__info-text">
      <span className="job-card__info-label">Salary:</span>
      <span className="job-card__info-value">{props.selectedJob.salary.length <= 2 ? "no info" : props.selectedJob.salary}</span>
    </span>
  </li>
</ul>

                
                <div className="job-card__bottom">
                    <div className="job-card__company">
                    <img
                        className="job-card__company-logo"
                        src={props.selectedJob.company_logo || "assets/img/default/empty-selectedJob.webp"}
                        alt={props.selectedJob.company_name || "Default job image"}
                    />
                    <h3 className="job-card__company-name">{props.selectedJob.company_name || "no company"}</h3>
                    </div>

                    <div className="job-card__date">
                        <CalendarDays className="job-card__icon"/> {getFormattedDate()}
                    </div>
                </div>
           
                
                {/* <p>Job tags: {Array.isArray(props.selectedJob.tags) && props.selectedJob.tags.length > 0 ? props.selectedJob.tags.join(", ") : "no info"}</p> */}
            </article>
    )
}