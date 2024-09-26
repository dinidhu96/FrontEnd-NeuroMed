import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";

import Dashboard from "../components/Dashboard";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function SingleImage(props) {
  let filename = props.match.params.id;
  let name = props.match.params.filename;

  const token = JSON.parse(localStorage.getItem("jwt-token"));
  console.log(token);
  return (
    <Dashboard>
      <Container
        maxWidth="lg"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{
            textAlign: "left",
          }}
        >
          <Grid
            item
            md={12}
            xs={12}
            sm={12}
            style={{ marginTop: "48px", textAlign: "center" }}
          >
            <Typography variant="h6" color="initial">
              <b>{name}</b>
            </Typography>
          </Grid>

          <Grid item md={12} xs={12} sm={12} style={{ marginTop: "48px" }}>
            <img
              src={`http://localhost:5001/images/${filename}`}
              alt="sdf"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Dashboard>
  );
}
