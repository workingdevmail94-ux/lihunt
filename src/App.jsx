import { useEffect, useState } from 'react'
import {
  Bookmark,
  BookmarkCheck,
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  Building2,
  CalendarDays,
  RotateCcw,
  ArrowUpAZ,
  ArrowDownAZ,
  ExternalLink
} from "lucide-react";
import './App.scss'
import "./styles/main.scss";
import LogoTitle from './components/LogoTitle.jsx';
import JobList from './components/JobList.jsx'
import SearchBar from './components/SearchBar.jsx'
import searchBar from './components/SearchBar.jsx'
import Filters from './components/Filters.jsx'
import EmptyState from './components/EmptyState.jsx'
import SectionTitle from './components/SectionTitle.jsx'
import LoadMoreButton from './components/LoadMoreButton.jsx'

export default function App() {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  useEffect(() => {
   setIsLoading(true)
   fetch('https://remotive.com/api/remote-jobs').then(response => {
      if (!response.ok) {
        throw new Error('Сетевая ошибка');
      }
    return response.json();
  }).then(data => {
    console.log(data.jobs[0])
    setJobsList(data.jobs);
  }).catch(error => {
    setErrorFetch(error);
  }).finally(() => {
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
    console.log(saved)
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
      <main>
        
        <LogoTitle/>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>

        <Filters 
        workType={workType} setWorkType={setWorkType}  
        setSearchValue={setSearchValue} 
        sortOrder={sortOrder} setSortOrder={setSortOrder}
        savedJobs={savedJobs}
        filteredJobs={filteredJobs}
        showSavedOnly={showSavedOnly} setShowSavedOnly={setShowSavedOnly} 
        visibleCount={visibleCount} setVisibleCount={setVisibleCount}/>
        
        {isLoading ? (
          "Загрузка..."
        ) : errorFetch ? (
          "Ошибка загрузки"
        ) : jobsList.length === 0 ? (
          "Нет вакансий"
        ) : sortedJobs.length === 0 ? (
           <EmptyState text={savedJobs.length === 0 && showSavedOnly ? "Нет сохраненных вакансий" : "Ничего не найдено"}/>
        ) : (
          <>
            <SectionTitle title={showSavedOnly ? "Найдено сохраненных вакансий" : "Найдено вакансий"} count={sortedJobs.length}/>
            <JobList visibleJobs={visibleJobs} savedJobs={savedJobs} setSavedJobs={setSavedJobs} toggleSaveJobs={toggleSaveJobs}/>
            {sortedJobs.length > visibleCount ?  (
              <LoadMoreButton visibleCount={visibleCount} setVisibleCount={setVisibleCount} sortedJobs={sortedJobs}/>) 
              : null}
          </>
          )
        }   
      </main>
    </>
  )
}


