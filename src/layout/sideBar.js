import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuList,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { pageListAdmin, pageListUser } from "../utils/pageList";
import Logo from "../img/logo2.png";

export default function Sidebar(props) {
  // let [openCollapse, setOpenCollapse] = React.useState(true);
  // const handleClick = () => {
  //   setOpenCollapse(!openCollapse);
  // };
  const userData = JSON.parse(sessionStorage.getItem("tlaaUserData"));

  const CustomListItem = ({ to, primary, icon }) => {
    return (
      <MenuList disablePadding>
        <ListItem
          sx={{ paddingY: 1, marginY: 0 }}
          component={NavLink}
          to={to}
          className={"appBarLink"}
          activeclassname={"active"}
        >
          {icon}
          <ListItemText sx={{ marginX: 1 }} primary={primary} />
        </ListItem>
      </MenuList>
    );
  };
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "#1565c0",
        }}
      >
        <Box
          sx={{ alignItems: "center", justifyContent: "center", marginTop: 2 }}
        >
          <img
            alt="TLAALogo"
            src={Logo}
            style={{
              display: "flex",
              width: "100%",
            }}
          />
        </Box>
        <Box
          sx={{
            my: 2,
          }}
        ></Box>
        {userData.isAdmin === 1 ? (
          <div className="d-flex">
            {pageListAdmin.map((item, index) => {
              return (
                <CustomListItem
                  key={index}
                  primary={item.title}
                  to={item.pathName}
                  icon={item.icon}
                />
              );
            })}
          </div>
        ) : (
          <div className="d-flex">
            {pageListUser.map((item, index) => {
              return (
                <CustomListItem
                  key={index}
                  primary={item.title}
                  to={item.pathName}
                  icon={item.icon}
                />
              );
            })}
          </div>
        )}
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#FFFFFF",
            color: "#111828",
            width: 220,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          //     backgroundColor: "#111828",
          //   color: "#FFFFFF",
          backgroundColor: "#FFFFFF",
          color: "#111828",
          width: 220,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
