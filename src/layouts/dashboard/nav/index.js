//left nav

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box,  Drawer, Stack } from "@mui/material";

// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//
import navConfig from "./config";
import navConfigBottom from "./navBottomConfig";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// const StyledAccount = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        // height: 1,
        height: "100vh",
        display: "flex",
          flexDirection: "column",
          // backgroundColor: '#000',
          justifyContent: "space-between",
        "& .simplebar-content": {
          // height: 1,
          display: "flex",                                                                                                    
          flexDirection: "column",
          // justifyContent: "space-around",
          // gap: "50px"
        },
      }}
    >
      <Stack 
      // display: "flex",
      sx={{
        display: 'flex',
            flexDirection: "column",
            backgroundColor: '#f3f3f3',
            height: "100vh",

            justifyContent: "space-between"
          }}>
      <Box sx={{py: 4, display: "flex", flexDirection: 'column'}}>
        <Box sx={{px: 2.5, mb: 6}}>

        <Logo />
        </Box>
        <NavSection data={navConfig} />
      </Box>

      {/* <Box sx={{ mb: 5, mx: 2.5 }}>
      //This is the account thing
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            

            <Box sx={{ ml: 2 }}>
              
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box> */}

      {/* <Box  /> */}

      


      

 

      <NavSection data={navConfigBottom} />
      </Stack>
      
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        // backgroundColor: '#f3f3f3'
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
