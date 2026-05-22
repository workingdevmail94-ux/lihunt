import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  CalendarDays
} from "lucide-react";



export default function JobCard(props) {
      function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

    function highlightText(text, search) {
      const query = search.trim();
      if (!query) return text;
      const safeQuery = escapeRegExp(query);
      const regex = new RegExp(`(${safeQuery})`, "gi");
      const parts = text.split(regex);

      return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        )
      );
    }
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


                    <a target="_blank" rel="noopener noreferrer" href={props.job.url} className="job-card__link" >{highlightText(props.job.title || "no title", props.searchValue)}</a>

                    <ul className="job-card__info-list">
  <li className="job-card__info-item">
    <span className="job-card__icon-box job-card__icon-box--briefcase">
      <BriefcaseBusiness className="job-card__icon" />
    </span>

    <span className="job-card__info-text">
      <span className="job-card__info-label">Job type:</span>
      <span className="job-card__info-value">{props.job.job_type || "no info"}</span>
    </span>
  </li>

  <li className="job-card__info-item">
    <span className="job-card__icon-box job-card__icon-box--location">
      <MapPin className="job-card__icon" />
    </span>

    <span className="job-card__info-text">
      <span className="job-card__info-label">Location:</span>
      <span className="job-card__info-value">
        {props.job.candidate_required_location || "no info"}
      </span>
    </span>
  </li>

  <li className="job-card__info-item job-card__info-item--salary">
    <span className="job-card__icon-box job-card__icon-box--salary">
      <DollarSign className="job-card__icon" />
    </span>

    <span className="job-card__info-text">
      <span className="job-card__info-label">Salary:</span>
      <span className="job-card__info-value">{props.job.salary || "no info"}</span>
    </span>
  </li>
</ul>

                

                <div className="job-card__bottom">
                    <div className="job-card__company">
                    <img
                        className="job-card__company-logo"
                        src={props.job.company_logo || "assets/img/default/empty-job.webp"}
                        alt={props.job.company_name || "Default job image"}
                    />
                    <h3 className="job-card__company-name">{highlightText(props.job.company_name || "no company", props.searchValue)}</h3>
                    </div>

                    <div className="job-card__date">
                        <CalendarDays className="job-card__icon"/> {getFormattedDate()}
                    </div>
                </div>
                {/* <p>Job tags: {Array.isArray(props.job.tags) && props.job.tags.length > 0 ? props.job.tags.join(", ") : "no info"}</p> */}
            </li>
}