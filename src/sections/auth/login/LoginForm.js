import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
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
import {LoadingButton} from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import {loginRequest} from "../../../state/redux/actions/users/loginUser";
import CircularProgress from "@mui/material/CircularProgress";

// ----------------------------------------------------------------------

export default function LoginForm() {


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const [password, setPassword] = useState("");
    const loginError = useSelector((state) => state.login.error);
    const isAuthenticated = useSelector((state) => state.login.isLoggedIn);
    const user = useSelector((state) => state.login.user);

    // const user = localStorage.getItem('user')
    // const handleSubmit = async (e) => {
    //   setLoading(true)
    //   e.preventDefault();
    //   dispatch(loginRequest(email, password)).then(()=>{
    //     if (isAuthenticated) {
    //       setLoading(false)
    //       // Navigate to the dashboard
    //       localStorage.setItem("user", JSON.stringify(user));
    //       navigate("/dashboard", { replace: true });
    //     } else {
    //       // Handle login failure, if needed
    //       setLoading(false)
    //     }

    //   }).catch((error)=>{
    //   console.error(error)
    // })

    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(loginRequest(email, password));

            if (isAuthenticated) {
                // Navigate to the dashboard
                localStorage.setItem("user", JSON.stringify(user));
                navigate("/dashboard", {replace: true});
            } else {
                // Handle login failure, if needed
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <form>
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
                sx={{my: 2}}
            >
                {/* <Checkbox name="remember" label="Remember me" />
         */}

                <FormControlLabel
                    control={<Checkbox name="remember"/>}
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
                onClick={handleSubmit}
                sx={{
                    backgroundColor: "rgba(224, 88, 88, 1)",
                    "&:hover": {
                        backgroundColor: "rgba(224, 88, 88, 0.8)", // Decreased opacity on hover
                    },
                }}
            >
                {loading ? (
                    <CircularProgress size={24}/> // Show loading spinner
                ) : (
                    "Sign In"
                )}
            </LoadingButton>
        </form>
    );
}
