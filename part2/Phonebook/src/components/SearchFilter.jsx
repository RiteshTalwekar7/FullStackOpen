const SearchFilter = ({ searchName, handleSearch }) => {
  return <div>
    <p>Filter shown with <input
      value={searchName}
      onChange={handleSearch} /></p>
  </div>
}

export default SearchFilter