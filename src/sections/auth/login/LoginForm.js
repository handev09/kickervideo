import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../../state/redux/actions/users/loginUser";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginError = useSelector((state) => state.login.error);
  const isAuthenticated = useSelector(state => state.login.isLoggedIn);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginRequest(email, password));
  
      if (isAuthenticated) {
        // Navigate to the dashboard
        navigate("/dashboard", { replace: true });
      } else {
        // Handle login failure, if needed
      }
    } catch (error) {
      // Handle any errors that might occur during dispatch or API call
      console.error("Error during login:", error);
    }
  };

  const handleClick = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email address"
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        {/* <Checkbox name="remember" label="Remember me" />
         */}

        <FormControlLabel
          control={<Checkbox name="remember" />}
          label="Remember me"
        />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      {loginError && <p>Error: {loginError}</p>}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        // onClick={handleSubmit}
        sx={{
          backgroundColor: "rgba(224, 88, 88, 1)",
          "&:hover": {
            backgroundColor: "rgba(224, 88, 88, 0.8)", // Decreased opacity on hover
          },
        }}
      >
        Sign In
      </LoadingButton>
    </form>
  );
}
