import React from 'react';
const SearchView = ({search, handleSearch})=>{

const handleSearchFieldChange = (e)=>{
  handleSearch(e);
}

return(
  <>
  <label>Search</label>
  <input type="text" id="searchField" name="searchField" value = {search} onChange={(e)=>{handleSearch(e)}}/>
  </>
)
}

export default SearchView;