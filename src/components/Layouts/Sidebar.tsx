import {
  ChevronLeftTwoTone,
  ChevronRightTwoTone,
  GridViewTwoTone,
  LocalShippingTwoTone,
  ShoppingCartTwoTone,
  WarehouseTwoTone,
} from "@mui/icons-material";
import {
  Avatar,
  CSSObject,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  styled,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import React from "react";
import { ISidebarButtonClickProp } from "./DashboardLayout";
import { useLocation } from "react-router-dom";

interface DivProps {
  open?: boolean;
}

export const drawerWidth = 210;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "white",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "white",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Div = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<DivProps>(({ theme, open }) => ({
  ...theme.typography.button,
  color: "black",
  padding: 0,
}));

const Sidebar: React.FC<{
  open: boolean;
  theme: Theme;
  handleListItemClick: (props: ISidebarButtonClickProp) => void;
  handleDrawerClose: () => void;
}> = (props) => {
  const currentUrlPath = useLocation();

  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader>
        <IconButton onClick={props.handleDrawerClose}>
          {props.theme.direction === "rtl" ? (
            <ChevronRightTwoTone />
          ) : (
            <Avatar
              sx={{
                marginRight: 0,
                backgroundColor: "white",
                color: "slateblue",
                height: 35,
                width: 35,
              }}
            >
              <ChevronLeftTwoTone />
            </Avatar>
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItemButton
          selected={currentUrlPath.pathname.split("/")[1] === "dashboard"}
          onClick={(event) =>
            props.handleListItemClick({
              path: "/dashboard",
            })
          }
        >
          <ListItemIcon>
            <Avatar
              sx={{
                marginRight: 0,
                backgroundColor: "white",
                color: "slateblue",
                height: 35,
                width: 35,
              }}
            >
              <GridViewTwoTone fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText>
            <Div open={props.open}>
              <h5 style={{ color: "slateblue" }}>Dashboard</h5>
            </Div>
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          selected={currentUrlPath.pathname.split("/")[1] === "products"}
          onClick={(event) =>
            props.handleListItemClick({
              path: "/products",
            })
          }
        >
          <ListItemIcon>
            <Avatar
              sx={{
                marginRight: 0,
                backgroundColor: "white",
                color: "slateblue",
                height: 35,
                width: 35,
              }}
            >
              <ShoppingCartTwoTone fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText>
            <Div open={props.open}>
              <h5 style={{ color: "slateblue" }}>Products</h5>
            </Div>
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          selected={currentUrlPath.pathname.split("/")[1] === "inventory"}
          onClick={(event) =>
            props.handleListItemClick({
              path: "/inventory",
            })
          }
        >
          <ListItemIcon>
            <Avatar
              sx={{
                marginRight: 0,
                backgroundColor: "white",
                color: "slateblue",
                height: 35,
                width: 35,
              }}
            >
              <WarehouseTwoTone fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText>
            <Div open={props.open}>
              <h5 style={{ color: "slateblue" }}>Inventory</h5>
            </Div>
          </ListItemText>
        </ListItemButton>

        <ListItemButton
          selected={currentUrlPath.pathname.split("/")[1] === "suppliers"}
          onClick={(event) =>
            props.handleListItemClick({
              path: "/suppliers",
            })
          }
        >
          <ListItemIcon>
            <Avatar
              sx={{
                marginRight: 0,
                backgroundColor: "white",
                color: "slateblue",
                height: 35,
                width: 35,
              }}
            >
              <LocalShippingTwoTone fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemText>
            <Div open={props.open}>
              <h5 style={{ color: "slateblue" }}>Suppliers</h5>
            </Div>
          </ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
