import React from "react";

function Search({handleSearch, queryPlants, setQueryPlants}) {


 // function handleChange(e) {
 //   e.preventDefault();
 //   handleSearch(searchQuery);
 // }


  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value = {queryPlants}
        onChange={(e)=> setQueryPlants(e.target.value)}/>
    </div>
  );
}

export default Search;
