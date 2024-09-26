import { Button, Container, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Dashboard from "../components/Dashboard";

import { Context } from "../util/Provider";

import img3 from "../assets/images/h.jpg";

function Home() {
  const { currentUser } = useContext(Context);

  return (
    <Dashboard>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          padding: "24px",
        }}
      >
        <Grid
          id="how"
          container
          alignItems="center"
          justify="center"
          direction="row"
          spacing={2}
          style={{ padding: "24px" }}
        >
          <Grid item md={12} xs={12} sm={12} style={{ textAlign: "left" }}>
            <Typography
              variant="h4"
              color="initial"
              style={{ marginBottom: "24px" }}
            >
              <b>Welcome {currentUser.fullname},</b>
            </Typography>
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
              <b>Instructions</b>
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
    </Dashboard>
  );
}

export default Home;
