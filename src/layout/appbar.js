import * as React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import AuthService from "../services/AuthService";

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  color: "#1565c0",
}));

const SingOut = async () => {
  // await AuthService.SingOut();
  // return window.location.pathname = ''
};
const settings = [
  {
    name: "ออกจากระบบ",
    component: SingOut,
    icon: <LogoutIcon />,
  },
];

export default function BaseAppBar(props) {
  const { onSidebarOpen, ...other } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onSignOut = () => {
    sessionStorage.clear();
    window.location.pathname = "/";
  };

  return (
    <>
      <NavbarRoot
        sx={{
          left: {
            lg: 200,
          },
          width: {
            lg: "calc(100% - 200px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 3,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography
            style={{
              fontWeight: "700",
              color: "#1565c0",
              fontSize: "2rem",
              marginLeft: "32px",
            }}
          >
            Actuary System
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1,
            }}
            // src="/static/images/avatars/avatar_1.png"
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <AccountCircleIcon
                  sx={{
                    p: 0,
                    color: "#1565c0",
                    bgcolor: "#ffff",
                    height: 50,
                    width: 50,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    // onClick={setting.component}
                    onClick={onSignOut}
                  >
                    <Grid item>
                      <Typography textAlign="center" marginX={0.5}>
                        {" "}
                        {setting.name}
                      </Typography>
                    </Grid>
                    <Grid item>{setting.icon}</Grid>
                  </Grid>
                </MenuItem>
              ))}
            </Menu>
          </Avatar>
        </Toolbar>
      </NavbarRoot>
    </>
  );
}

NavbarRoot.propTypes = {
  onSidebarOpen: PropTypes.func,
};
