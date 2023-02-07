import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import BaseAppBar from "./appbar";
import SideBar from "./sideBar";
import RouteService from "../services/routeService";

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 10,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export default function AppLayout(props) {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("azayUserData"))
  ); //Todo

  return (
    <Box>
      <LayoutRoot>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </LayoutRoot>
      <BaseAppBar onSidebarOpen={() => setSidebarOpen(true)} />
      <SideBar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
      <Box sx={{ marginLeft: { lg: 28 } }}>
        <Box sx={{ marginY: 2, marginX: 4 }}>
          <RouteService />
        </Box>
      </Box>
    </Box>
  );
}
