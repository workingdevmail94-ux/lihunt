import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  CalendarDays,
} from "lucide-react";

export default function JobCard(props) {
  function handleSelectJob() {
    props.setSelectedJob(props.job);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  function formatJobType(type) {
    if (!type) {
      return "no info";
    } else if (type === "full_time") {
      return "Full time";
    } else if (type === "part_time") {
      return "Part time";
    }
    return type;
  }

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
      ),
    );
  } 
  function getFormattedDate() {
    const publicationDate = props.job.publication_date;
    if (!publicationDate) {
      return "no info";
    }
    const date = new Date(publicationDate);
    return date.toLocaleDateString("ru-RU");
  }
  return (
    <li className="job-card">
      <div className="job-card__top">
        <h3 className="job-card__title">
          {highlightText(props.job.title || "no title", props.searchValue)}
        </h3>
        <button aria-label={props.isSaved ? "Remove job from saved" : "Save job"}
          className={
            "btn job-card__action-btn" +
            (props.isSaved ? " active" : "")
          }
          onClick={() => props.onToggleSave(props.job.id)}
        >
          {props.isSaved ? (
            <BookmarkCheck className="job-card__icon" />
          ) : (
            <Bookmark className="job-card__icon" />
          )}
        </button>
      </div>

      <ul className="job-card__info-list">
        <li className="job-card__info-item">
          <span className="job-card__icon-box job-card__icon-box--briefcase">
            <BriefcaseBusiness className="job-card__icon" />
          </span>

          <span className="job-card__info-text">
            <span className="job-card__info-label">Job type:</span>
            <span className="job-card__info-value">
              {formatJobType(props.job.job_type)}
            </span>
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
            <span className="job-card__info-value">
              {!props.job.salary || props.job.salary.length <= 2 ? "no info" : props.job.salary}
            </span>
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
          <h3 className="job-card__company-name">
            {highlightText(
              props.job.company_name || "no company",
              props.searchValue,
            )}
          </h3>
        </div>

        <div className="job-card__date">
          <CalendarDays className="job-card__icon" /> {getFormattedDate()}
        </div>
      </div>
      <button
        className="btn btn--revert job-card__view-details-btn"
        onClick={handleSelectJob}
      >
        View details
      </button>
    </li>
  );
}
