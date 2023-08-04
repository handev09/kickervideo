import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const ServiceDropDown = (props) => {
  const { dialogData, onAddNewOption, onSelectServiceOption } = props;

  const [options, setOptions] = useState(dialogData ? [...dialogData] : []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    unitPrice: '',
  });

  


  useEffect(() => {
    setOptions(dialogData ? [...dialogData] : []);
  }, [dialogData]);

  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('Empty'); // Default selected option



  const handleAddService = () => {
    if (newService.name.trim() !== "" && newService.price.trim() !== "") {
      const newOption = {
        name: newService.name.trim(),
        price: parseFloat(newService.price),
        // Add more properties as needed (e.g., description)
      };
      onAddNewOption(newOption); // Use onAddNewOption function to pass the new option to the parent component
      setOptions([...options, newOption]);
      setNewService({
        name: "",
        description: "",
        price: "",
      });
      setIsDialogOpen(false);
      onSelectServiceOption(newOption.price, newOption.cost, newOption.markup); // Pass appropriate data
    }
  };

  const toggleDropdown = () => {
    setIsDialogOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDialogOpen(false);
    }
  };


  const handleOptionSelect = (option) => {
    setSelectedOption(option.name);
    setIsDialogOpen(false);
    onSelectServiceOption(option.price, option.cost, option.markup); // Pass price, cost, and markup to parent component
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown__filter" onClick={toggleDropdown}>
        <div className="dropdown__input dropdown__filter-selected" aria-selected="true">
          {selectedOption}
        </div>

        <div className={`dropdown__arrow ${isDialogOpen ? 'rotate' : ''}`}>
          <img src='/assets/icons/ic_arrow_down.svg' className='arrow__down' alt="arrow down" />
        </div>
      </div>
      {isDialogOpen && (
        <ul
          className="dropdown__select"
          style={{ width: dropdownRef.current ? dropdownRef.current.offsetWidth : 'auto' }}
        >
          {options.length === 0 ? (
            <li className="dropdown__select-option" role="option" onClick={() => {}}>
              No options
            </li>
          ) : (
            options.map((option, index) => (
              <li
                key={index}
                className="dropdown__select-option"
                role="option"
                onClick={() => {
                  handleOptionSelect(option)
                  setSelectedOption(option.name);
                  setIsDialogOpen(false);
                }}
              >
                {/* Use Flexbox to display name at start and price at end */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{option.name}</span>
                  <span>${option.unitPrice}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ServiceDropDown;
