import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// sections
// import SignupFormSection from "../sections/auth/signup/SignupForm"; // Rename the import statement to avoid naming conflict
// import { registerUser } from "../state/redux/actions/users/registerUser";

import { registerUser } from "../../../state/redux/actions/users/registerUser";
// @mui
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { loginRequest } from "../../../state/redux/actions/users/loginUser";
  // const isAuthenticated = useSelector((state) => state.login.isLoggedIn);
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from "@mui/material/CircularProgress"; 
// import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function SignupForm() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); 
  const isAuthenticated = useSelector((state) => state.login.isLoggedIn);
  const user = useSelector((state) => state.login.user);

   // Calculate subEnd date by adding seven days to subStart
   const currentDate = new Date();
   const subStartDate = currentDate.toLocaleDateString("en-US", {
     month: "long",
     day: "numeric",
     year: "numeric",
   });
 
   const subEndDate = new Date(currentDate);
   subEndDate.setDate(subEndDate.getDate() + 7);
   const subEndDateFormatted = subEndDate.toLocaleDateString("en-US", {
     month: "long",
     day: "numeric",
     year: "numeric",
   });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userId: uuidv4(),
    createdAt: subStartDate,
    subStart: subStartDate,
    subEnd: subEndDateFormatted,
    subDays: 7,
    paid: true
  });

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    dispatch(registerUser(formData)).then(()=>{
      dispatch(loginRequest(formData.email, formData.password)).then(()=>{
        if (isAuthenticated) {
          setLoading(false)
          // Navigate to the dashboard
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/dashboard", { replace: true });
        } else {
          // Handle login failure, if needed
        }

      }).catch((error)=>{
      console.error(error)
    })
    }).catch((error)=>{
      console.error(error)
    })
    
    // try {
    //   // Dispatch the registerUser action to register the user

    //   // After successful registration, log the user in

      

    //   // Redirect the user to the dashboard
    //   navigate("/dashboard", { replace: true });
    // } catch (error) {
    //   // Handle any errors that occur during registration or login
    //   console.error("Error during registration or login:", error);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Add the missing useNavigate hook

  // const handleClick = () => {
  //   navigate("/dashboard", { replace: true });
  // };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Full Name"
        />
        <TextField
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email address"
        />

        <TextField
          name="password"
          label="Password"
          value={formData.password}
        onChange={handleChange}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
      </Stack>

      {/* {loginError && <p>Error: {loginError}</p>} */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: "rgba(224, 88, 88, 1)",
          "&:hover": {
            backgroundColor: "rgba(224, 88, 88, 0.8)", // Decreased opacity on hover
          },
        }}
      >
         {loading ? (
          <CircularProgress size={24} /> // Show loading spinner
        ) : (
          "Sign Up"
        )}
        
      </LoadingButton>
    </>
  );
}
