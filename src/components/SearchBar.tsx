import { Search } from "lucide-react";
type SearchBarProps = {
  searchValue: string
  setSearchValue: (value: string) => void
  errorFetch: Error | null
}
export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="search">
      <Search className="search__icon" />
      <input
        className="search__input"
        type="text"
        aria-label="Search jobs"
        disabled={Boolean(props.errorFetch)}
        value={props.searchValue}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Search by job title or company..."
      />
    </div>
  );
}