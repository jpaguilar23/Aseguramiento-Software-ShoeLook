import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => { setValue(initialValue); }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form className="search-wrapper" onSubmit={handleSubmit}>
      <div className="search-input-group">
        <div className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          className="search-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Ej: "Nike Air Force 1", "Adidas Stan Smith"...'
        />
        {value && (
          <button
            type="button"
            className="search-clear"
            onClick={() => { setValue(""); onSearch(""); }}
          >✕</button>
        )}
        <button type="submit" className="search-btn">Buscar</button>
      </div>
    </form>
  );
}
