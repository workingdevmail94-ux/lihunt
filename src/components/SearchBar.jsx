import { Search } from "lucide-react";

export default function SearchBar(props) {
  return (
    <div className="search">
      <Search className="search__icon" />
      <input
        className="search__input"
        type="text"
        disabled={props.errorFetch}
        value={props.searchValue}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Search by job title or company..."
      />
    </div>
  );
}