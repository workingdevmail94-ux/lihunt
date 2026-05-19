import ResetButton from "./ResetButton"
import SortButton from "./SortButton"
import ShowSavedOnlyButton from "./ShowSavedOnlyButton"
export default function Filters(props) {
    function handleWorkTypeClick(type) {
        props.setWorkType(type)
        props.setShowSavedOnly(false)
    }
    function handleReset() {
        props.setWorkType("all")
        props.setSearchValue("")
        props.setShowSavedOnly(false)
    }
    function handleSort() {
        props.setSortOrder(props.sortOrder === "asc" ? "desc" : "asc")
    }
    function showSavedOnly() {
        props.setShowSavedOnly(!props.showSavedOnly)
    }
    return (
        <> <div className="filter">
            <button className={"filter__btn" + (props.workType === "all" ? " active" : "")} onClick={() => handleWorkTypeClick("all")}>Все</button> 
            <button className={"filter__btn" + (props.workType === "part_time" ? " active" : "")} onClick={() => handleWorkTypeClick("part_time")}>Part time</button>
            <button className={"filter__btn" + (props.workType === "full_time" ? " active" : "")} onClick={() => handleWorkTypeClick("full_time")}>Full time</button>
            <button className={"filter__btn" + (props.workType === "freelance" ? " active" : "")} onClick={() => handleWorkTypeClick("freelance")}>Freelance</button>
            <ResetButton onReset={handleReset}/> 
            <SortButton onSort={handleSort} sortOrder={props.sortOrder} filteredJobs={props.filteredJobs}/>
            <ShowSavedOnlyButton onSavedOnly={showSavedOnly} showSavedOnly={props.showSavedOnly} setShowSavedOnly={props.setShowSavedOnly} savedJobs={props.savedJobs}/>
          </div>
        </>
    )
}