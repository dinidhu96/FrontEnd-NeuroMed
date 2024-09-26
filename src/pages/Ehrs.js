import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Chips from "../components/Chips";
import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
}));

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function Ehrs() {
  const classes = useStyles();

  const [ehrs, setEhrs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("jwt-token"));
  console.log(token);

  useEffect(() => {
    setLoading(true);

    const config = {
      headers: { authorization: `Bearer ${token || null}` },
    };

    axios
      .get(`${endpoint}get-ehrs`, config)
      .then((response) => {
        console.log(response.data.data);

        let docs = [];

        response.data.data.map((data) => {
          console.log(data);
          return docs.push(data);
        });

        setEhrs(docs);
        setLoading(false);
      })
      .catch((error) => {
        setEhrs([]);
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <>
      <Dashboard currentPath="/documents">
        {loading ? (
          <Grid container component="main" spacing={3}>
            <Grid
              style={{
                display: "flex",
                direction: "row",
                alignItems: "center",
                justifyContent: "center",
                height: "90vh",
              }}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <Spinner type="pulse" />
            </Grid>
          </Grid>
        ) : (
          <Container
            maxWidth="lg"
            style={{
              marginTop: "50px",
              marginBottom: "50px",
              padding: "24px",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h4"
              color="initial"
              align="left"
              style={{
                marginBottom: "32px",
              }}
            >
              <b>EHR Requests</b>
            </Typography>

            <Grid
              container
              direction="row"
              alignItems="center"
              style={{
                textAlign: "left",
              }}
            >
              {ehrs.length > 0 ? (
                <Grid item md={12} xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <b>Created Date</b>
                          </TableCell>
                          <TableCell>
                            <b>EHR ID</b>
                          </TableCell>
                          <TableCell>
                            <b>NIC</b>
                          </TableCell>
                          <TableCell>
                            <b>Type</b>
                          </TableCell>
                          <TableCell>
                            <b>Status</b>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ehrs.map((ehr) => (
                          <TableRow key={ehr.ehrId}>
                            <TableCell align="left">{ehr.date}</TableCell>
                            <TableCell align="left">{ehr.id}</TableCell>
                            <TableCell align="left">{ehr.nic}</TableCell>
                            <TableCell align="left">{ehr.type}</TableCell>
                            <TableCell align="left">{ehr.status}</TableCell>

                            <TableCell align="left">
                              {ehr.status === "APPROVED" ? (
                                <NavLink
                                  to={`/ehr/${ehr.id}`}
                                  className={classes.navlink}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                  >
                                    View EHR
                                  </Button>
                                </NavLink>
                              ) : (
                                <Button
                                  disabled
                                  variant="contained"
                                  color="primary"
                                  disableElevation
                                >
                                  View EHR
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body1" color="initial">
                    No EHRs Available
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Container>
        )}
      </Dashboard>
    </>
  );
}
