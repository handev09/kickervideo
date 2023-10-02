import React, { useState, useRef, useEffect } from 'react';
import './MyDropDown.css'; // Import the CSS file

const MyExpensesDropdown = ({options, onChange, value}) => {
  console.log(options)
  // const { options } = props; // Extract options from props

  const [selectedOption, setSelectedOption] = useState('Options');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onChange(option)
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
              #{option.budget_num +' - ' +option.budget_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyExpensesDropdown;
