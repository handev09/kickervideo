import { useState } from "react";
// @mui
import { styled, useMediaQuery } from "@mui/material";
import {
  Input,
  Slide,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// component
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 52;

const StyledSearchbar = styled("div")(({ theme, isDesktop }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  zIndex: isDesktop ? 0 : 99,
  top: isDesktop ? 25 : 0,
  left: isDesktop ? "auto" : 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  border: isDesktop ? `1px solid ${theme.palette.grey[500]}` : "0",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up("md")]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
    width: isDesktop ? "50%" : "100%",
    maxWidth: isDesktop ? "60%" : "none",
    right: 200,
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {isDesktop ? (
          <StyledSearchbar isDesktop={isDesktop}>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search Budgets"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: "fontWeightBold" }}
            />
            {/* <Button variant="contained" onClick={handleClose}>
              Search
            </Button> */}
          </StyledSearchbar>
        ) : (
          <div>
            {!open && (
              <IconButton onClick={handleOpen}>
                <Iconify icon="eva:search-fill" />
              </IconButton>
            )}

            <Slide direction="down" in={open} mountOnEnter unmountOnExit>
              <StyledSearchbar>
                <Input
                  autoFocus
                  fullWidth
                  disableUnderline
                  placeholder="Search Budgets"
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify
                        icon="eva:search-fill"
                        sx={{ color: "text.disabled", width: 20, height: 20 }}
                      />
                    </InputAdornment>
                  }
                  sx={{ mr: 1, fontWeight: "fontWeightBold" }}
                />
                <Button variant="contained" onClick={handleClose}>
                  Search
                </Button>
              </StyledSearchbar>
            </Slide>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
