import { useEffect } from "react";
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  CalendarDays,
  X,
} from "lucide-react";

export default function JobPage(props) {
  // adding handle Escape for document while JobPage is open
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        props.setSelectedJob(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.setSelectedJob]);

  // adding target _blank for links and rel noopener noreferrer
  function addBlankTarget(description) {
    const parser = new DOMParser();

    const doc = parser.parseFromString(description || "", "text/html");

    const links = doc.querySelectorAll("a");

    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    return doc.body.innerHTML;
  }

  // clean props.selectedJob.description from empty tags and tags with class, div, and other
  const cleanDescription = addBlankTarget(props.selectedJob.description)
    ?.replace(/\sstyle="[^"]*"/gi, "")
    ?.replace(/\sclass="[^"]*"/gi, "")
    ?.replace(
      /<p[^>]*>\s*(<strong[^>]*>)?\s*(&nbsp;|\s|<br\s*\/?>)*\s*(<\/strong>)?\s*<\/p>/gi,
      "",
    )
    ?.replace(/<img[^>]*>/gi, "")
    ?.replace(/<div[^>]*>\s*&nbsp;\s*<\/div>/gi, "");

  // format text from api for more pretty reading
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

  // format date to localdatestring ru-RU
  function getFormattedDate() {
    const publicationDate = props.selectedJob.publication_date;
    if (!publicationDate) {
      return "no info";
    }
    const date = new Date(publicationDate);
    return date.toLocaleDateString("ru-RU");
  }
  return (
    <article className="job-card job-page">
      <div className="job-card__top">
        <h3 className="job-card__title">
          {props.selectedJob.title || "no title"}
        </h3>
        <button
          className="job-card__action-btn"
          aria-label="close"
          onClick={() => props.setSelectedJob(null)}
        >
          <X />
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
              {formatJobType(props.selectedJob.job_type)}
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
            <span className="job-card__info-value">
              {props.selectedJob.salary.length <= 2
                ? "no info"
                : props.selectedJob.salary}
            </span>
          </span>
        </li>
      </ul>

      <div
        className="job-card__description"
        dangerouslySetInnerHTML={{
          __html: cleanDescription || "<p> No description </p>",
        }}
      ></div>
      {Array.isArray(props.selectedJob.tags) &&
      props.selectedJob.tags.length > 0 ? (
        <ul className="job-card__tags-list">
          {props.selectedJob.tags.map((item, index) => (
            <li key={index} className="job-card__tags-item">
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="job-card__bottom">
        <div className="job-card__company">
          <img
            className="job-card__company-logo"
            src={
              props.selectedJob.company_logo ||
              "assets/img/default/empty-selectedJob.webp"
            }
            alt={props.selectedJob.company_name || "Default job image"}
          />
          <h3 className="job-card__company-name">
            {props.selectedJob.company_name || "no company"}
          </h3>
        </div>

        <div className="job-card__date">
          <CalendarDays className="job-card__icon" /> {getFormattedDate()}
        </div>
      </div>
    </article>
  );
}
