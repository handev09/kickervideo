import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link as MuiLink,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";

// import { SignupForm } from "../sections/auth/signup";

import { SignupForm } from "../sections/auth/signup";


// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  const mdUp = useResponsive("up", "md");
  


  return (
    <>
      <Helmet>
        <title> SignUp | VBudget </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Create an account
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Have an account? {""}
              <MuiLink component={RouterLink} to={"/login"} variant="subtitle2">Login</MuiLink>
            </Typography>

            <SignupForm />

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Or sign up with
              </Typography>
            </Divider>

            <Stack direction="row" spacing={2} sx={{ my: 5 }}>
              <Button fullWidth size="large" color="inherit" variant="outlined"sx={{borderRadius: "30px"}}>
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={22}
                  height={22}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined" sx={{borderRadius: "30px"}}>
                <Iconify
                  icon="mdi:facebook"
                  color="#1877F2"
                  width={25}
                  height={25}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined"sx={{borderRadius: "30px"}}>
                <Iconify
                  icon="ri:apple-line"
                  width={25}
                  height={25}
                />
              </Button>
            </Stack>
          </StyledContent>
        </Container>

        {mdUp && (
          <StyledSection sx={{ backgroundColor: "#e05858ff" }}>
            <img
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
}
