import React, { useState, useEffect } from "react";
import axios from "axios";

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

import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";
import Label from "../components/Label";
import ChipsWithIcon from "../components/ChipsWithIcon";

import t from "../assets/images/true.jpg";
import f from "../assets/images/false.jpg";

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

export default function VerifyReport(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    let path = window.location.pathname;
    let split = path.split("/");
    let slice = split.slice(3);
    let signature = slice.join("/");

    console.log(signature);

    axios
      .get(`${endpoint}verify/`, {
        params: {
          id: props.match.params.id,
          signature: signature,
        },
      })
      .then((response) => {
        console.log(response.data.data);

        setResult(response.data.data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        console.log(error?.response?.data?.data);
        setResult(error?.response?.data?.data);
        setError("Certificate can't be verified'");

        // if (error?.response?.data?.message === "Invalid Certificate") {
        //   setResult(error?.response?.data?.data);
        //   setError("Certificate can't be verified'");
        // } else {
        //   setResult(null);
        //   setError("Certificate can't be verified'");
        // }
        setLoading(false);
      });
  }, []);

  console.log(result);

  return (
    <>
      {/* <Appbar /> */}

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
            backgroundColor: "white",
          }}
        >
          {result && !error ? (
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              style={{
                textAlign: "left",
              }}
            >
              <Grid
                item
                container
                md={12}
                xs={12}
                sm={12}
                style={{ marginBottom: "24px" }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="h5" color="initial" align="center">
                    <b>
                      ✅ This Medical report is issued by Neuromed Digital
                      Healthcare Services.
                    </b>
                  </Typography>
                </Grid>
              </Grid>

              <Grid item container md={6} xs={12} sm={12}>
                <Grid item md={12} xs={12} sm={12}>
                  <img src={t} alt="qr" style={{ width: "100%" }} />
                </Grid>
              </Grid>

              <Grid
                item
                container
                md={6}
                xs={12}
                sm={12}
                style={{ marginTop: "16px" }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Label text="Reference ID" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body2" color="initial">
                    {result?.referenceNo}
                  </Typography>
                </Grid>

                {/* <Grid item md={12} xs={12} sm={12} style={{ marginTop: "8px" }}>
                  <Label text="Reported Date" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body2" color="initial">
                    {result?.reportedOn}
                  </Typography>
                </Grid> */}

                <Grid item md={12} xs={12} sm={12} style={{ marginTop: "8px" }}>
                  <Label text="Hash Value" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  {result?.decryptedHash === result?.hashFromDB ? (
                    <ChipsWithIcon
                      status={true}
                      text={`${result?.decryptedHash?.slice(0, 30)} ...`}
                    />
                  ) : (
                    <ChipsWithIcon
                      status={false}
                      text={`${result?.decryptedHash?.slice(0, 30)} ...`}
                    />
                  )}
                </Grid>

                <Grid item md={12} xs={12} sm={12} style={{ marginTop: "8px" }}>
                  <Label text="Signature" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  {result?.signatureFromURL === result?.signatureFromDB ? (
                    <ChipsWithIcon
                      status={true}
                      text={`${result?.signatureFromURL?.slice(0, 30)} ...`}
                    />
                  ) : (
                    <ChipsWithIcon
                      status={false}
                      text={`${result?.signatureFromURL?.slice(0, 30)} ...`}
                    />
                  )}
                </Grid>
              </Grid>

              <Grid item md={12} xs={12} sm={12}></Grid>
            </Grid>
          ) : (
            <Grid
              container
              direction="row"
              alignItems="flex-start"
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
                <Typography variant="h5" color="initial" align="center">
                  <b>
                    ❌ This Medical report is not issued by Neuromed Digital
                    Healthcare Services.
                  </b>
                </Typography>
              </Grid>

              <Grid item container md={6} xs={12} sm={12}>
                <Grid item md={12} xs={12} sm={12}>
                  <img src={f} alt="qr" style={{ width: "100%" }} />
                </Grid>
              </Grid>

              <Grid
                item
                container
                md={6}
                xs={12}
                sm={12}
                style={{ marginTop: "16px" }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Label text="Application ID" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body2" color="initial">
                    {result?.referenceNo}
                  </Typography>
                </Grid>

                {/* <Grid item md={12} xs={12} sm={12} style={{ marginTop: "8px" }}>
                  <Label text="Issued Date" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  <Typography variant="body2" color="initial">
                    {result?.issued_date ? result?.issued_date : "-"}
                  </Typography>
                </Grid> */}

                <Grid item md={12} xs={12} sm={12} style={{ marginTop: "8px" }}>
                  <Label text="Hash Value" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  {result?.decryptedHash === result?.hashFromDB ? (
                    <ChipsWithIcon
                      status={true}
                      text={`${result?.hashFromDB?.slice(0, 30)} ...`}
                    />
                  ) : (
                    <ChipsWithIcon
                      status={false}
                      text={`${result?.hashFromDB?.slice(0, 30)} ...`}
                    />
                  )}
                </Grid>

                <Grid item md={12} xs={12} sm={12} style={{ marginTop: "8px" }}>
                  <Label text="Signature" marginBottom="0px" />
                </Grid>

                <Grid item md={12} xs={12} sm={12}>
                  {result?.signatureFromURL === result?.signatureFromDB ? (
                    <ChipsWithIcon
                      status={true}
                      text={`${result?.signatureFromURL?.slice(0, 30)} ...`}
                    />
                  ) : (
                    <ChipsWithIcon
                      status={false}
                      text={`${result?.signatureFromURL?.slice(0, 30)} ...`}
                    />
                  )}
                </Grid>

                {/* <Grid item md={12} xs={12} sm={12}>
              <Typography variant="body2" color="initial">
                {result?.signatureFromURL?.slice(0, 75)}
              </Typography>
            </Grid> */}
              </Grid>

              <Grid item md={12} xs={12} sm={12}></Grid>
            </Grid>
          )}
        </Container>
      )}
    </>
  );
}
