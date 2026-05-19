import {
  ArrowUpAZ,
  ArrowDownAZ
} from "lucide-react";

export default function SortButton(props) {
    return <button disabled={props.filteredJobs.length <= 1} className={"btn filter__btn filter__btn--sort"} onClick={props.onSort}>Сортировать {props.sortOrder === "asc" ? <ArrowUpAZ/> : <ArrowDownAZ/>}</button>
}