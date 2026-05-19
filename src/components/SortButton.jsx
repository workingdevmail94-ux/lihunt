export default function SortButton(props) {
    return <button disabled={props.filteredJobs.length <= 1} className={"filter__btn filter__btn--sort"} onClick={props.onSort}>Сортировать {props.sortOrder === "asc" ? "A → Z" : "Z → A"}</button>
}