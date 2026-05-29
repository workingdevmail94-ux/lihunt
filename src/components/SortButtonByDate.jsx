import { CalendarArrowUp, CalendarArrowDown } from "lucide-react";

export default function SortButtonByDate(props) {
  return (
    <button
      aria-label="Sort filter button by date"
      disabled={props.filteredJobs.length <= 1 || props.errorFetch}
      className={"btn filter__btn filter__btn--sort"}
      onClick={props.onSort}
    >
      Sort by date
      {props.sortType === "date" && props.sortOrder === "asc" ? (
        <CalendarArrowUp />
      ) : (
        <CalendarArrowDown />
      )}
    </button>
  );
}
