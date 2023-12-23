import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar, { DrawerHeader } from "./Sidebar";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { CssBaseline } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

export interface ISidebarButtonClickProp {
  path: string;
}

const DashboardLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (props: ISidebarButtonClickProp) => {
    navigate(props.path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar
        open={open}
        theme={theme}
        handleListItemClick={handleListItemClick}
        handleDrawerClose={handleDrawerClose}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
