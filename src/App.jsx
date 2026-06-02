import { useEffect, useState } from "react";
import { RotateCcw, CircleX } from "lucide-react";
import "./App.scss";
import "./styles/main.scss";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import JobList from "./components/JobList.jsx";
import JobPage from "./components/JobPage.jsx";
import SearchBar from "./components/SearchBar.tsx";
import Filters from "./components/Filters.jsx";
import EmptyState from "./components/EmptyState.jsx";
import JobsHeader from "./components/JobsHeader.jsx";
import LoadMoreButton from "./components/LoadMoreButton.jsx";
import ThemeSwitcher from "./components/ThemeSwitcher.jsx";

export default function App() {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  useEffect(() => {
    setIsLoading(true);

    const fetchPromise = fetch("https://remotive.com/api/remote-jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        setJobsList(data.jobs);
      });

    const delayPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    Promise.all([fetchPromise, delayPromise])
      .catch((error) => {
        setErrorFetch(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  useEffect(() => {
    setVisibleCount(6);
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);
  const [workType, setWorkType] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortType, setSortType] = useState("title");
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("savedJobs");
      if (saved) {
        setSavedJobs(JSON.parse(saved));
      }
    } catch {
      setSavedJobs([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    }
  }, [savedJobs, isLoaded]);

  useEffect(() => {
    if (savedJobs.length === 0 && showSavedOnly) {
      setShowSavedOnly(false);
    }
  }, [savedJobs, showSavedOnly]);

  const [viewListMode, setViewListMode] = useState("grid");
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const hasPartTime = jobsList.some((job) => job.job_type === "part_time");
  const hasFullTime = jobsList.some((job) => job.job_type === "full_time");
  const hasFreelance = jobsList.some((job) => job.job_type === "freelance");
  const hasContract = jobsList.some((job) => job.job_type === "contract");

  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
      job.company_name
        .toLowerCase()
        .includes(debouncedSearchValue.toLowerCase());
    const matchesType = workType === "all" ? true : job.job_type === workType;
    const matchesSavedOnly =
      showSavedOnly === false ? true : savedJobs.includes(job.id);
    return matchesSearch && matchesType && matchesSavedOnly;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortType === "title") {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    }
    if (sortType === "date") {
      const dateA = new Date(a.publication_date).getTime();
      const dateB = new Date(b.publication_date).getTime();
      if (sortOrder === "asc") {
        return dateA - dateB;
      } else if (sortOrder === "desc") {
        return dateB - dateA;
      }
    }
    return 0;
  });

  const visibleJobs = sortedJobs.slice(0, visibleCount);

  function toggleSaveJobs(id) {
    if (savedJobs.includes(id)) {
      const newSavedJobs = savedJobs.filter((item) => item !== id);
      if (newSavedJobs.length === 0) {
        setShowSavedOnly(false);
      }
      setSavedJobs(newSavedJobs);
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  }

  const jobControls = (
    <>
      <SearchBar
        errorFetch={errorFetch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onEscape={() => {
          setSelectedJob(null);
          setSearchValue("");
        }}
      />

      <Filters
        errorFetch={errorFetch}
        workType={workType}
        setWorkType={setWorkType}
        setSearchValue={setSearchValue}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortType={sortType}
        setSortType={setSortType}
        savedJobs={savedJobs}
        filteredJobs={filteredJobs}
        hasFullTime={hasFullTime}
        hasPartTime={hasPartTime}
        hasFreelance={hasFreelance}
        hasContract={hasContract}
        showSavedOnly={showSavedOnly}
        setShowSavedOnly={setShowSavedOnly}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
      />
    </>
  );

  return (
    <>
      <Header />
      <main className="main">
        {isLoading ? (
          <div className="loading loading--main">
            <RotateCcw className="loading__icon spin-animation" /> Loading
          </div>
        ) : errorFetch ? (
          <div className="loading loading--main">
            <CircleX /> Loading error
          </div>
        ) : jobsList.length === 0 ? (
          "No jobs found"
        ) : selectedJob ? (
          <JobPage selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
        ) : sortedJobs.length === 0 ? (
          <>
            {jobControls}
            <EmptyState text={"Nothing found"} />
          </>
        ) : (
          <>
            
            {jobControls}
            <JobsHeader
              title={showSavedOnly ? "Found saved jobs" : "Found jobs"}
              count={sortedJobs.length}
              viewListMode={viewListMode}
              setViewListMode={setViewListMode}
            />

            <JobList
              visibleJobs={visibleJobs}
              savedJobs={savedJobs}
              setSavedJobs={setSavedJobs}
              toggleSaveJobs={toggleSaveJobs}
              searchValue={searchValue}
              viewListMode={viewListMode}
              setViewListMode={setViewListMode}
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
            />

            {sortedJobs.length > visibleCount ? (
              <LoadMoreButton
                visibleCount={visibleCount}
                setVisibleCount={setVisibleCount}
                sortedJobs={sortedJobs}
                isLoadMore={isLoadMore}
                setIsLoadMore={setIsLoadMore}
              />
            ) : null}
          </>
        )}
      </main>
      <Footer />
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
    </>
  );
}
