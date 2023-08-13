import React, { useState, useEffect } from "react";
import "./CustomDropdown.css"; // Import your CSS file for styling

const CustomDropdown = ({
  selectedServiceCost,
  selectedServiceMarkup,
  onCostChange,
  onMarkupChange,
  onUnitPriceChange,
  selectServiceId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localCost, setLocalCost] = useState(selectedServiceCost);
  const [markup, setMarkup] = useState(selectedServiceMarkup);
  // console.log(selectServiceId)

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCostChange = (event) => {
    const newCost = parseFloat(event.target.value);
    setLocalCost(newCost);
    onCostChange(selectServiceId,newCost);
  };

  const handleMarkupChange = (event) => {
    const inputValue = event.target.value.replace("%", "");
    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      setMarkup(inputValue);
      onMarkupChange(selectServiceId,inputValue);
    }
  };

  const calculateTotal = () => {
    if (!isNaN(localCost) && !isNaN(parseFloat(markup))) {
      return (localCost + localCost * (parseFloat(markup) / 100)).toFixed(2);
    } else {
      return "";
    }
  };

  useEffect(() => {
    setLocalCost(selectedServiceCost);
    setMarkup(selectedServiceMarkup);
  }, [selectedServiceCost, selectedServiceMarkup]);

  useEffect(() => {
    if (!isNaN(localCost) && !isNaN(parseFloat(markup))) {
      const calculatedUnitPrice = localCost + localCost * (parseFloat(markup) / 100);
      onUnitPriceChange(selectServiceId,calculatedUnitPrice);
    }
  }, [localCost, markup, onUnitPriceChange]);

  return (
    <div className={`custom-dropdown ${isOpen ? "open" : ""}`}>
      <button type="button" className="dropdown-toggle" onClick={handleToggle}>
        {calculateTotal() !== "" ? `$${calculateTotal()}` : "Unit Cost"}
        <span className={`dropdown-icon ${isOpen ? "open" : ""}`}>
          {/* Replace this with your arrow icon */}
          <img
            src="/assets/icons/ic_arrow_down.svg"
            className="arrow__down"
            alt="arrow down"
          />
        </span>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <label>COST:</label>
          <div className="input-container">
            <span className="input-symbol">$</span>
            <input
              className="input"
              type="number"
              value={localCost}
              onChange={handleCostChange}
            />
          </div>

          <label>MARKUP:</label>
          <div className="input-container">
            <input
              type="text"
              value={`${markup}%`}
              onChange={handleMarkupChange}
              placeholder="%"
              className="input"
            />
          </div>

          <label>UNIT PRICE:</label>
          <div className="input-container">
            <span className="input-symbol">$</span>
            <input
              type="text"
              className="input"
              value={`${
                !isNaN(localCost) && !isNaN(parseFloat(markup))
                  ? (localCost + localCost * (parseFloat(markup) / 100)).toFixed(2)
                  : ""
              }`}
              readOnly
            />
          </div>

          <div className="hide-costs" onClick={handleToggle}>
            Hide Costs
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
