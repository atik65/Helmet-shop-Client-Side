// import React from "react";
import "./dashboardContainer.css";

import Navbar from "../../shared/navbar/Navbar";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import LocalMallTwoToneIcon from "@mui/icons-material/LocalMallTwoTone";
import PaymentTwoToneIcon from "@mui/icons-material/PaymentTwoTone";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import HomeIcon from "@mui/icons-material/Home";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Dashboard from "../dashboard/Dashboard";
import MyOrder from "../myOrder/MyOrder";
import Pay from "../pay/Pay";
import AddProduct from "../addProduct/AddProduct";
import ManageOrders from "../manageOrders/ManageOrders";
import ManageProducts from "../manageProducts/ManageProducts";
import MakeAdmin from "../makeAdmin/MakeAdmin";
import logo from "../../../images/helmet-logo.png";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import ReviewUs from "../reviewUs/ReviewUs";
import AdminRoute from "../../../Routes/AdminRoute";

const drawerWidth = 210;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

// dashboard container start form here

const DashboardContainer = () => {
  let { path, url } = useRouteMatch();

  const { user, logOut, admin } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} style={{ overflowX: "hidden" }}>
      <CssBaseline />
      <AppBar
        style={{
          boxShadow: "1px 1px gray",
          backgroundColor: "#fafafa",
          color: "gray",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ marginLeft: "auto" }}
            variant="h6"
            noWrap
            component="div"
          >
            <NavLink className="login-logo dashboard-logo" to="/">
              <img src={logo} alt="" />
              <h2>
                Helmet<span>Mania</span>
              </h2>
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <div className="dashborad-menu">
            <NavLink to="/">
              <ListItem button>
                <ListItemIcon>
                  <HomeTwoToneIcon />
                </ListItemIcon>

                <ListItemText primary={"Home"} />
              </ListItem>
            </NavLink>

            <NavLink to={`${url}`}>
              <ListItem button>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>

                <ListItemText primary={"Dashboard"} />
              </ListItem>
            </NavLink>

            {user.email && !admin && (
              <div>
                <NavLink to={`${url}/myorders`}>
                  <ListItem button>
                    <ListItemIcon>
                      <LocalMallTwoToneIcon />
                    </ListItemIcon>

                    <ListItemText primary={"My Orders"} />
                  </ListItem>
                </NavLink>
                <NavLink to={`${url}/pay`}>
                  <ListItem button>
                    <ListItemIcon>
                      <PaymentTwoToneIcon />
                    </ListItemIcon>

                    <ListItemText primary={"Pay"} />
                  </ListItem>
                </NavLink>
                <NavLink to={`${url}/review`}>
                  <ListItem button>
                    <ListItemIcon>
                      <RateReviewOutlinedIcon />
                    </ListItemIcon>

                    <ListItemText primary={"Review Us"} />
                  </ListItem>
                </NavLink>{" "}
              </div>
            )}

            {user.email && admin && (
              <div>
                {/* for admin starts */}

                <NavLink to={`${url}/addproduct`}>
                  <ListItem button>
                    <ListItemIcon>
                      <AddCircleOutlineRoundedIcon />
                    </ListItemIcon>

                    <ListItemText primary={"Add Product"} />
                  </ListItem>
                </NavLink>

                <NavLink to={`${url}/manageorders`}>
                  <ListItem button>
                    <ListItemIcon>
                      <BorderColorIcon />
                    </ListItemIcon>

                    <ListItemText primary={"Manage Orders"} />
                  </ListItem>
                </NavLink>

                <NavLink to={`${url}/manageproducts`}>
                  <ListItem button>
                    <ListItemIcon>
                      <ClearAllIcon />
                    </ListItemIcon>

                    <ListItemText primary={"Manage Products"} />
                  </ListItem>
                </NavLink>

                <NavLink to={`${url}/makeadmin`}>
                  <ListItem button>
                    <ListItemIcon>
                      <SupervisorAccountIcon />
                    </ListItemIcon>

                    <ListItemText primary={"Make Admin"} />
                  </ListItem>
                </NavLink>

                {/* for admin ends */}
              </div>
            )}

            <ListItem button onClick={logOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>

              <ListItemText primary={"Log Out"} />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <Box
        component="main"
        style={{ backgroundColor: "#FAFAFA", height: "100vh" }}
        sx={{ flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />

        <div className="dashboard-field">
          <Switch>
            <Route exact path={path}>
              <Dashboard />
            </Route>

            <Route exact path={`${path}/myorders`}>
              <MyOrder />
            </Route>

            <Route exact path={`${path}/pay`}>
              <Pay />
            </Route>

            <Route exact path={`${path}/review`}>
              <ReviewUs />
            </Route>

            <AdminRoute exact path={`${path}/addproduct`}>
              <AddProduct />
            </AdminRoute>

            <AdminRoute exact path={`${path}/manageorders`}>
              <ManageOrders />
            </AdminRoute>
            <AdminRoute exact path={`${path}/manageproducts`}>
              <ManageProducts />
            </AdminRoute>
            <AdminRoute exact path={`${path}/makeadmin`}>
              <MakeAdmin />
            </AdminRoute>
          </Switch>
        </div>
      </Box>
    </Box>
  );
};

export default DashboardContainer;
