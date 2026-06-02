import ResetButton from "./ResetButton";
import SortButtonByTitle from "./SortButtonByTitle";
import SortButtonByDate from "./SortButtonByDate";
import ShowSavedOnlyButton from "./ShowSavedOnlyButton";
import {
  Grid2X2,
  Clock3,
  BriefcaseBusiness,
  Laptop,
  FileSignature,
  RotateCcw,
  ArrowDownUp,
  Bookmark,
} from "lucide-react";

export default function Filters(props) {
  function handleWorkTypeClick(type) {
    props.setWorkType(type);
    props.setShowSavedOnly(false);
    props.setVisibleCount(6);
  }
  function handleReset() {
    props.setWorkType("all");
    props.setSearchValue("");
    props.setShowSavedOnly(false);
    props.setVisibleCount(6);
  }
  function handleTitleSort() {
    if (props.sortType === "title") {
      props.setSortOrder(props.sortOrder === "asc" ? "desc" : "asc");
    }
    else {
      props.setSortType("title")
      props.setSortOrder("asc")
    }
  }
  function handleDateSort() {
    if (props.sortType === "date") {
       props.setSortOrder(props.sortOrder === "asc" ? "desc" : "asc");
    }
    else {
      props.setSortType("date")
      props.setSortOrder("desc")
    }
  }
  function showSavedOnly() {
    props.setShowSavedOnly(!props.showSavedOnly);
    props.setVisibleCount(6);
    props.setWorkType("all");
  }
  return (
    <>
      
      <div className="filter">
        <button
          disabled={props.errorFetch}
          className={
            "btn filter__btn" + (props.workType === "all" ? " active" : "")
          }
          onClick={() => handleWorkTypeClick("all")}
        >
          <Grid2X2 className="filter__icon" />
          All jobs
        </button>

        <button
          disabled={props.errorFetch || !props.hasFullTime}
          className={
            "btn filter__btn" +
            (props.workType === "full_time" ? " active" : "")
          }
          onClick={() => handleWorkTypeClick("full_time")}
        >
          <BriefcaseBusiness className="filter__icon" />
          Full time
        </button>

        <button
          disabled={props.errorFetch || !props.hasPartTime}
          className={
            "btn filter__btn" +
            (props.workType === "part_time" ? " active" : "")
          }
          onClick={() => handleWorkTypeClick("part_time")}
        >
          <Clock3 className="filter__icon" />
          Part time
        </button>

        <button
          disabled={props.errorFetch || !props.hasFreelance}
          className={
            "btn filter__btn" +
            (props.workType === "freelance" ? " active" : "")
          }
          onClick={() => handleWorkTypeClick("freelance")}
        >
          <Laptop className="filter__icon" />
          Freelance
        </button>

        <button
          disabled={props.errorFetch || !props.hasContract}
          className={
            "btn filter__btn" + (props.workType === "contract" ? " active" : "")
          }
          onClick={() => handleWorkTypeClick("contract")}
        >
          <FileSignature className="filter__icon" />
          Contract
        </button>

        <ShowSavedOnlyButton
          errorFetch={props.errorFetch}
          onSavedOnly={showSavedOnly}
          showSavedOnly={props.showSavedOnly}
          setShowSavedOnly={props.setShowSavedOnly}
          savedJobs={props.savedJobs}
          icon={<Bookmark className="filter__icon" />}
        />
        {/* <div className="filter__additional-buttons"> */}
       
        <SortButtonByTitle
          errorFetch={props.errorFetch}
          onSort={handleTitleSort}
          sortOrder={props.sortOrder}
          filteredJobs={props.filteredJobs}
          icon={<ArrowDownUp className="filter__icon" />}
        />
         <SortButtonByDate
          errorFetch={props.errorFetch}
          onSort={handleDateSort}
          sortOrder={props.sortOrder}
          sortType={props.sortType}
          filteredJobs={props.filteredJobs}
          icon={<ArrowDownUp className="filter__icon" />}
        />
        <ResetButton
          errorFetch={props.errorFetch}
          onReset={handleReset}
          icon={<RotateCcw className="filter__icon" />}
        />

        {/* </div> */}
      </div>
    </>
  );
}
