export default function ResetButton(props) {
    return <button aria-label="Reset filter button" disabled={props.errorFetch} className={"btn filter__btn filter__btn--reset"} onClick={props.onReset}>{props.icon}</button>
}