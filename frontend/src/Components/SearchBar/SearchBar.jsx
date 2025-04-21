import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Tìm kiếm sản phẩm..." }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        if (onSearch) {
            onSearch("");
        }
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                {searchTerm && (
                    <button 
                        type="button" 
                        onClick={clearSearch}
                        className="clear-button"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
                <button 
                    type="submit" 
                    className="search-button"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </div>
    );
};

export default SearchBar; 