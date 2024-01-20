/** @format */

import {
    Box,
    Button,
    Container,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popover,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

// import Iconify from "../components/iconify";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

import RatingContainer from "../components/rating/Rating";
import { fetchUserBudgets } from "../state/redux/actions/budget/updateUserBudgetsAction";
import { getUser } from "../state/redux/actions/users/getUser";
import CreateNewLineItem from "./CreateNewLineItem";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import MyDropdown from "../components/dropdown/DropDown";
import { storage } from "../components/firebase/firebase-config";
import Iconify from "../components/iconify";
import { addBudget } from "../state/redux/actions/budget/budgetActions";
import ClientDialog from "./ClientsDalog";
import CreateClient from "./CreateClient";
import ServiceComp from "./Service";
import { useServiceComps } from "../hooks/useServiceComps";

const AddBudget = () => {
    //  Helper Hooks
    const {
        serviceComps,
        setServiceComps,
        addServiceComp,
        updateServiceComp,
        deleteServiceComp,
    } = useServiceComps();

    // States
    const [servicesData, setServicesData] = useState([]);
    const [customSelectedItemIndex, setCustomSelectedItemIndex] = useState(0);
    const [customInputValue, setCustomInputValue] = useState("");
    const [ignore, setIgnore] = useState(false);

    // Others
    let ignorePop = false;

    // Functions
    // Update the servicedata on change
    const handleServiceDataChange = (data, index) => {
        setIgnore(false);
        console.log(data.selectedItem && data.selectedItem.isCustom);
        console.log(servicesData);
        if (
            data.selectedItem &&
            data.selectedItem.isCustom &&
            ignorePop === false
        ) {
            // Access isCustom property safely'
            setCustomInputValue(data.selectedItem.inputValue);
            setCustomSelectedItemIndex(parseInt(index));
            setIsDialogOpen(true);
        }

        // Use the functional form of setServicesData to ensure you have the latest state
        setServicesData((prevServicesData) => {
            // Find the index of the service data if it exists in the state
            const serviceIndex = prevServicesData.findIndex(
                (service) => service.index === index
            );
            console.log(serviceIndex);

            // If the service data exists, update it; otherwise, add it to the state
            if (serviceIndex !== -1) {
                const updatedServicesData = [...prevServicesData];
                updatedServicesData[serviceIndex] = data;
                return updatedServicesData;
            } else {
                return [...prevServicesData, data];
            }
        });
    };

    // console.log(servicesData);
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    // console.log(parsedUser);
    const user = useSelector((state) => state.login.user);
    // console.log(user.userId);
    const user_id = user.userId;
    const [dialogData, setDialogData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [quantity, setQuantity] = useState(1); // Initialize with a default quantity of 1
    const [customDropdownUnitPrice, setCustomDropdownUnitPrice] = useState(0);
    const [budgetSubTotal, setBudgetSubTotal] = useState(0);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [notes, setNotes] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const imageInputRef = useRef(null);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [budgetNumber, setBudgetNumber] = useState(0);
    const [tax, setTax] = useState(0);
    const [contacts, SetContacts] = useState([]);
    const [selectedClientName, setSelectedClientName] = useState("");

    // Service Comp
    const [serviceCount, setServiceCount] = useState(0);

    const [subtota, setSubtota] = useState(0);

    // const [status, setStatus] = useState("");
    // Add state for text field visibility
    const [isTextFieldVisible, setTextFieldVisible] = useState(false);
    const [isTaxEdit, setisTaxEdit] = useState(false);
    const [isDiscountEdit, setisDiscountEdit] = useState(false);

    const budgets = useSelector((state) => state.budgets.budgets);
    // console.log(budgets);
    // setBudgetNumber(budgets.legth)

    const items = useSelector((state) => state.items.items);
    const contactz = useSelector((state) => state.contacts.contacts);
    // console.log(contactz);

    useEffect(() => {
        SetContacts(contactz);
    }, [contactz]);

    // States for Dialog
    const [newService, setNewService] = useState({
        name: "",
        description: "",
        price: {
            cost: "",
            markup: "",
            unitPrice: "",
        },
        crew: "",
    });

    useEffect(() => {
        const newSubtota = servicesData.reduce((subtotal, serviceData) => {
            const { quantity, unitPrice } = serviceData;

            // Check if quantity and unitPrice are valid numbers
            if (!isNaN(quantity) && !isNaN(unitPrice)) {
                return subtotal + quantity * unitPrice;
            }

            // If either quantity or unitPrice is not a valid number, return subtotal unchanged
            return subtotal;
        }, 0);

        setBudgetSubTotal(newSubtota);
        // setTotal(new)

        console.log("new subtota:", newSubtota);
    }, [servicesData]);

    useEffect(() => {
        setTotal(budgetSubTotal);
    }, [budgetSubTotal]);

    const navigate = useNavigate();
    // const [budget, setBudget] = useState('');
    const dispatch = useDispatch();
    const [budgetData, setBudgetData] = useState({
        client: "",
        projectTitle: "",
        services: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        internalNotes: "",
        attachments: [],
        createdAt: "",
        userId: "",
        budgetId: uuidv4(),
        status: "",
        budgetNumber: 0,
    });
    const handleAddBudget = () => {
        if (selectedImage) {
            // console.log("Image Selected");
            const storageRef = ref(storage, `budgets/${selectedImage.name}`);
            // Upload the selected image
            uploadBytes(storageRef, selectedImage)
                .then((snapshot) => {
                    // File uploaded successfully, get the download URL
                    getDownloadURL(snapshot.ref)
                        .then((downloadURL) => {
                            const serviceArray = servicesData.map((service) => {
                                const unitPrice = parseFloat(service.unitPrice);
                                const quantity = parseFloat(service.quantity);
                                const markupPercentage = parseFloat(
                                    service.selectedItem?.markup
                                        ? service.selectedItem?.markup
                                        : service.markup
                                );

                                const cost =
                                    unitPrice * quantity +
                                    (unitPrice * quantity * markupPercentage) /
                                        100;

                                return {
                                    id: uuidv4(),
                                    name: service.selectedItem.item_name
                                        ? service.selectedItem.item_name
                                        : service.name,
                                    description: service.selectedItem.item_desc
                                        ? service.selectedItem.item_desc
                                        : service.description,
                                    cost: cost,
                                    markup: markupPercentage,
                                    unitPrice: unitPrice,
                                    quantity: quantity,
                                    userId: user_id,
                                    budgetId: budgetData.budgetId,
                                    createdAt: new Date().toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    ),
                                    item_rate: "",
                                };
                            });

                            const newBudget = {
                                client: selectedClient?.company_name,
                                projectTitle: budgetData.projectTitle,
                                services: budgetData.services,
                                subtotal: budgetSubTotal,
                                discount: discount,
                                tax: tax,
                                total: total,
                                internalNotes: budgetData.internalNotes,
                                // attachments: budgetData.attachments,
                                createdAt: new Date().toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                ),
                                userId: user_id,
                                budgetId: budgetData.budgetId,
                                status: "draft",
                                attachmentsUrl: downloadURL,
                                budgetNumber: budgetNumber,
                                clientName: selectedClientName,
                                serviceData: serviceArray,
                            };
                            console.log(newBudget);

                            // Dispatch the new budget tothe Redux store
                            dispatch(addBudget(newBudget))
                                .then((res) => {
                                    dispatch(fetchUserBudgets(user_id))
                                        .then(() => {
                                            dispatch(getUser(user_id));
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            //Navigate to Home Page
                            navigate("/");
                        })
                        .catch((error) => {
                            console.error("Error getting download URL:", error);
                            // Handle the error appropriately
                        });
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                    // Handle the error appropriately
                });
        } else {
            console.error("No selected image to upload.");
            // Handle the case where no image is selected
            // Create an array of service objects
            console.log({servicesData})
            alert("")
            const serviceArray = servicesData.map((service) => {
                const unitPrice = parseFloat(service.unitPrice);
                const quantity = parseFloat(service.quantity);
                const markupPercentage = parseFloat(
                    service.selectedItem?.markup || service.markup
                );

                // Calculate the cost based on unitPrice, quantity, and markup percentage
                const cost =
                    unitPrice * quantity +
                    (unitPrice * quantity * markupPercentage) / 100;

                return {
                    id: uuidv4(),
                    name: service.selectedItem?.item_name || service.name,
                    description:
                        service.selectedItem?.item_desc || service.description,
                    cost: cost,
                    markup: markupPercentage,
                    unitPrice: unitPrice,
                    quantity: quantity,
                    userId: user_id,
                    budgetId: budgetData.budgetId,
                    createdAt: new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }),
                    item_rate: "",
                };
            });

            const newBudget = {
                client: selectedClient?.company_name,
                projectTitle: budgetData.projectTitle,
                services: budgetData.services,
                subtotal: budgetSubTotal,
                discount: discount,
                tax: tax,
                total: total,
                internalNotes: budgetData.internalNotes,
                // attachments: budgetData.attachments,
                createdAt: new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }),
                userId: user_id,
                budgetId: budgetData.budgetId,
                status: "draft",
                attachmentsUrl: "",
                budgetNumber: budgetNumber,
                clientName: selectedClientName,
                serviceData: serviceArray,
            };
            console.log(newBudget);

            // Dispatch the new budget tothe Redux store
            dispatch(addBudget(newBudget))
                .then((res) => {
                    dispatch(fetchUserBudgets(user_id))
                        .then(() => {
                            dispatch(getUser(user_id));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });

            //Navigate to Home Page
            navigate("/");
        }
    };

    const handleAddBudgetActive = () => {
        // Create the budget object
        // console.log(budgetData.client);
        // Logic for budget & image Upload
        if (selectedImage) {
            // console.log("Image Selected");
            const storageRef = ref(storage, `budgets/${selectedImage.name}`);

            // Upload the selected image
            uploadBytes(storageRef, selectedImage)
                .then((snapshot) => {
                    // File uploaded successfully, get the download URL
                    getDownloadURL(snapshot.ref)
                        .then((downloadURL) => {
                            // Use the downloadURL as needed, for example, you can save it to your database
                            // console.log("Download URL:", downloadURL);

                            // Your code to use the downloadURL
                            // ...
                            // Create an array of service objects
                            const serviceArray = servicesData.map((service) => {
                                const unitPrice = parseFloat(service.unitPrice);
                                const quantity = parseFloat(service.quantity);
                                const markupPercentage = parseFloat(
                                    service.selectedItem.markup
                                        ? service.selectedItem.markup
                                        : service.markup
                                );

                                // Calculate the cost based on unitPrice, quantity, and markup percentage
                                const cost =
                                    unitPrice * quantity +
                                    (unitPrice * quantity * markupPercentage) /
                                        100;

                                return {
                                    id: uuidv4(),
                                    name: service.selectedItem.item_name
                                        ? service.selectedItem.item_name
                                        : service.name,
                                    description: service.selectedItem.item_desc
                                        ? service.selectedItem.item_desc
                                        : service.description,
                                    cost: cost,
                                    markup: markupPercentage,
                                    unitPrice: unitPrice,
                                    quantity: quantity,
                                    userId: user_id,
                                    budgetId: budgetData.budgetId,
                                    createdAt: new Date().toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    ),
                                    item_rate: "",
                                };
                            });

                            const newBudget = {
                                client: selectedClient?.company_name,
                                projectTitle: budgetData.projectTitle,
                                services: budgetData.services,
                                subtotal: budgetSubTotal,
                                discount: discount,
                                tax: tax,
                                total: total,
                                internalNotes: budgetData.internalNotes,
                                // attachments: budgetData.attachments,
                                createdAt: new Date().toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                ),
                                userId: user_id,
                                budgetId: budgetData.budgetId,
                                status: "active",
                                attachmentsUrl: downloadURL,
                                budgetNumber: budgetNumber,
                                clientName: selectedClientName,
                                serviceData: serviceArray,
                            };
                            console.log(newBudget);

                            // Dispatch the new budget tothe Redux store
                            dispatch(addBudget(newBudget))
                                .then((res) => {
                                    dispatch(fetchUserBudgets(user_id))
                                        .then(() => {
                                            dispatch(getUser(user_id));
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            console.log(servicesData);

                            //Navigate to Home Page
                            navigate("/");
                        })
                        .catch((error) => {
                            console.error("Error getting download URL:", error);
                            // Handle the error appropriately
                        });
                })
                .catch((error) => {
                    console.error("Error uploading image:", error);
                    // Handle the error appropriately
                });
        } else {
            console.error("No selected image to upload.");
            // Handle the case where no image is selected
            // Create an array of service objects
            const serviceArray = servicesData.map((service) => {
                const unitPrice = parseFloat(service.unitPrice);
                const quantity = parseFloat(service.quantity);
                const markupPercentage = parseFloat(
                    service.selectedItem.markup
                        ? service.selectedItem.markup
                        : service.markup
                );

                // Calculate the cost based on unitPrice, quantity, and markup percentage
                const cost =
                    unitPrice * quantity +
                    (unitPrice * quantity * markupPercentage) / 100;

                return {
                    id: uuidv4(),
                    name: service.selectedItem.item_name
                        ? service.selectedItem.item_name
                        : service.name,
                    description: service.selectedItem.item_desc
                        ? service.selectedItem.item_desc
                        : service.description,
                    cost: cost,
                    markup: markupPercentage,
                    unitPrice: unitPrice,
                    quantity: quantity,
                    userId: user_id,
                    budgetId: budgetData.budgetId,
                    createdAt: new Date().toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    }),
                    item_rate: "",
                };
            });

            const newBudget = {
                client: selectedClient?.company_name,
                projectTitle: budgetData.projectTitle,
                services: budgetData.services,
                subtotal: budgetSubTotal,
                discount: discount,
                tax: tax,
                total: total,
                internalNotes: budgetData.internalNotes,
                // attachments: budgetData.attachments,
                createdAt: new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }),
                userId: user_id,
                budgetId: budgetData.budgetId,
                status: "active",
                attachmentsUrl: "",
                budgetNumber: budgetNumber,
                clientName: selectedClientName,
                serviceData: serviceArray,
            };
            console.log(newBudget);

            // Dispatch the new budget tothe Redux store
            dispatch(addBudget(newBudget))
                .then((res) => {
                    dispatch(fetchUserBudgets(user_id))
                        .then(() => {
                            dispatch(getUser(user_id));
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
            console.log(budgetData);

            //Navigate to Home Page
            navigate("/");
        }
    };

    // Function to toggle text field visibility
    const toggleTextFieldVisibility = () => {
        setTextFieldVisible(!isTextFieldVisible);
    };
    // Function to toggle text field visibility
    const toggleTaxEdit = () => {
        setisTaxEdit(!isTaxEdit);
    };
    // Function to toggle text field visibility
    const toggleDiscountEdit = () => {
        setisDiscountEdit(!isDiscountEdit);
    };

    const handleDialogData = (data) => {
        setIgnore(true);
        ignorePop = true;
        // setDialogData(data)
        console.log(data.index);
        console.log(servicesData);

        const newData = {
            index: data.index,
            quantity: data.quantity,
            selectedItem: {
                item_name: data.name,
                markup: data.markup,
                item_desc: data.description,
            },
            unitPrice: data.unitPrice,
            cost: data.cost,
        };

        // deleteServiceComp(newData.index)
        // addServiceComp(newData);

        // Find the index of the ServiceComp to be modified in the serviceComps array
        const serviceCompIndex = serviceComps.findIndex(
            (serviceComp) => serviceComp.props.index === data.index
        );

        if (serviceCompIndex !== -1) {
            // Create the updated ServiceComp with the new data

            const updatedServiceComp = (
                <ServiceComp
                    key={data.index}
                    index={data.index}
                    onDelete={deleteServiceComp}
                    updateServiceComp={updateServiceComp}
                    onChange={handleServiceDataChange}
                    data={newData}
                />
            );

            // Create a copy of the serviceComps array and replace the old ServiceComp with the updated one
            const updatedServiceComps = [...serviceComps];
            updatedServiceComps[serviceCompIndex] = updatedServiceComp;

            // Set the state with the updated serviceComps array
            setServiceComps(updatedServiceComps);
        }
        if (data.name && data.description && data.index) {
            setServicesData((prevServicesData) => {
                // Find the index of the service data if it exists in the state
                const serviceIndex = prevServicesData.findIndex(
                    (service) => service.index === data.index
                );
                console.log("indi " + serviceIndex);

                const newData = {
                    index: data.index,
                    quantity: data.quantity,
                    selectedItem: {
                        item_name: data.name,
                        markup: data.markup,
                        item_desc: data.description,
                    },
                    unitPrice: data.unitPrice,
                };

                // If the service data exists, update it; otherwise, add it to the state
                if (serviceIndex !== -1) {
                    const updatedServicesData = [...prevServicesData];
                    console.log(updatedServicesData);
                    updatedServicesData[serviceIndex] = newData;
                    console.log(updatedServicesData);
                    return updatedServicesData;
                }
            });
        }

        if (data.name && data.description) {
            setDialogData((prevData) => [...prevData, data]);

            // Update the services array in budgetData
            setBudgetData((prevBudgetData) => ({
                ...prevBudgetData,
                services: [...prevBudgetData.services, data],
            }));
        }

        if (data.createClient) {
            setOpenClientsBox(false);
            setcreateClientOpen(true);
        } else {
            setcreateClientOpen(false);
        }

        setIsDialogOpen(false);
        setOpenClientsBox(false);
    };

    //new handledialogdatafunction

    // const handleDialogData = (data) => {
    //   console.log(data);

    //   if (data.name && data.description && data.index) {
    //     setServicesData((prevServicesData) => {
    //       const newData = {
    //         index: data.index,
    //         quantity: data.quantity,
    //         selectedItem: {
    //           item_name: data.name,
    //           markup: data.markup,
    //           item_desc: data.description,
    //         },
    //         unitPrice: data.unitPrice,
    //       };

    //       // Update the servicesData array with the new data
    //       // const updatedServicesData = prevServicesData.map((service) =>
    //       //   service.index === data.index ? newData : service
    //       // );

    //       // return updatedServicesData;
    //       handleServiceDataChange(newData, newData.index)
    //     });
    //   }

    //   if (data.name && data.description) {
    //     setDialogData((prevData) => [...prevData, data]);

    //     // Update the services array in budgetData
    //     setBudgetData((prevBudgetData) => ({
    //       ...prevBudgetData,
    //       services: [...prevBudgetData.services, data],
    //     }));
    //   }

    //   if (data.createClient) {
    //     setOpenClientsBox(false);
    //     setcreateClientOpen(true);
    //   } else {
    //     setcreateClientOpen(false);
    //   }

    //   setIsDialogOpen(false);
    //   setOpenClientsBox(false);
    // };

    const handleNotes = (e) => {
        setNotes(e.target.value);
        setBudgetData((prevBudgetData) => ({
            ...prevBudgetData,
            internalNotes: e.target.value,
        }));
    };

    //follow up for case where service options reset to default values when the selected option is changed

    // useEffect(() => {
    //   const subtotal = dialogData.reduce((sum, item) => sum + item.unitPrice, 0);
    //   setBudgetSubTotal(subtotal);
    //   setCustomDropdownUnitPrice(customDropdownUnitPrice);
    // }, [dialogData]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownOpen = () => {
        setIsDropdownOpen(true);
    };
    const handleDropdownClose = () => {
        setIsDropdownOpen(false);
    };

    // const handleDiscountChange = (event) => {
    //   const newDiscount = parseFloat(event.target.value);
    //   if (!isNaN(newDiscount)) {
    //     setDiscount(newDiscount);
    //   } else {
    //     setDiscount(0); // Set discount to 0 if the input is not a valid number
    //   }
    // };

    const handleBudgetNumberCahange = (event) => {
        const newNumber = parseInt(event.target.value);
        setBudgetNumber(event.target.value);
        setBudgetData((prevBudgetData) => ({
            ...prevBudgetData,
            budgetNumber: newNumber,
        }));
    };

    // console.log("BugNum: " + budgetNumber);

    const handleTaxChange = (event) => {
        // console.log("TaxValue: " + event.target.value);
        const newTax = parseFloat(event.target.value);
        if (!isNaN(newTax)) {
            setTax(newTax);
        } else {
            setTax(0); // Set tax to 0 if the input is not a valid number
        }
        // setTax(newTax);

        // // Recalculate the total based on the new tax
        // const subtotal = budgetSubTotal;
        // const taxAmount = (subtotal * newTax) / 100;
        // const discountAmount = (subtotal * discount) / 100;
        // const total = subtotal + taxAmount - discountAmount;

        // setTotal(total.toFixed(2));
    };

    useEffect(() => {
        // Calculate the total with discount and tax percentage
        const discountAmount = (budgetSubTotal * discount) / 100;
        const taxAmount = (budgetSubTotal - discountAmount) * (tax / 100);
        let newTotal = budgetSubTotal - discountAmount + taxAmount;

        // Ensure the total is never negative
        if (newTotal < 0) {
            newTotal = 0;
        }

        // Ensure the total is never negative
        if (!isNaN(newTotal) && newTotal >= 0) {
            setTotal(parseFloat(newTotal.toFixed(2)));
        } else {
            setTotal(0);
        }

        setBudgetData((prevBudgetData) => ({
            ...prevBudgetData,
            discount: discount,
            tax: tax,
            total: total,
        }));
    }, [discount, tax]);

    const handleCustomDropdownPriceChange = (id, newPrice) => {
        setCustomDropdownUnitPrice(newPrice);
        // const index = dialogData.findIndex(item => item.id === id);
        //   setDialogData((prevData)=>[...prevData, dialogData[index].unitPrice = newPrice])

        const updatedDialogData = dialogData.map((item) => {
            if (item.id === id) {
                return { ...item, unitPrice: customDropdownUnitPrice };
            }
            return item;
        });

        // Update the state with the new dialogData
        setDialogData(updatedDialogData);
    };

    const [options, setOptions] = useState([]);

    const handleDialogOpen = () => {
        setIsDialogOpen(true);
    };

    const [selectedOption, setSelectedOption] = useState({
        price: 0,
        cost: 0,
        markup: "",
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    //have to handle option showing error screen at first select***

    const handleServiceOptionSelect = (id, unitPrice, cost, markup) => {
        setSelectedService({ id, unitPrice, cost, markup }); // Store the selected service's data
        // console.log(selectedService.unitPrice);
        setSelectedOption({ id, unitPrice, cost, markup });
        // console.log(selectedOption.id);
        // console.log(`Dropdown act: ${selectedOption.unitPrice}`);
        setQuantity(1);
    };

    const handleCostChange = (id, newCost) => {
        const index = dialogData.findIndex((item) => item.id === id);
        dialogData[index].cost = newCost;

        setNewService((prevService) => ({
            ...prevService,
            price: newCost,
        }));
    };

    const handleMarkupChange = (newMarkup) => {
        setNewService((prevService) => ({
            ...prevService,
            markup: newMarkup,
        }));
    };

    const statusOptions = [
        "Draft",
        "Awaitingresponse",
        "Approved",
        "Changesrequested",
        "Converted",
        "Archived",
    ];

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "popover" : undefined;

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    };

    const handleSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
        // console.log(selectedFiles);

        // Update the budgetData with the new attachments
        setBudgetData((prevBudgetData) => ({
            ...prevBudgetData,
            attachments: [...prevBudgetData.attachments, ...files],
        }));
    };

    const [openClientsBox, setOpenClientsBox] = useState(false);
    const [createClientOpen, setcreateClientOpen] = useState(false);

    const handleOpenBox = () => {
        setOpenClientsBox(true);
    };
    // const handleOpenClient = () => {
    //   setcreateClientOpen(true);
    // };

    const handleCloseBox = () => {
        setOpenClientsBox(false);
    };

    const boxClientName = "";

    const [selectedClient, setSelectedClient] = useState(null);

    const handleClientSelect = (clientData) => {
        // Handle the selected client data here
        // console.log("Selected Client Data:", clientData);
        setSelectedClient(clientData); // You can update the parent's state with the selected client data
        setOpenClientsBox(false);
    };

    return (
        <form>
            <Box>
                <Typography variant="h4" gutterBottom sx={{ marginLeft: 3 }}>
                    New Budget
                </Typography>
            </Box>

            {/* Input Boxes */}
            <Stack
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    marginBottom: "40px",
                    mt: 7,
                    padding: "20px",
                }}
            >
                {/* ... Textfields Container ... */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        marginLeft: 0,
                    }}
                >
                    {/* <div style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
            <Typography sx={{fontSize:'34px', fontWeight: 'Bold'}}>Budget for <span onClick={handleOpenBox} style={{ cursor: 'pointer', textDecoration: 'underline', fontSize:'34px', fontWeight: 'Bold' }}>
        {boxClientName?boxClientName:'Client Name'}<Iconify icon={"icon-park-solid:add"} sx={{color: '#00A805FF', width: '64px', height: '64px'}} />
      </span></Typography>
          
          </div> */}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            alignItems: "center",
                            width: "100%",
                            // backgroundColor: "#000",
                        }}
                    >
                        <Typography
                            sx={{ fontSize: "34px", fontWeight: "Bold" }}
                        >
                            Budget for
                        </Typography>

                        <span
                            onClick={handleOpenBox}
                            style={{
                                display: "flex",
                                flexDirection: "row", // Allow for stacking text and icon vertically
                                alignItems: "center",
                                cursor: "pointer",
                                // textDecoration: "underline",
                                fontSize: "34px",
                                fontWeight: "Bold",
                                gap: "8px",
                                marginLeft: "10px",
                                position: "relative",
                                whiteSpace: "nowrap", // Add relative positioning to the span
                            }}
                        >
                            {/* <Typography>{boxClientName ? boxClientName : "Client Name"}</Typography> */}
                            {selectedClient ? (
                                selectedClient?.company_name || "Client Name"
                            ) : (
                                <>
                                    Client Name
                                    <Iconify
                                        icon={"icon-park-solid:add"}
                                        sx={{
                                            color: "#25252DFF",
                                            width: "64px",
                                            height: "64px",
                                        }}
                                    />
                                </>
                            )}
                            {/* Add a dotted line under the text and icon */}
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    width: "100%",
                                    border: "1px dotted #000", // Adjust the border style as needed
                                }}
                            ></div>
                        </span>
                    </div>

                    <Box sx={{ marginLeft: 0, marginTop: 2 }}>
                        <Typography variant="h5">Contact Name</Typography>
                        {selectedClient ? (
                            <MyDropdown
                                options={contacts.map(
                                    (contact) => contact.contact_name
                                )}
                                onChange={(data) => {
                                    setSelectedClientName(data);
                                    console.log(selectedClientName);
                                }}
                            />
                        ) : (
                            <Typography variant="p">
                                Please Choose a Company First
                            </Typography>
                        )}

                        <Typography variant="h5">Project Title</Typography>
                        <TextField
                            id="filled-textarea"
                            // label="Full Name"
                            placeholder="Title"
                            size="medium"
                            multiline
                            sx={{
                                width: "100%",
                                "& .MuiFilledInput-root": {
                                    border: "1px solid #000",
                                    borderRadius: "4px",
                                    marginBottom: 0,
                                },
                            }}
                            variant="outlined"
                            InputProps={{ disableUnderline: true }}
                            value={budgetData.projectTitle}
                            onChange={(e) =>
                                setBudgetData({
                                    ...budgetData,
                                    projectTitle: e.target.value,
                                })
                            }
                        />
                    </Box>
                </Box>

                <Container>
                    <Typography
                        variant="p"
                        gutterBottom
                        sx={{ marginLeft: 3, marginBottom: 10 }}
                    >
                        Budget details
                    </Typography>

                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 2,
                        }}
                    >
                        <Typography variant="p" gutterBottom>
                            Budget number
                        </Typography>

                        {isTextFieldVisible ? (
                            <TextField
                                placeholder="1"
                                size="small"
                                type="number"
                                value={budgetNumber}
                                onChange={handleBudgetNumberCahange}
                                // ... (other props)
                            />
                        ) : (
                            <Typography variant="p" gutterBottom>
                                #{budgets.length + 1}
                            </Typography>
                        )}

                        <Button
                            variant="text"
                            onClick={toggleTextFieldVisibility}
                        >
                            Change
                        </Button>
                    </Container>

                    {/* ... Rating container ... */}
                    <Container
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        <Typography
                            variant="p"
                            gutterBottom
                            sx={{ width: "100%" }}
                        >
                            Rate opportunity
                        </Typography>

                        <Container>
                            <RatingContainer />
                        </Container>
                    </Container>

                    {/* ... Button for the add custom field ... */}

                    {/* <Container sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ borderColor: "#E05858FF", color: "#E05858FF" }}
            >
              Add Custom Field
            </Button>
          </Container> */}
                </Container>
            </Stack>

            <Stack
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    gap: "40px",
                    padding: "20px",
                }}
            >
                <Box sx={{ mt: 1, width: "100%" }}>
                    <Typography variant="p" sx={{}}>
                        PRODUCT/SERVICE
                    </Typography>
                    <Box>
                        {serviceComps.map((data, index) => (
                            <div key={index}>
                                <ServiceComp
                                    index={index}
                                    updateServiceComp={updateServiceComp}
                                    onDelete={deleteServiceComp}
                                    onChange={handleServiceDataChange}
                                    data={data}
                                />
                            </div>
                        ))}
                    </Box>
                    <Button
                        variant="filled"
                        sx={{
                            backgroundColor: "#E05858FF",
                            color: "#fff",
                            mt: 2,
                        }}
                        onClick={addServiceComp}
                    >
                        + Add Line Item
                    </Button>

                    <CreateNewLineItem
                        openDialog={isDialogOpen}
                        onClose={handleDialogData}
                        index={customSelectedItemIndex}
                        inputValue={customInputValue}
                    />
                </Box>
            </Stack>

            <Container
                sx={{
                    display: "flex",
                    width: "100%",
                    padding: "10px",
                    alignItems: "end",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                        marginBottom: "30px",
                        alignItems: "center",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                    }}
                >
                    <Typography variant="body1">Subtotal</Typography>
                    <Typography variant="body1">{`$${budgetSubTotal}`}</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                        marginBottom: "30px",
                        alignItems: "center",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                    }}
                >
                    <Typography variant="body1">Discount%</Typography>
                    {isDiscountEdit ? (
                        <Stack display="flex" flexDirection="row">
                            <TextField
                                placeholder="0"
                                size="small"
                                type="number"
                                // type="number"
                                value={discount}
                                // size="small"
                                // onChange={handleDiscountChange}
                                onChange={(e) => {
                                    setDiscount(e.target.value);
                                }}
                                variant="outlined"
                                style={{}}
                                // ... (other props)
                            />
                            <IconButton onClick={toggleDiscountEdit}>
                                <Iconify icon="material-symbols:delete-outline" />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Stack>
                            <Button variant="text" onClick={toggleDiscountEdit}>
                                Add Discount
                            </Button>
                        </Stack>
                    )}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                        marginBottom: "30px",
                        alignItems: "center",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                    }}
                >
                    <Typography variant="body1">Tax%</Typography>
                    {isTaxEdit ? (
                        <Stack display="flex" flexDirection="row">
                            <TextField
                                placeholder="0"
                                size="small"
                                type="number"
                                // type="number"
                                value={tax}
                                // size="small"
                                // onChange={handleTaxChange}
                                onChange={(e) => {
                                    setTax(e.target.value);
                                }}
                                variant="outlined"
                                style={{}}
                                // ... (other props)
                            />
                            <IconButton onClick={toggleTaxEdit}>
                                <Iconify icon="material-symbols:delete-outline" />
                            </IconButton>
                        </Stack>
                    ) : (
                        <Stack>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={toggleTaxEdit}
                            >
                                Add Tax
                            </Button>
                        </Stack>
                    )}
                </Box>

                {/* Right Column */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "30%",
                        marginBottom: "30px",
                        alignItems: "center",
                        paddingBottom: "10px",
                    }}
                >
                    <Typography variant="body1">Total</Typography>

                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        ${total}
                    </Typography>
                </Box>
            </Container>

            <Container sx={{ padding: "20px", mt: 20 }}>
                <Typography
                    variant="h3"
                    sx={{ marginBottom: "10px", marginTop: "30px" }}
                >
                    Internal notes & attachments @
                </Typography>

                {/* Internal Notes */}
                <Box sx={{ marginBottom: "20px" }}>
                    <TextField
                        id="note-details"
                        multiline
                        placeholder="Note details"
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={budgetData.internalNotes}
                        onChange={handleNotes}
                    />
                </Box>

                {/* File Upload Section */}
                <Paper
                    elevation={3}
                    sx={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Container
                        // justifyContent="center"
                        // alignItems="center"
                        // flexDirection="column"
                        sx={{ marginTop: "0", marginBottom: "50px" }}
                    >
                        {/* <Typography variant="p" sx={{ marginBottom: "30px", marginRight: '20px' }}>
                Receipt
              </Typography> */}
                    </Container>
                    <Box
                        sx={{
                            marginBottom: "10px",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "row",
                            // eslint-disable-next-line no-dupe-keys
                            // textAlign: "center",
                            // justifyContent: "center",
                        }}
                    >
                        <div style={{ width: "100%" }}>
                            <Paper
                                // className={classes.dropArea}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                            >
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{
                                        backgroundColor: "#E05858FF",
                                        color: "#fff",
                                        borderRadius: "3px",
                                        width: "80%",
                                    }}
                                >
                                    Upload Files
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{
                                            display: "none",
                                        }}
                                        ref={imageInputRef}
                                    />
                                </Button>
                                {selectedImage && (
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                        style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                        }}
                                    />
                                )}
                                {/* </label> */}
                                <p>or</p>
                                <p>Drag and drop files here</p>
                            </Paper>
                            <ul>
                                {selectedFiles.map((file) => (
                                    <li key={file.name}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    </Box>
                </Paper>
            </Container>

            <Container
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    // gap: "150px",
                    width: "100%",
                    padding: "10px",
                    gap: "20px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "20px",
                    }}
                >
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="outlined" onClick={handleAddBudget}>
                        Save Draft
                    </Button>
                    <Button
                        aria-describedby={id}
                        sx={{
                            backgroundColor: "#E05858FF",
                            color: "#fff",
                            borderRadius: "3px",
                        }}
                        variant="filled"
                        endIcon={<ExpandMoreIcon />}
                        onClick={handleClick}
                        // onClick={handleAddBudget}
                    >
                        Save And...
                    </Button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <List>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Iconify icon={"iwwa:file-pdf"} />
                                </ListItemIcon>
                                <ListItemText primary="Save PDF" />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Iconify
                                        icon={"mdi-light:grid"}
                                        sx={{ color: "#1DD75BFF" }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Send to Google Sheets" />
                            </ListItemButton>
                            <ListItemButton onClick={handleAddBudgetActive}>
                                <ListItemIcon>
                                    <Iconify
                                        icon={"carbon:checkmark-outline"}
                                        sx={{ color: "#00A805FF" }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Convert to Active" />
                            </ListItemButton>
                        </List>
                    </Popover>
                </Box>
            </Container>

            <CreateClient
                openDialog={createClientOpen}
                onClose={handleDialogData}
            />
            <ClientDialog
                openDialog={openClientsBox}
                onClose={handleDialogData}
                onClientSelect={handleClientSelect}
            />
        </form>
    );
};

export default AddBudget;
