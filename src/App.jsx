import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
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
        console.log(data.jobs[0]);
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
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);
  const [workType, setWorkType] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("savedJobs");

    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }

    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    }
  }, [savedJobs]);

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
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
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

  return (
    <>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <Header />
      <main>
        {isLoading ? (
          <div className="loading loading--main">
            <RotateCcw className="loading__icon spin-animation" /> Loading
          </div>
        ) : errorFetch ? (
          "Loading error"
        ) : jobsList.length === 0 ? (
          "No jobs found"
        ) : selectedJob ? (
          <JobPage selectedJob={selectedJob} setSelectedJob={setSelectedJob} />
        ) : sortedJobs.length === 0 ? (
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

            <EmptyState text={"Nothing found"} />
          </>
        ) : (
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
    </>
  );
}
