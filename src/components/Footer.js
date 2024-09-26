import { Container, Divider, Grid, Typography } from "@mui/material";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import EmailIcon from "@material-ui/icons/Email";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  logobox: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },

  logoText: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "right",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },

  bodytext: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
      marginBottom: "8px",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginBottom: "8px",
    },
  },

  social: {
    [theme.breakpoints.up("sm")]: {
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },

  thirdImage: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "170px",
      marginLeft: "25px",
      marginBottom: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "170px",
      marginTop: "30px",
      marginBottom: "20px",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="false">
        <Divider />
      </Container>

      <Container
        maxWidth="false"
        style={{
          marginTop: "24px",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="row">
            <Grid item md={12} xs={12} sm={12}>
              <Typography variant="body2" color="initial">
                <b>Contact us at support@nuromed.lk</b>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </>
  );
}
