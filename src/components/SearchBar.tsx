import { Search } from "lucide-react";
import type { KeyboardEvent } from "react";

type SearchBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  errorFetch: Error | null;
  onEscape: () => void;
};

export default function SearchBar(props: SearchBarProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      props.onEscape();
    }
  }

  return (
    <div className="search">
      <Search className="search__icon" />

      <input
        className="search__input"
        type="text"
        aria-label="Search jobs"
        disabled={Boolean(props.errorFetch)}
        value={props.searchValue}
        onKeyDown={handleKeyDown}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Search by job title or company..."
      />
    </div>
  );
}
