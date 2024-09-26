import { Grid, Typography, Container, Button } from "@material-ui/core";
import React from "react";

import Appbar from "../components/Appbar";

import SecurityIcon from "@material-ui/icons/Security";
import ControlCameraIcon from "@material-ui/icons/ControlCamera";

import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import FolderSharedIcon from "@material-ui/icons/FolderShared";

import Footer from "../components/Footer";
import Gallery from "../components/Gallery";

import img1 from "../assets/images/f.png";
import img2 from "../assets/images/nm.jpg";
import img3 from "../assets/images/h.jpg";

function Welcome() {
  return (
    <>
      <Appbar />
      <Gallery />

      <Container
        maxWidth="lg"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          padding: "24px",
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
          style={{ padding: "24px" }}
        >
          <Grid item md={6} xs={12} sm={12} style={{ padding: "24px" }}>
            <img style={{ width: "100%" }} src={img2} alt="img2" />
          </Grid>
          <Grid item md={6} xs={12} sm={12} style={{ padding: "24px" }}>
            <Typography
              variant="h5"
              color="initial"
              style={{ marginBottom: "24px", textAlign: "left" }}
            >
              <b>NeuroMed and Digital Healthcare</b>
            </Typography>

            <Typography
              variant="h6"
              color="initial"
              style={{ marginBottom: "24px", textAlign: "justify" }}
            >
              <b>
                Neuromed is a decentralized electronic health record (EHRs)
                management system that allows user’s to manage electronic health
                records and personally identifiable information securely and
                effectively. In a world moving towards web3, Neuromed will
                enable a whole new set of features to provide a more secure and
                a productive B2C process.
              </b>
            </Typography>

            <Typography
              variant="h6"
              color="initial"
              style={{ marginBottom: "24px", textAlign: "justify" }}
            >
              <b>
                Coded with smart contracts, assigning each patient a unique
                token in form of a NFT allows transparency and tracking. Roles
                define the system hierarchy while attributes work hand in hand
                with the functionalities. Online lab reports are made secure
                enabling Know-Your Customer verification that works with
                multi-factor authentication. Security is preserved while making
                it the most productive.
              </b>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          id="features"
          container
          direction="row"
          alignItems="center"
          spacing={2}
          style={{ padding: "24px" }}
        >
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              color="initial"
              style={{ marginBottom: "24px", textAlign: "left" }}
            >
              <b>Features</b>
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            xs={12}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <LocalHospitalIcon fontSize="large" />

            <Typography
              variant="h5"
              color="initial"
              style={{
                marginTop: "24px",
              }}
            >
              <b>HIPAA Compliant</b>
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            xs={12}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <SecurityIcon fontSize="large" />

            <Typography
              variant="h5"
              color="initial"
              style={{
                marginTop: "24px",
              }}
            >
              <b>Security Resilient</b>
            </Typography>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <ControlCameraIcon fontSize="large" />

            <Typography
              variant="h5"
              color="initial"
              style={{
                marginTop: "24px",
              }}
            >
              <b>Decentralized Concept in the making</b>
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            xs={12}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <LinearScaleIcon fontSize="large" />

            <Typography
              variant="h5"
              color="initial"
              style={{
                marginTop: "24px",
              }}
            >
              <b>Scalable to your decision</b>
            </Typography>
          </Grid>

          <Grid
            item
            md={2}
            xs={12}
            sm={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <FolderSharedIcon fontSize="large" />

            <Typography
              variant="h5"
              color="initial"
              style={{
                marginTop: "24px",
              }}
            >
              <b>You own your own data</b>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={2}
          style={{ padding: "24px" }}
        >
          <Grid item md={6} xs={12} sm={12}>
            <img style={{ width: "100%" }} src={img1} alt="img2" />
          </Grid>

          <Grid item md={6} xs={12} sm={12}>
            <ul>
              <li>
                <Typography
                  variant="h6"
                  color="initial"
                  style={{ textAlign: "left" }}
                >
                  <b>
                    Available in different versions to cater different use cases
                  </b>
                </Typography>
              </li>
              <li>
                <Typography
                  variant="h6"
                  color="initial"
                  style={{ textAlign: "left" }}
                >
                  <b>Support data security in all states</b>
                </Typography>
              </li>
              <li>
                <Typography
                  variant="h6"
                  color="initial"
                  style={{ textAlign: "left" }}
                >
                  <b>Colloborate with government policies</b>
                </Typography>
              </li>
              <li>
                <Typography
                  variant="h6"
                  color="initial"
                  style={{ textAlign: "left" }}
                >
                  <b>24*7 Monitoring in case a glitch ruins your day</b>
                </Typography>
              </li>
              <li>
                <Typography
                  variant="h6"
                  color="initial"
                  style={{ textAlign: "left" }}
                >
                  <b>Rapidly evolving</b>
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>

        <Grid
          id="how"
          container
          alignItems="center"
          justify="center"
          direction="row"
          spacing={2}
          style={{ padding: "24px" }}
        >
          <Grid item md={6} xs={12} sm={12} style={{ textAlign: "left" }}>
            <Typography
              variant="h5"
              color="initial"
              style={{ marginBottom: "24px" }}
            >
              <b>How it's working</b>
            </Typography>

            <Typography
              variant="h6"
              color="initial"
              style={{ marginBottom: "24px" }}
            >
              <b>
                Customize your way of use with our variety of plans for the
                customers. Step by step guide for the users until they pick up
                the pace. Help is always one click away.
              </b>
            </Typography>

            <Button
              onClick={() => {
                window.location.href = `https://1drv.ms/u/s!AvVf_VlyoXKqgQZOt0Db0YG4kyWB?e=fcwEXW`;
              }}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              style={{ marginRight: "24px" }}
            >
              <b>For Patients</b>
            </Button>

            <Button
              onClick={() => {
                window.location.href = `https://1drv.ms/u/s!AvVf_VlyoXKqgQcHjY0lDQI7fX-r?e=p67Uwj`;
              }}
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              <b>For Hospitals</b>
            </Button>
          </Grid>

          <Grid item md={6} xs={12} sm={12} style={{ padding: "24px" }}>
            <img style={{ width: "100%" }} src={img3} alt="img2" />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default Welcome;
