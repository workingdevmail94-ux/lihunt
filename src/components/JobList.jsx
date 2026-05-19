import JobCard from "./JobCard"

export default function JobList (props) {
   return <ul className="jobs-list">
        {props.jobsList.map((item) => {
            const isSaved = props.savedJobs.includes(item.id);showSavedOnly
            return <JobCard key={item.id} job={item} isSaved={isSaved} onToggleSave={props.toggleSaveJobs} />
        })}
    </ul>
}