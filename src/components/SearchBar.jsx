export default function SearchBar(props) {
    return <input type="text" value={props.searchValue} onChange={(event) => props.setSearchValue(event.target.value)} className="search-input" />
}