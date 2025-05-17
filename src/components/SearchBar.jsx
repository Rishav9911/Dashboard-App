// src/components/SearchBar.jsx
import React from 'react';
import useDashboardStore from '../store/dashboardStore';
import { FaTimes } from 'react-icons/fa'; // Importing the close icon

const SearchBar = () => {
  // Get searchQuery and setSearchQuery from our store
  const searchQuery = useDashboardStore(state => state.searchQuery);
  const setSearchQuery = useDashboardStore(state => state.setSearchQuery);
  
  // Handle input changes
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    console.log('Search query updated:', e.target.value); // Debug log
  };
  
  // Handle form submission (prevent default page reload)
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="input-group text-white">
          <input
            type="text"
            className="form-control bg-light text-black"
            placeholder="Search widgets by name or content..."
            value={searchQuery}
            onChange={handleChange}
         
          />
          {searchQuery && (
            <button
              className="btn btn-outline-secondary bg-white"
              type="button"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
             <FaTimes className='text-black' />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;