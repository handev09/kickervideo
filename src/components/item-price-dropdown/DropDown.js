/** @format */

import React, { useState, useEffect } from "react";
import "./CustomDropdown.css"; // Import your CSS file for styling

const CustomDropdown = ({
    selectedServiceCost,
    selectedServiceMarkup,
    onCostChange,
    onMarkupChange,
    onUnitPriceChange,
    selectServiceId,
}) => {
    // States
    const [isOpen, setIsOpen] = useState(false);
    const [localCost, setLocalCost] = useState(selectedServiceCost);
    const [markup, setMarkup] = useState(selectedServiceMarkup);

    // Effects
    useEffect(() => {
        setLocalCost(selectedServiceCost);
        setMarkup(selectedServiceMarkup);

        updateUnitPrice(selectedServiceCost, selectedServiceMarkup);
    }, [selectedServiceCost, selectedServiceMarkup]);

    // Functions
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleCostChange = (event) => {
        const newCost = parseFloat(event.target.value);
        setLocalCost(newCost);
        onCostChange(selectServiceId, newCost);

        // Give "newCost", "markup from state"
        updateUnitPrice(newCost, markup);
    };

    const handleMarkupChange = (event) => {
        const inputValue = event.target.value.replace("%", "");
        if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
            setMarkup(inputValue);
            onMarkupChange(selectServiceId, inputValue);
        }

        // Give "cost from state", "new markup"
        updateUnitPrice(localCost, inputValue);
    };

    const calculateTotal = () => {
        if (!isNaN(localCost) && !isNaN(parseFloat(markup))) {
            const total = localCost + localCost * (parseFloat(markup) / 100);
            return Number(total).toFixed(2);
        } else {
            return "";
        }
    };

    // I used this func as a "funciton declaration" so that we can call it above
    function updateUnitPrice(localCost, markup) {
        // This takes cost and markup updates calulated "unitPrise"
        if (!isNaN(localCost) && !isNaN(parseFloat(markup))) {
            const calculatedUnitPrice =
                localCost + localCost * (parseFloat(markup) / 100);
            onUnitPriceChange(calculatedUnitPrice);
        }
    }

    // We save from useEffects and we should use it when necessary
    // Instead we can safely do these operations inside functions

    // useEffect(() => {
    // }, [localCost, markup]);

    // useEffect(() => {
    // }, [localCost, markup, onUnitPriceChange]);

    return (
        <div className={`custom-dropdown ${isOpen ? "open" : ""}`}>
            <button
                type="button"
                className="dropdown-toggle"
                onClick={handleToggle}
            >
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
                                    ? Number(
                                          localCost +
                                              localCost *
                                                  (parseFloat(markup) / 100)
                                      ).toFixed(2)
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
