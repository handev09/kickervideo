import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  TextField,
  Box,
  Autocomplete,
  Button,
  Paper,
  TextareaAutosize,
  Stack,
} from "@mui/material";

import CustomDropdown from "../components/item-price-dropdown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../state/redux/actions/items/fetch";

const ServiceComp = ({ onDelete, onChange, index }) => {
  console.log("Inde " + index);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = useSelector((state) => state.items.items);
  console.log(items);

  const [quantity, setQuantity] = useState(1);
  const [cost, setCost] = useState(0);
  const [markup, setMarkup] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [value, setValue] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Create an object with the relevant data
    const serviceData = {
      selectedItem,
      quantity,
      unitPrice,
      index,
      total,
      // Add more data properties as needed
    };
    // console.log(serviceData);

    // Emit the data to the parent component
    onChange(serviceData, index);
    const newTotal =
      !isNaN(unitPrice) && !isNaN(quantity)
        ? (quantity * unitPrice).toFixed(2)
        : 0;
    setTotal(newTotal);
  }, [selectedItem, quantity, unitPrice, index, onChange]);

  const handleInputChange = (event, value) => {
    setValue(value); // Set the selected value
  };

  const handleCostChange = (newCost) => {
    setCost(newCost);
  };

  const handleMarkupChange = (newMarkup) => {
    setMarkup(newMarkup);
  };

  const handleCustomDropdownPriceChange = (id, newPrice) => {
    // console.log(newPrice);
    // Handle custom dropdown price change logic here
    setUnitPrice(newPrice);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);

    // Calculate the total based on the new quantity and unitPrice
    const total = newQuantity * unitPrice;
    setUnitPrice(total);
  };

  return (
    <form>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "30px",
          marginTop:'30px'
        }}
      >
        <Stack
          flexDirection="column"
          sx={{ width: "50%", marginBottom: "20px" }}
        >
          <Box>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (newValue) {
                  //   console.log(newValue);
                  setMarkup(parseFloat(newValue.markup));
                  setCost(parseFloat(newValue.cost));
                  setSelectedItem(newValue);
                }

                if (typeof newValue === "string") {
                  setValue({
                    name: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValue({
                    name: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const { inputValue } = params;
                // console.log(params)
                const filtered = options.filter((option) =>
                  option.item_name
                    .toLowerCase()
                    .includes(inputValue.toLowerCase())
                );

                console.log(inputValue);
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) =>
                    inputValue.toLowerCase() === option.item_name.toLowerCase()
                );
                console.log(isExisting);
                // if (inputValue !== "" && !isExisting) {
                // Inside the filterOptions function:
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    name: inputValue,
                    isCustom: true,
                    cost: 0, // Set a default cost value for custom options
                    markup: 0, // Set a default markup value for custom options
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={items}
              // getOptionLabel={(option) => {
              //   // console.log(option);
              //   // Value selected with enter, right from the input
              //   if (typeof option === "string") {
              //     return option;
              //   } else if (option.inputValue) {
              //     return option.inputValue;
              //   } else{

              //     return option.item_name;
              //   }
              //   // Regular option
              // }}

              //returning an option label
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                } else if (option.inputValue) {
                  return option.inputValue;
                } else {
                  return option.item_name || ""; // Make sure it always returns a string
                }
              }}
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "8px",
                  }} // Add this style
                >
                  {option.isCustom ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "90px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="subtitle1">
                        Would you like to add this new item?
                      </Typography>
                      <button
                        onClick={() => {
                          const createNew = true;

                          // Add your custom logic here for handling the button click
                        }}
                      >
                        Add to Services
                      </button>
                    </div>
                  ) : (
                    <React.Fragment>
                      <div style={{ display: "flex", width: "100%" }}>
                        <div style={{ flex: 1, width: "100%" }}>
                          <Typography variant="subtitle1">
                            {option.item_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {option.item_desc}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="subtitle1">
                            {option.cost}
                          </Typography>
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </li>
              )}
              sx={{ width: "100%" }}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search for Product/Service"
                  // variant="outlined"
                  fullWidth
                  //   sx={{width: '100%'}}
                  freeSolo
                  size="small"
                  onChange={handleInputChange}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: null, // Remove the clear (x) icon
                    startAdornment: null, // Remove the dropdown arrow
                  }}
                />
              )}
            />
          </Box>

          {/* <TextareaAutosize
            minRows={7} // You can adjust the number of rows as needed
            placeholder="Description"
            style={{ width: "100%", resize: "vertical" }}
            value={selectedItem ? selectedItem.item_desc : ""}
          /> */}

<TextField
            id="description"
            multiline
            placeholder="Note details"
            rows={4}
            fullWidth
            variant="outlined"
            value={selectedItem ? selectedItem.item_desc : ""}
            // onChange={handleNotes}
          />
        </Stack>

        {/* master box for the right side; quantity, price & item pricw */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <Typography variant="h6">Quantity</Typography>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                fullWidth
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <Box display="flex" flexDirection="column">
              <Typography variant="h6">Item Price</Typography>
              <CustomDropdown
                selectedServiceCost={cost}
                selectedServiceMarkup={markup}
                onCostChange={handleCostChange}
                onMarkupChange={handleMarkupChange}
                selectServiceId={selectedItem ? selectedItem.id : ""}
                onUnitPriceChange={handleCustomDropdownPriceChange}
              />
            </Box>
            <div>
              <Typography variant="h6">Price</Typography>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                value={
                  !isNaN(unitPrice) && !isNaN(quantity)
                    ? (quantity * unitPrice).toFixed(2)
                    : ""
                }
              />
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              // flexDirection: "row",
              justifyContent: "flex-end",
              gap: "20px",
            }}
          >
            {index > 0 && (
              <Button
                onClick={() => {
                  onDelete(index);
                }}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </Stack>
    </form>
  );
};

export default ServiceComp;
