import { List, Grid3x3 } from "lucide-react";

export default function JobsHeader(props) {
  return (
    <>
      <div className="jobs-header">
        <h2 className="jobs-header__title">
          {props.title}
          <span className="jobs-header__count">{props.count}</span>
        </h2>

        <div className="jobs-header__view-switcher">
          <button
            onClick={() => props.setViewListMode("list")}
            className={
              "btn jobs-header__view-btn" +
              (props.viewListMode === "list" ? " active" : "")
            }
          >
            <List className="jobs-header__view-icon" />
          </button>

          <button
            onClick={() => props.setViewListMode("grid")}
            className={
              "btn jobs-header__view-btn" +
              (props.viewListMode === "grid" ? " active" : "")
            }
          >
            <Grid3x3 className="jobs-header__view-icon" />
          </button>
        </div>
      </div>
    </>
  );
}
