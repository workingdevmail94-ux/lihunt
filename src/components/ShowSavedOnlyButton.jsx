export default function ShowSavedOnlyButton(props) {
    return (
        <button 
        disabled={props.savedJobs.length === 0} 
        onClick={props.onSavedOnly} className={"btn filter__btn" + (props.showSavedOnly && props.savedJobs.length > 0? " active" : "")}>
            Сохраненные {props.savedJobs.length}
        </button>
    )
}