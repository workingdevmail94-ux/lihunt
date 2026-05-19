export default function SectionTitle(props) {
    return <h2 className="section-title">
        {props.title} <span className="section-title__count">{props.count}</span>
    </h2>
}