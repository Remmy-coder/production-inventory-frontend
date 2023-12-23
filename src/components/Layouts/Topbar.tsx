import { LunchDiningTwoTone, SettingsTwoTone } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Toolbar, styled } from "@mui/material";
import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { drawerWidth } from "./Sidebar";
import ToolbarLogo from "../../assets/logos/assembli-sync-logo.png";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar: React.FC<{ open: boolean; handleDrawerOpen: () => void }> = (
  props
) => {
  return (
    <AppBar
      position="fixed"
      open={props.open}
      sx={{ backgroundColor: "white" }}
    >
      <Toolbar>
        <Grid container spacing={0}>
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "start",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={props.handleDrawerOpen}
              sx={{
                marginRight: 5,
                ...(props.open && { display: "none" }),
              }}
            >
              <Avatar
                sx={{
                  marginRight: 0,
                  backgroundColor: "white",
                  color: "slateblue",
                  height: 35,
                  width: 35,
                }}
              >
                <LunchDiningTwoTone fontSize="medium" />
              </Avatar>
            </IconButton>
            <img
              style={{
                height: 50,
                borderRadius: "10px",
                width: 130,
                boxShadow: "5px 5px 26px 1px #f4ebeb",
                opacity: "0.9",
              }}
              src={ToolbarLogo}
              loading="lazy"
              alt="ToolbarLogo"
            />
          </Grid>

          <Grid
            item
            xs={6}
            md={8}
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <IconButton color="inherit" aria-label="settings">
              <Avatar
                sx={{
                  marginRight: 0,
                  backgroundColor: "white",
                  color: "slateblue",
                  height: 35,
                  width: 35,
                }}
              >
                <SettingsTwoTone fontSize="small" />
              </Avatar>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
