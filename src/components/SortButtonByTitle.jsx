import {
  ArrowUpAZ,
  ArrowDownAZ
} from "lucide-react";

export default function SortButtonByTitle(props) {
    return <button aria-label="Sort filter button by title" disabled={props.filteredJobs.length <= 1 || props.errorFetch} className={"btn filter__btn filter__btn--sort"} onClick={props.onSort}>Sort by title {props.sortOrder === "asc" ? <ArrowUpAZ/> : <ArrowDownAZ/>}</button>
}