import React, { useState, useRef, useEffect } from 'react';
import './MyDropDown.css'; // Import the CSS file

const MyReimburseDropdown = ({ option, onChange }) => {
  console.log(option)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown__filter" onClick={toggleDropdown}>
        <div className="dropdown__input dropdown__filter-selected" aria-selected="true">
          {option}
        </div>
        
        <div className={`dropdown__arrow ${isDropdownOpen ? 'rotate' : ''}`}>
          <img src='/assets/icons/ic_arrow_down.svg' className='arrow__down' alt="arrow down" />
        </div>
      </div>
      {isDropdownOpen && (
        <ul
          className="dropdown__select"
          style={{ width: dropdownRef.current ? dropdownRef.current.offsetWidth : 'auto' }}
        >
          {/* Render a single option */}
          <li
            className="dropdown__select-option"
            role="option"
            onClick={() => {
              setIsDropdownOpen(false);
              onChange(option); // Notify the parent component of the selected option
            }}
          >
            {option}
          </li>
        </ul>
      )}
    </div>
  );
};

export default MyReimburseDropdown;
