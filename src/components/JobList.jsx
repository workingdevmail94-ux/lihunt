import JobCard from "./JobCard"

export default function JobList (props) {
   return <ul className="jobs-list">
        {props.visibleJobs.map((item) => {
            const isSaved = props.savedJobs.includes(item.id);
            return <JobCard key={item.id} job={item} isSaved={isSaved} onToggleSave={props.toggleSaveJobs} searchValue={props.searchValue}/>
        })}
    </ul>
}