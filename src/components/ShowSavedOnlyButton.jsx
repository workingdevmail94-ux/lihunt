export default function ShowSavedOnlyButton(props) {
    return (
        <button 
        disabled={props.savedJobs.length === 0 || props.errorFetch} 
        onClick={props.onSavedOnly} className={"btn filter__btn filter__btn--saved-only" + (props.showSavedOnly && props.savedJobs.length > 0? " active" : "")}> {props.icon}
            <span>Saved jobs: {props.savedJobs.length}</span>
        </button>
    )
}