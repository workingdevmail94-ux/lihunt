export default function EmptyState(props) {
    return <div className="empty-state">
        <p className="empty-state__text">{props.text}</p>
    </div>
}