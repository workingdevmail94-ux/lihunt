import {
  ArrowUpAZ,
  ArrowDownAZ
} from "lucide-react";

export default function SortButton(props) {
    return <button disabled={props.filteredJobs.length <= 1 || props.errorFetch} className={"btn filter__btn filter__btn--sort"} onClick={props.onSort}>{props.icon} Sort {props.sortOrder === "asc" ? <ArrowUpAZ/> : <ArrowDownAZ/>}</button>
}