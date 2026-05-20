export default function LoadMoreButton(props) {
    function handleLoadMore() {
        if (props.sortedJobs.length - props.visibleCount > 7) {
            props.setVisibleCount(props.visibleCount + 6)
        }
        else {
            props.setVisibleCount(props.sortedJobs.length)
        }
        
    }
    return <button className={"btn btn--load-more"} onClick={handleLoadMore}>Показать еще (Осталось: {props.sortedJobs.length - props.visibleCount})</button>
}