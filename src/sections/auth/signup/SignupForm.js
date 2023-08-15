import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// sections
// import SignupFormSection from "../sections/auth/signup/SignupForm"; // Rename the import statement to avoid naming conflict
// import { registerUser } from "../state/redux/actions/users/registerUser";

import { registerUser } from "../../../state/redux/actions/users/registerUser";
// @mui
import { Stack, IconButton, InputAdornment, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function SignupForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    navigate("/dashboard", { replace: true });
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

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

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
        Sign Up
      </LoadingButton>
    </>
  );
}
