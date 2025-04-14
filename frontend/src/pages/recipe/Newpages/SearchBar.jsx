// src/components/recipe/SearchBar.jsx
import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import useDebounce from '../hooks/useDebounce';

const SearchBar = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, 500); // Wait 500ms

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className="search-bar mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search recipes... (e.g. pizza, pasta, chicken)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
