import React, { useState, useEffect,useRef } from "react";
import {
  Typography,
  Container,
  Box,
  Divider,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack
} from "@mui/material";
import LoadingSpinner from "./loadingSpinner";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import Iconify from "../components/iconify";
import MyDropdown from "../components/dropdown/DropDown";
import {
    getDownloadURL,
    ref as storageRef,
    uploadBytes,
  } from "firebase/storage";
  import { storage } from "../components/firebase/firebase-config";
  import { useDispatch, useSelector } from "react-redux";
  import { updateCrew } from "../state/redux/actions/crew/update";

const CrewDetails = () => {
    // const [budget, setBudget] = useState('');
  const dispatch = useDispatch();
  const dropdownOptions = ["Hour", "Day", "Half Day", "Flat"];
  const [employmentType, setEmploymentType] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [role, setRole] = useState("");
  const [cost, setCost] = useState("");
  const [markup, setMarkup] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
const [contractType, setContractType]=useState("")
const [loading, setLoading]=useState(false)

const loggedInUser = useSelector((state) => state.login.user);
console.log(loggedInUser.userId);
const user_id = loggedInUser.userId;

  //old
  const [user, setUser] = useState(null);
  const { crewId } = useParams();

  const handleCostChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid number (either an integer or a decimal)
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === "") {
      setCost(value);
    }
  };

  const handleMarkupChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid integer
    setMarkup(value);
    // if (/^[0-9]*$/.test(value) || value === "") {
    // }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };



//   Update user function
  const handleUpdateUser = () => {
    setLoading(true)
    console.log("Image Selected True");

    if (selectedImage) {
      const imageRef = storageRef(storage, `images/${selectedImage.name}`);

      uploadBytes(imageRef, selectedImage)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              console.log("Image Uploaded Successfully");
              console.log(downloadURL);

              // Create the user object with the download URL
              const newUser = {
                crewId: crewId,
                fullName: fullName,
                phone: phone,
                email: email,
                address: address,
                street: street,
                state: state,
                city: city,
                zip: zip,
                role: role,
                contractType: contractType,
                cost: cost,
                markup: markup,
                unitPrice: unitPrice,
                userId: user_id,
                profileUrl: downloadURL, // Add the image URL
                employmentType: employmentType
              };
              console.log(newUser);

              // Dispatch the new user to the Redux store
              dispatch(updateCrew(crewId,newUser)).then(()=>{
                const fetchCrewDetail = async () => {
                    try {
                      // Replace this with your actual data fetching logic
                      const response = await fetch(
                        `http://localhost:3001/api/v1/crew/details?crewId=${crewId}`
                      );
                      const data = await response.json();
                      setUser(data[0]);
                      setEmploymentType(data[0].contract_type);
                      setFullName(data[0].name);
                      setPhone(data[0].phone_number);
                      setEmail(data[0].email);
                      setAddress(data[0].address);
                      setStreet(data[0].street);
                      setState(data[0].state);
                      setCity(data[0].city);
                      setZip(data[0].zip);
                      setRole(data[0].role);
                      setCost(data[0].cost);
                      setMarkup(data[0].markup);
                      setUnitPrice(data[0].unitPrice);
                    } catch (error) {
                      console.error("Error fetching client details:", error);
                    }
                  };

                  fetchCrewDetail() 
                  setEditProfile(false)
                  setLoading(false)
              })

              // Navigate to Home Page
            //   navigate("/dashboard/crew");
            })
            // .catch((error) => {
            //   console.error("Error getting download URL:", error);
            //   // Handle error, e.g., show an error message to the user
            // });
        })
        // .catch((error) => {
        //   console.error("Error uploading image:", error);
        //   // Handle error, e.g., show an error message to the user
        // });
    } else {
      // Handle the case where no image is selected
      console.log("No Image Selected");
      const newUser = {
        crewId: crewId,
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        street: street,
        state: state,
        city: city,
        zip: zip,
        role: role,
        contractType: contractType,
        cost: cost,
        markup: markup,
        unitPrice: unitPrice,
        userId: user_id,// Add the image URL
        employmentType: employmentType
      };

      // Dispatch the new user to the Redux store
      dispatch(updateCrew(crewId,newUser)).then(()=>{
        const fetchCrewDetail = async () => {
            try {
              // Replace this with your actual data fetching logic
              const response = await fetch(
                `http://localhost:3001/api/v1/crew/details?crewId=${crewId}`
              );
              const data = await response.json();
              setUser(data[0]);
              setEmploymentType(data[0].contract_type);
              setFullName(data[0].name);
              setPhone(data[0].phone_number);
              setEmail(data[0].email);
              setAddress(data[0].address);
              setStreet(data[0].street);
              setState(data[0].state);
              setCity(data[0].city);
              setZip(data[0].zip);
              setRole(data[0].role);
              setCost(data[0].cost);
              setMarkup(data[0].markup);
              setUnitPrice(data[0].unitPrice);
            } catch (error) {
              console.error("Error fetching client details:", error);
            }
          };

          fetchCrewDetail() 
          setEditProfile(false)
          setLoading(false)
      })
    //   dispatch(addUser(newUser)).then(()=>{
    //     dispatch(fetchUserCrew(user_id)).then(()=>{
    //     //   navigate("/dashboard/crew");
    //     }).catch((error)=>{
    //     console.error(error)
    //   })

    //   }).catch((error)=>{
    //     console.error(error)
    //   })

      // Navigate to Home Page
     
    }
  };

  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
  };



  useEffect(() => {
    if (cost && markup) {
      const calculatedUnitPrice =
        parseFloat(cost) + parseFloat(cost) * (parseFloat(markup) / 100);
      setUnitPrice(calculatedUnitPrice.toFixed(2)); // Round to 2 decimal places
    } else {
      setUnitPrice("");
    }
  }, [cost, markup]);

  // Replace this with actual client data fetching logic using the clientId
  useEffect(() => {
    // Fetch client details based on clientId (e.g., from an API or local data)
    const fetchCrewDetails = async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await fetch(
          `http://localhost:3001/api/v1/crew/details?crewId=${crewId}`
        );
        const data = await response.json();
        setUser(data[0]);
        setEmploymentType(data[0].contract_type);
        setFullName(data[0].name);
        setPhone(data[0].phone_number);
        setEmail(data[0].email);
        setAddress(data[0].address);
        setStreet(data[0].street);
        setState(data[0].state);
        setCity(data[0].city);
        setZip(data[0].zip);
        setRole(data[0].role);
        setCost(data[0].cost);
        setMarkup(data[0].markup);
        setUnitPrice(data[0].unitPrice);
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    // const fetchBudgetItems = async () => {
    //   try {
    //     // Replace this with your actual data fetching logic
    //     const response = await fetch(
    //       `https://kickervideoapi.vercel.app/api/v1/budget-items/fetch?budgetId=${budgetId}`
    //     );
    //     const data = await response.json();
    //     setBudgetItems(data);
    //   } catch (error) {
    //     console.error("Error fetching budget Items:", error);
    //   }
    // };

    fetchCrewDetails();
    // fetchBudgetItems();
  }, [crewId]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setContractType(option)
  };

  if (user === null) {
    // Render a loading spinner or other loading indicator
    return <LoadingSpinner />;
  }

  if(loading){
    return <LoadingSpinner />
  }


  return (
    <div>
      {/* Title */}

      {/* Top UserProfile title */}
      <Container
        sx={{
          direction: "row",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ marginBottom: "30px" }}>
          User Profile
        </Typography>
        <Button
          variant="contained"
          // component={Link}
          // to="/dashboard/addcrew"
          onClick={() => {
            if(editProfile){
                handleUpdateUser()

            } else{

                setEditProfile(true);
            }
          }}
          sx={{
            backgroundColor: "#E05858FF",
            transition: "opacity 0.3s ease-in-out", // Adding a transition for smooth effect
            "&:hover": {
              // opacity: 0.8, // Adjust the opacity value as needed
              backgroundColor: "#E05858FF",
            },
          }}
          // startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {editProfile?'Update Profile':'Edit Profile'}
        </Button>
      </Container>

      {
        editProfile ? (
          <>
            <FormControl
              component="fieldset"
              sx={{ width: "100%", marginBottom: "31px" }}
            >
              <RadioGroup
                aria-label="employmentType"
                name="employmentType"
                value={employmentType}
                  onChange={handleEmploymentTypeChange}
              >
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <Container
                    sx={{ border: "1px solid #000", p: 5, borderRadius: "8px" }}
                  >
                    <FormControlLabel
                      value="Full time"
                      control={<Radio />}
                      label="Full time"
                      sx={{ ml: 2, mr: 1, borderRadius: "8px" }}
                    />
                  </Container>

                  <Container
                    sx={{ border: "1px solid #000", p: 5, borderRadius: "8px" }}
                  >
                    <FormControlLabel
                      value="Part time"
                      control={<Radio />}
                      label="Part time"
                      sx={{ mr: 1, borderRadius: "8px" }}
                    />
                  </Container>

                  <Container
                    sx={{ border: "1px solid #000", p: 5, borderRadius: "8px" }}
                  >
                    <FormControlLabel
                      value="Freelancer / Contractor"
                      control={<Radio />}
                      label="Freelancer / Contractor"
                      sx={{ borderRadius: "8px" }}
                    />
                  </Container>
                </Container>
              </RadioGroup>
            </FormControl>

            <Container
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: "20px",
                //   maxWidth: '800px',
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Full name
                </Typography>
                <input
                  type="text"
                  placeholder="Full Name or company name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Phone
                </Typography>
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Address
                </Typography>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  placeholder="Address"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Street
                </Typography>
                <input
                  type="text"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  State / Province
                </Typography>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  placeholder="State / Province"
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  City
                </Typography>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Ward
                </Typography>
                <input
                  type="text"
                  placeholder="Zip / Postal Code"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>

              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Role
                </Typography>
                <input
                  type="text"
                  placeholder="ex: Developer"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#F3F4F6FF",
                    border: "1px solid transparent",
                    borderColor: "transparent",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Container>

            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 10,
                gap: "20px",
              }}
            >
              {/* ... Dropdown and input fields as before ... */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  RATE
                </Typography>
                <MyDropdown
                  options={dropdownOptions}
                  value={employmentType} // Set the value to your state
                  onChange={handleOptionChange}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1">COST</Typography>
                <TextField
                  placeholder="0.00"
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%" }}
                  value={cost}
                  type="number"
                  onChange={handleCostChange}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1">MARKUP</Typography>
                <TextField
                  placeholder="0.00"
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%" }}
                  value={markup}
                  onChange={handleMarkupChange}
                  type="number"
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  TOTAL
                </Typography>
                <TextField
                  placeholder="0.00"
                  variant="outlined"
                  size="small"
                  sx={{ width: "100%" }}
                  value={unitPrice}
                  type="number"
                />
              </Box>
            </Container>

            <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          display: "none",
        }}
        ref={imageInputRef}
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ marginTop: "20px", marginBottom: "50px" }}
      >
        <Typography variant="h4" sx={{ marginBottom: "30px" }}>
          Select Profile Image
        </Typography>

        <Button
          variant="contained"
          component="label"
          sx={{
            backgroundColor: "#E05858FF",
            color: "#fff",
            borderRadius: "3px",
          }}
        >
          Upload Image
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
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />
        )}
      </Stack>
          </>
        ) : (
          <>
            <Container>
              {/* Profile Image */}
              {user && user.profileUrl && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    // alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <img
                    src={user.profileUrl}
                    alt="Profile"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </Box>
              )}
            </Container>

            {/* User Details */}
            <Container>
              <Box
                sx={{
                  borderBottom: "solid 5px #E05858FF",
                  maxWidth: "25%",
                  marginBottom: "20px",
                  marginTop: "20px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#E05858FF" }}
                >
                  Profile Details
                </Typography>
              </Box>
            </Container>

            <Container
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                gap: "20px",
                //   maxWidth: '800px',
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Full name
                </Typography>
                <Typography variant="body1">{user.name}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Phone
                </Typography>
                <Typography variant="body1">{user.phone}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Address
                </Typography>
                <Typography variant="body1">{user.address}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Street
                </Typography>
                <Typography variant="body1">{user.street}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  State / Province
                </Typography>
                <Typography variant="body1">{user.state}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  City
                </Typography>
                <Typography variant="body1">{user.city}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Ward
                </Typography>
                <Typography variant="body1">{user.zip}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "30%" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Role
                </Typography>
                <Typography variant="body1">{user.role}</Typography>
              </Box>
            </Container>

            <Divider sx={{ mb: "25px", mt: "31px" }} />

            {/* Rate, Cost, Markup, and Total */}
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 10,
                gap: "20px",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  RATE
                </Typography>
                <Typography variant="body1">{user.contract_type}</Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1">COST</Typography>
                <Typography variant="body1">{user.cost}</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1">MARKUP</Typography>
                <Typography variant="body1">{user.markup}</Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  TOTAL
                </Typography>
                <Typography variant="body1">{user.unitPrice}</Typography>
              </Box>
            </Container>

            <Divider sx={{ mb: "25px", mt: "31px" }} />

            <Container
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "150px",
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
                <Button
                  variant="filled"
                  sx={{ backgroundColor: "#F3F4F6FF", color: "#565E6CFF" }}
                >
                  Back
                </Button>
                {/* You can add an edit button here if you want to allow users to edit their profile */}
              </Box>
            </Container>
          </>
        )

        // edit the display
      }
    </div>
  );
};

export default CrewDetails;
