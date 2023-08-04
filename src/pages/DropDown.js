import React, { useState, useRef, useEffect } from 'react';
import './MyDropDown.css'; // Import the CSS file

const MyDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('Default option');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

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
        {/* Use the dropdown__input class here */}
        <div className="dropdown__input dropdown__filter-selected" aria-selected="true">
          {selectedOption}
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
          {options.map((option, index) => (
            <li
              key={index}
              className="dropdown__select-option"
              role="option"
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDropdown;
