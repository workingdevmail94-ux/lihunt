import { RotateCcw } from "lucide-react";
export default function LoadMoreButton(props) {
  function handleLoadMore() {
    props.setIsLoadMore(true);
    if (props.sortedJobs.length - props.visibleCount > 7) {
      setTimeout(() => {
        props.setVisibleCount(props.visibleCount + 6);
        props.setIsLoadMore(false);
      }, 1000);
    } else {
      setTimeout(() => {
        props.setVisibleCount(props.sortedJobs.length);
        props.setIsLoadMore(false);
      }, 1000);
    }
  }
  return (
    <button
      disabled={props.isLoadMore}
      className={"btn btn--load-more"}
      onClick={handleLoadMore}
    >
      {props.isLoadMore ? <RotateCcw className="spin-animation" /> : null}
      <span>
        Show more jobs ({props.sortedJobs.length - props.visibleCount}{" "}
        remaining)
      </span>
    </button>
  );
}
