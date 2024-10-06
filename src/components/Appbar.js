import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";

import { HashLink as Link } from "react-router-hash-link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbarButtons: {
    marginLeft: "auto",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            style={{ margin: "8px", maxWidth: "50px", marginRight: "16px" }}
          />
          <Typography
            variant="body1"
            color="initial"
            style={{ textAlign: "left", flex: "1" }}
          >
            <b>
              NeuroMed Digital <br />
              Healthcare Services
            </b>
            <br />
          </Typography>

          <div
            style={{
              marginLeft: "48px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <NavLink to="/welcome" style={{ color: "white" }}>
              <Typography
                variant="body1"
                color="initial"
                style={{ textAlign: "right", marginRight: "48px" }}
              >
                <b>Home</b>
              </Typography>
            </NavLink>

            <Link to="#features" style={{ color: "white" }}>
              <Typography
                variant="body1"
                color="initial"
                style={{ textAlign: "right", marginRight: "48px" }}
              >
                <b>Features</b>
              </Typography>
            </Link>

            <Link to="#how" style={{ color: "white" }}>
              <Typography
                variant="body1"
                color="initial"
                style={{ textAlign: "right", marginRight: "48px" }}
              >
                <b>How it works</b>
              </Typography>
            </Link>

            <NavLink
              to={{ pathname: "https://workresearch18.github.io/" }}
              target="_blank"
              style={{ color: "white" }}
            >
              {/* <Typography
                variant="body1"
                color="initial"
                style={{ textAlign: "right", marginRight: "48px" }}
              >
                <b>About us</b>
              </Typography> */}
            </NavLink>
          </div>

          <div className={classes.toolbarButtons}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Typography variant="h6" color="initial">
                <b>Login</b>
              </Typography>
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
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <NavLink to="/patient-login">Patient Login</NavLink>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <NavLink to="/superadmin-login">Superadmin Login</NavLink>
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                <NavLink to="/admin-login">Admin Login</NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink to="/staff-login">Staff Login</NavLink>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
