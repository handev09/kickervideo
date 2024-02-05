import {
    Autocomplete,
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

import {useSelector} from "react-redux";
import CustomDropdown from "../components/item-price-dropdown/DropDown";

const ServiceComp = ({
                         onDelete,
                         onChange,
                         index,
                         data,
                         updateServiceComp,
                     }) => {
    // Selectors
    const items = useSelector((state) => state.items.items);

    const {
        total = 0,
        quantity = 1,
        serviceId = "",
        unitPrice = 0,
        cost = data.cost || 0,
        selectedItem: selectedItemFromData,
        markup = data?.selectedItem?.markup || 0,
        value = data.selectedItem?.item_name || "",
    } = data;
    const selectedItem = typeof value === "object" ? data.value : selectedItemFromData;

    // Functions
    // Universal update function
    function update(properties) {
        updateServiceComp(index, {
            ...data,
            ...properties,
        });
        onChange(
            {
                serviceId,
                selectedItem: {...selectedItem, isCustom: properties?.selectedItem?.isCustom},
                quantity: properties.quantity ?? quantity,
                unitPrice: properties.unitPrice ?? unitPrice,
                index,
                total,
            },
            index
        );
    }

    const handleInputChange = (event, value) => {
        // console.log("handleInputChange");
        // console.log(value);
    };

    const handleCostChange = (cost = 0) => {
        update({cost});
    };
    const handleMarkupChange = (markup = "") => {
        if (markup) update({markup});
    };
    const handleCustomDropdownPriceChange = (unitPrice) => {
        update({unitPrice});
    };

    const handleQuantityChange = (event) => {
        const quantity = parseInt(event.target.value);
        // - We only need to update quantity beacuse inside DropDown
        //  we calculate the total based on the new quantity and unitPrice
        update({quantity});
    };

    return (
        <form>
            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "30px",
                    marginTop: "30px",
                }}
            >
                <Stack
                    flexDirection="column"
                    sx={{width: "50%", marginBottom: "20px"}}
                >
                    <Box>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                if (newValue) {
                                    update({
                                        markup: parseFloat(newValue?.markup),
                                        cost: parseFloat(newValue?.cost),
                                        selectedItem: newValue,
                                        serviceId: newValue?.item_id,
                                    });
                                }

                                if (typeof newValue === "string") {
                                    update({
                                        value: {
                                            ...value,
                                            name: newValue,
                                        },
                                    });
                                } else if (newValue && newValue?.inputValue) {
                                    // Create a new value from the user input
                                    update({
                                        value: {
                                            ...value,
                                            name: newValue.inputValue,
                                        },
                                    });
                                } else {
                                    // update({value: newValue});
                                }
                            }}
                            filterOptions={(options, params) => {
                                const {inputValue} = params;
                                // console.log(params)
                                const filtered = options.filter((option) =>
                                    option.item_name.toLowerCase().includes(inputValue.toLowerCase())
                                );

                                // Suggest the creation of a new value
                                const isExisting = options.some(
                                    (option) =>
                                        inputValue.toLowerCase() ===
                                        option.item_name.toLowerCase()
                                );
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
                                                Add to Items
                                            </button>
                                        </div>
                                    ) : (
                                        <React.Fragment>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    width: "100%",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Typography variant="subtitle1">
                                                        {option.item_name}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
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
                            sx={{width: "100%"}}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    autoFocus="false"
                                    {...params}
                                    label="Search for Product/Service"
                                    fullWidth
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

                    <TextField
                        id="description"
                        multiline
                        placeholder="Description"
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={selectedItem ? selectedItem?.item_desc : ""}
                        onChange={(value) =>
                            update({
                                selectedItem: {
                                    ...selectedItem,
                                    item_desc: value.target.value,
                                },
                            })
                        }
                    />
                </Stack>

                {/* master box for the right side; quantity, price & item pricw */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
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
                                selectServiceId={
                                    selectedItem?.selectedItem
                                        ? selectedItem?.selectedItem.id
                                        : ""
                                }
                                onUnitPriceChange={
                                    handleCustomDropdownPriceChange
                                }
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
                                        ? (unitPrice * quantity).toFixed(2)
                                        : ""
                                }
                            />
                        </div>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "20px",
                        }}
                    >
                        {index > 0 && (
                            <Button
                                onClick={() => {
                                    // console.log(data)
                                    onDelete(index, data.serviceId);
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
