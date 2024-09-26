import React, { useContext } from "react";
import { useHistory, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Context } from "../util/Provider";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ReplayIcon from "@material-ui/icons/Replay";

//icons
import DescriptionIcon from "@material-ui/icons/Description";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import SendIcon from "@material-ui/icons/Send";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import CakeIcon from "@material-ui/icons/Cake";
import HomeIcon from "@material-ui/icons/Home";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import SettingsIcon from "@material-ui/icons/Settings";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import SecurityIcon from "@material-ui/icons/Security";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import TimelineIcon from "@material-ui/icons/Timeline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import LanguageIcon from "@material-ui/icons/Language";
import PeopleIcon from "@material-ui/icons/People";

import logo from "../assets/images/logo.png";
import axios from "axios";
import { Avatar, Chip } from "@material-ui/core";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: "#1e293b",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#0f172a",
    // backgroundColor: "#0f012e",
  },
  drawerOpen: {
    backgroundColor: "#0f172a",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  navlink: {
    textDecoration: "none",
    color: "#ffffff",
    "&:hover ": {
      backgroundColor: "#39a7c1",
      color: "white",
      "& $addBoxIcon": {
        color: "white",
      },
    },
  },
  navlinkActive: {
    textDecoration: "none",
    backgroundColor: "#00004C",
    color: "white",
    "& $addBoxIcon": {
      color: "white",
    },
  },
  addBoxIcon: {
    color: "#ffffff",
  },
  addBoxIconActive: {
    color: "white",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  logo: {
    maxWidth: "200px",
    borderRadius: "12px",
    marginBottom: "12px",
    marginTop: "12px",
  },
  sectionDesktop: {
    marginLeft: "auto",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    marginLeft: "auto",
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function Dashboard({ children, props, currentPath }) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { currentUser } = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const [openItems, setOpenItems] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem("jwt-token");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            style={{ color: "white" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>

          {/* <img
            src={logo}
            alt="logo"
            style={{ margin: "8px", maxWidth: "50px", marginRight: "16px" }}
          /> */}

          {/* <Typography
            variant="body1"
            color="initial"
            style={{ textAlign: "left" }}
          >
            <b>SRI LANKA POLICE DEPARTMENT</b>
            <br />
            <Typography variant="body2" color="initial">
              Online Clearance Certificate Registration
            </Typography>
          </Typography> */}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {currentUser ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt="Remy Sharp" src={currentUser.profile} />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>
                    <Typography variant="body2" color="initial">
                      {currentUser.fullname.toUpperCase()}
                    </Typography>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : null}

            {/* <IconButton
              edge="end"
              aria-label="logout"
              aria-haspopup="true"
              onClick={handleLogout}
            >
              <Typography
                variant="body2"
                color="initial"
                style={{ marginRight: "15px", color: "white" }}
              >
                <b>LOGOUT</b>
              </Typography>
              <ExitToAppIcon size="large" style={{ color: "white" }} />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              edge="end"
              aria-label="logout"
              aria-haspopup="true"
              onClick={handleLogout}
            >
              <Typography
                variant="body2"
                color="initial"
                style={{ marginRight: "15px", color: "white" }}
              >
                <b>LOGOUT</b>
              </Typography>
              <ExitToAppIcon size="large" style={{ color: "white" }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerPaper]: open,
            [classes.drawerPaper]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </div>
        <Divider />

        <List style={{ paddingTop: "40px" }}>
          <ListItem button className={classes.navlink}>
            <ListItemIcon>
              <ArrowBackIcon
                className={classes.addBoxIcon}
                onClick={() => history.goBack()}
              />
            </ListItemIcon>
            <ListItemText primary="Go Back" />
          </ListItem>

          <ListItem button className={classes.navlink}>
            <ListItemIcon>
              <ReplayIcon
                className={classes.addBoxIcon}
                onClick={() => window.location.reload()}
              />
            </ListItemIcon>
            <ListItemText primary="Reload" />
          </ListItem>

          <NavLink to="/">
            {currentPath === "/" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <HomeIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <HomeIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            )}
          </NavLink>

          {currentUser?.role === "Neuromed" ? (
            <>
              <NavLink to="/superadmin-register">
                {currentPath === "/superadmin-register" ||
                currentPath === "/superadmin-register" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <PeopleIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Superadmin Register" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <PeopleIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Superadmin Register" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/admin-register">
                {currentPath === "/admin-register" ||
                currentPath === "/admin-register" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <PeopleIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Create Management Users" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <PeopleIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Create Management Users" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/create-hospital">
                {currentPath === "/create-hospital" ||
                currentPath === "/create-hospital" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Create Hospital" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Create Hospital" />
                  </ListItem>
                )}
              </NavLink>
            </>
          ) : null}

          {currentUser?.role === "Medical Rep" ? (
            <>
              <NavLink to="/past-ehr">
                {currentPath === "/past-ehr" || currentPath === "/past-ehr" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Past EHR" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Past EHR" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/patient-requests">
                {currentPath === "/patient-requests" ||
                currentPath === "/patient-requests" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Patient Requests" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Patient Requests" />
                  </ListItem>
                )}
              </NavLink>
            </>
          ) : null}

          {currentUser?.role === "Hospital Admin" ? (
            <NavLink to="/staff-register">
              {currentPath === "/staff-register" ||
              currentPath === "/staff-register" ? (
                <ListItem button className={classes.navlinkActive}>
                  <ListItemIcon>
                    <PeopleIcon className={classes.addBoxIconActive} />
                  </ListItemIcon>
                  <ListItemText primary="Create Users" />
                </ListItem>
              ) : (
                <ListItem button className={classes.navlink}>
                  <ListItemIcon>
                    <PeopleIcon className={classes.addBoxIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Create Users" />
                </ListItem>
              )}
            </NavLink>
          ) : null}

          {currentUser?.role === "Doctor" ? (
            <>
              {/* <NavLink to="/past-ehr">
                {currentPath === "/past-ehr" || currentPath === "/past-ehr" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Add Past EHR" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Add Past EHR" />
                  </ListItem>
                )}
              </NavLink> */}

              <NavLink to="/new-ehr">
                {currentPath === "/new-ehr" || currentPath === "/new-ehr" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Add New EHR" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Add New EHR" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/ehr-retrieve">
                {currentPath === "/ehr-retrieve" ||
                currentPath === "/ehr-retrieve" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="EHR Retrieve" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="EHR Retrieve" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/ehrs">
                {currentPath === "/ehrs" || currentPath === "/ehrs" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="EHR Requests" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="EHR Requests" />
                  </ListItem>
                )}
              </NavLink>
            </>
          ) : null}

          {currentUser?.role === "Hospital Staff" ||
          currentUser?.role === "Lab Assistant" ? (
            <NavLink to="/patient-register">
              {currentPath === "/patient-register" ||
              currentPath === "/patient-register" ? (
                <ListItem button className={classes.navlinkActive}>
                  <ListItemIcon>
                    <PeopleIcon className={classes.addBoxIconActive} />
                  </ListItemIcon>
                  <ListItemText primary="Patient Register" />
                </ListItem>
              ) : (
                <ListItem button className={classes.navlink}>
                  <ListItemIcon>
                    <PeopleIcon className={classes.addBoxIcon} />
                  </ListItemIcon>
                  <ListItemText primary="Patient Register" />
                </ListItem>
              )}
            </NavLink>
          ) : null}

          {currentUser?.role === "Lab Assistant" ? (
            <>
              <NavLink to="/lab-invoice">
                {currentPath === "/lab-invoice" ||
                currentPath === "/lab-invoice" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Create Lab Invoice" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Create Lab Invoice" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/lab-invoices">
                {currentPath === "/lab-invoices" ||
                currentPath === "/lab-invoices" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="View Lab Invoices" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="View Lab Invoices" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/upload-cbp">
                {currentPath === "/upload-cbp" ||
                currentPath === "/upload-cbp" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Upload CBP" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Upload CBP" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/upload-lfr">
                {currentPath === "/upload-lfr" ||
                currentPath === "/upload-lfr" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Upload LFR" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Upload LFR" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/upload-urine-routine">
                {currentPath === "/upload-urine-routine" ||
                currentPath === "/upload-urine-routine" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Upload Urine Routine" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Upload Urine Routine" />
                  </ListItem>
                )}
              </NavLink>
            </>
          ) : null}
          {/* 
          <NavLink to="/cbp-report">
            {currentPath === "/cbp-report" || currentPath === "/cbp-report" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <AssignmentIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="CBP Report" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <AssignmentIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="CBP Report" />
              </ListItem>
            )}
          </NavLink> */}

          {currentUser?.role === "Patient" ? (
            <>
              <NavLink to="/lab-reports">
                {currentPath === "/lab-reports" ||
                currentPath === "/lab-reports" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="Lab Reports" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="Lab Reports" />
                  </ListItem>
                )}
              </NavLink>

              <NavLink to="/ehr-list">
                {currentPath === "/ehr-list" || currentPath === "/ehr-list" ? (
                  <ListItem button className={classes.navlinkActive}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIconActive} />
                    </ListItemIcon>
                    <ListItemText primary="EHR Requests" />
                  </ListItem>
                ) : (
                  <ListItem button className={classes.navlink}>
                    <ListItemIcon>
                      <AssignmentIcon className={classes.addBoxIcon} />
                    </ListItemIcon>
                    <ListItemText primary="EHR Requests" />
                  </ListItem>
                )}
              </NavLink>
            </>
          ) : null}

          {/* 
          <NavLink to="/ehrs">
            {currentPath === "/ehrs" || currentPath === "/ehrs" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <AssignmentIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="EHRs" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <AssignmentIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="EHRs" />
              </ListItem>
            )}
          </NavLink>

          <NavLink to="/ehr-retrieve">
            {currentPath === "/ehr-retrieve" ||
            currentPath === "/ehr-retrieve" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <AssignmentIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="EHR Retrieve" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <AssignmentIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="EHR Retrieve" />
              </ListItem>
            )}
          </NavLink> */}

          {/*<NavLink to="/documents">
            {currentPath === "/documents" || currentPath === "/document" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <AssignmentIndIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <AssignmentIndIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="Documents" />
              </ListItem>
            )}
          </NavLink>

          <NavLink to="/certificates">
            {currentPath === "/certificates" ||
            currentPath === "/certificates" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <DescriptionIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="Certificates" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <DescriptionIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="Certificates" />
              </ListItem>
            )}
          </NavLink> */}

          {/* <NavLink to="/create-post">
            {currentPath === "/create-post" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <PostAddIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="Create Post" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <PostAddIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="Create Post" />
              </ListItem>
            )}
          </NavLink> */}
          {/* 
          <NavLink to="/settings">
            {currentPath === "/settings" ? (
              <ListItem button className={classes.navlinkActive}>
                <ListItemIcon>
                  <SettingsIcon className={classes.addBoxIconActive} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            ) : (
              <ListItem button className={classes.navlink}>
                <ListItemIcon>
                  <SettingsIcon className={classes.addBoxIcon} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            )}
          </NavLink> */}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
