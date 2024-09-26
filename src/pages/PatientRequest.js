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
import { addPii } from "../Web3Client";

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
import Alert from "@material-ui/lab/Alert";

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

export default function PatientRequest(props) {
  const classes = useStyles();

  const [ehr, setEhr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = JSON.parse(localStorage.getItem("jwt-token"));
  console.log(token);

  useEffect(() => {
    setLoading(true);

    const config = {
      headers: { authorization: `Bearer ${token || null}` },
      params: { id: props.match.params.id },
    };

    axios
      .get(`${endpoint}patient-request`, config)
      .then((response) => {
        console.log(response.data.data);

        setEhr(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setEhr(null);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const approve = async () => {
    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: props.match.params.id },
      };

      const response = await axios.get(
        `${endpoint}patient-request-approve`,
        config
      );

      console.log(response);
      setSuccess(response?.data?.message);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  };

  const reject = async () => {
    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: props.match.params.id },
      };

      const response = await axios.get(
        `${endpoint}patient-request-reject`,
        config
      );

      console.log(response);
      setSuccess(response?.data?.message);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
      setSuccess(null);
      setLoading(false);
    }
  };

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
            maxWidth="md"
            style={{
              marginTop: "50px",
              marginBottom: "50px",
              padding: "24px",
              borderRadius: "8px",
            }}
          >
            {ehr ? (
              <>
                <Typography
                  variant="h5"
                  color="initial"
                  align="left"
                  style={{
                    marginBottom: "32px",
                  }}
                >
                  <b>Patient Registration ID : {props.match.params.id}</b>
                </Typography>

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
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="h6" color="initial" align="left">
                      <b>KYC Verification Results</b>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="body1" color="initial" align="left">
                      KYC Result : {ehr.kycResult.status}
                    </Typography>
                  </Grid>

                  <Grid
                    spacing={4}
                    container
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{
                      marginBottom: "24px",
                      border: "3px solid black",
                      marginTop: "24px",
                    }}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                      sm={12}
                      style={{ textAlign: "right" }}
                    >
                      <img
                        src={`https://patientkyc.s3.amazonaws.com/${ehr.selfieKey}`}
                        alt="sdf"
                        style={{ height: "100%" }}
                      />
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                      sm={12}
                      style={{ textAlign: "left" }}
                    >
                      <img
                        src={`https://patientkyc.s3.amazonaws.com/ID_Face.jpg`}
                        alt="sdf"
                        style={{ height: "100%" }}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="h6" color="initial" align="left">
                      <b>Patient Data From Database</b>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="body1" color="initial" align="left">
                      NIC : {ehr.nic}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="body1" color="initial" align="left">
                      Fullname : {ehr.fullname}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="body1" color="initial" align="left">
                      Address : {ehr.address}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="h6" color="initial" align="left">
                      <b>OCR Result</b>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="body1" color="initial" align="left">
                      NIC : {ehr.ocrResult.nic}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="body1" color="initial" align="left">
                      Fullname : {ehr.ocrResult.fullname}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={4}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Typography variant="body1" color="initial" align="left">
                      Address : {ehr.ocrResult.address}
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    item
                    spacing={4}
                    md={12}
                    xs={12}
                    sm={12}
                    style={{
                      marginBottom: "24px",
                      border: "3px solid black",
                      marginTop: "24px",
                    }}
                  >
                    <Grid item md={6} xs={12} sm={12}>
                      <img
                        src={`https://patientkyc.s3.amazonaws.com/${ehr.idFrontKey}`}
                        alt="sdf"
                        style={{ width: "100%" }}
                      />
                    </Grid>

                    <Grid item md={6} xs={12} sm={12}>
                      <img
                        src={`https://patientkyc.s3.amazonaws.com/${ehr.idBackKey}`}
                        alt="sdfg"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Divider />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Button
                      onClick={approve}
                      variant="contained"
                      color="primary"
                      disableElevation
                      style={{ marginRight: "24px" }}
                    >
                      Approve
                    </Button>

                    <Button
                      onClick={reject}
                      variant="contained"
                      color="secondary"
                      disableElevation
                    >
                      Reject
                    </Button>
                  </Grid>

                  {error ? (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Alert severity="error">
                        <b>{error}</b>
                      </Alert>
                    </Grid>
                  ) : null}

                  {success ? (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Alert severity="success">
                        <b>{success}</b>
                      </Alert>
                    </Grid>
                  ) : null}
                </Grid>
              </>
            ) : (
              <Grid item md={12} xs={12} sm={12}>
                <Typography variant="body1" color="initial">
                  No EHR Found
                </Typography>
              </Grid>
            )}
          </Container>
        )}
      </Dashboard>
    </>
  );
}
