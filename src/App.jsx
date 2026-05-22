import { useEffect, useState } from 'react'
import { RotateCcw } from "lucide-react";
import './App.scss'
import "./styles/main.scss";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import JobList from './components/JobList.jsx'
import SearchBar from './components/SearchBar.tsx'
import Filters from './components/Filters.jsx'
import EmptyState from './components/EmptyState.jsx'
import JobsHeader from './components/JobsHeader.jsx'
import LoadMoreButton from './components/LoadMoreButton.jsx'

export default function App() {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  useEffect(() => {
   setIsLoading(true)

  const fetchPromise = fetch('https://remotive.com/api/remote-jobs').then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
    return response.json();
  }).then(data => {
    setJobsList(data.jobs);
  })

  const delayPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  Promise.all([fetchPromise, delayPromise]).catch(error => {
    setErrorFetch(error);
  })
  .finally(() => {
      setIsLoading(false) 
  })
  }, [])
  
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, 300);
    return () => clearTimeout(timer)
  }, [searchValue])
  const [workType, setWorkType] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");

    if (saved) {
      setSavedJobs(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs))
    }
  }, [savedJobs])

  useEffect(() => {
    if (savedJobs.length === 0 && showSavedOnly) {
      setShowSavedOnly(false)
    }
  }, [savedJobs, showSavedOnly])

  const [viewListMode, setViewListMode] = useState("grid");
  const [isLoadMore, setIsLoadMore] = useState(false);

  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()) || job.company_name.toLowerCase().includes(debouncedSearchValue.toLowerCase());
    const matchesType = workType === "all" ? true : job.job_type === workType;
    const matchesSavedOnly = showSavedOnly === false ? true : savedJobs.includes(job.id);
    return matchesSearch && matchesType && matchesSavedOnly
  })

  const sortedJobs = [...filteredJobs].sort((a,b) => {
    if (sortOrder === "asc") {
        return a.title.localeCompare(b.title)
    }
    else {
      return b.title.localeCompare(a.title)
    }
  })

  const visibleJobs = sortedJobs.slice(0, visibleCount);

  function toggleSaveJobs(id) {
      if (savedJobs.includes(id)) {
         setSavedJobs(savedJobs.filter((item) => item !== id))
      }
      else {
         setSavedJobs([...savedJobs, id])
      }
  }

  return (
    <>
      <Header/>
      <main>
        <SearchBar errorFetch={errorFetch} searchValue={searchValue} setSearchValue={setSearchValue}/>

        <Filters 
        errorFetch={errorFetch}
        workType={workType} setWorkType={setWorkType}  
        setSearchValue={setSearchValue} 
        sortOrder={sortOrder} setSortOrder={setSortOrder}
        savedJobs={savedJobs}
        filteredJobs={filteredJobs}
        showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly} 
        visibleCount={visibleCount} setVisibleCount={setVisibleCount}/>
        
        {isLoading ? (
          <div className="loading">
            <RotateCcw className='loading__icon spin-animation'/> Loading
          </div>
        ) : errorFetch ? (
          "Loading error"
        ) : jobsList.length === 0 ? (
          "No jobs found"
        ) : sortedJobs.length === 0 ? (
           <EmptyState text={savedJobs.length === 0 && showSavedOnly ? "No saved jobs" : "Nothing found"}/>
        ) : (
          <>
           
            <JobsHeader title={showSavedOnly ? "Found saved jobs" : "Found jobs"} count={sortedJobs.length} viewListMode={viewListMode} setViewListMode={setViewListMode}/>
            <JobList visibleJobs={visibleJobs} savedJobs={savedJobs} setSavedJobs={setSavedJobs} toggleSaveJobs={toggleSaveJobs} searchValue={searchValue} viewListMode={viewListMode} setViewListMode={setViewListMode}/>
            {sortedJobs.length > visibleCount ?  (
              <LoadMoreButton visibleCount={visibleCount} setVisibleCount={setVisibleCount} sortedJobs={sortedJobs} isLoadMore={isLoadMore} setIsLoadMore={setIsLoadMore}/>) 
              : null}
          </>
          )
        }   
      </main>
      <Footer />
    </>
  )
}


