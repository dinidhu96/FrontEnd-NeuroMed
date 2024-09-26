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

export default function LabInvoices() {
  const classes = useStyles();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("jwt-token"));
  console.log(token);

  useEffect(() => {
    setLoading(true);

    const config = {
      headers: { authorization: `Bearer ${token || null}` },
    };

    axios
      .get(`${endpoint}invoices`, config)
      .then((response) => {
        console.log(response.data.data);

        let docs = [];

        response.data.data.map((data) => {
          console.log(data);
          return docs.push(data);
        });

        setInvoices(docs);
        setLoading(false);
      })
      .catch((error) => {
        setInvoices([]);
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
              <b>Invoices</b>
            </Typography>

            <Grid
              container
              direction="row"
              alignItems="center"
              style={{
                textAlign: "left",
              }}
            >
              {invoices.length > 0 ? (
                <Grid item md={12} xs={12} sm={12}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">
                            <b>Created Date</b>
                          </TableCell>
                          <TableCell>
                            <b>Reference ID</b>
                          </TableCell>
                          <TableCell>
                            <b>NIC</b>
                          </TableCell>
                          <TableCell>
                            <b>Patient Name</b>
                          </TableCell>
                          <TableCell>
                            <b>Payment</b>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoices.map((certificate) => (
                          <TableRow key={certificate.invoiceRef}>
                            <TableCell align="left">
                              {moment
                                .unix(certificate.createdDate / 1000)
                                .format("MM/DD/YYYY h:mm:ss")}
                            </TableCell>
                            <TableCell align="left">
                              {certificate.invoiceRef}
                            </TableCell>
                            <TableCell align="left">
                              {certificate.patientNic}
                            </TableCell>
                            <TableCell align="left">
                              {certificate.patientFirstname}{" "}
                              {certificate.patientLastname}
                            </TableCell>
                            <TableCell align="left">
                              {certificate.payment} LKR
                            </TableCell>

                            <TableCell align="left">
                              <NavLink
                                to={`/view-invoice/${certificate.invoiceRef}`}
                                className={classes.navlink}
                              >
                                <Button
                                  variant="contained"
                                  color="primary"
                                  disableElevation
                                >
                                  View Invoice
                                </Button>
                              </NavLink>
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
                    No Invoices Available
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
