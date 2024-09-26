import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ReactToPrint from "react-to-print";

import space from "../assets/images/space.jpg";
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

import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";
import { LaptopWindowsOutlined } from "@material-ui/icons";

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

class Print extends React.Component {
  render() {
    if (this.props.loading) {
      return (
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
      );
    } else {
      return (
        <div>
          {this.props.data ? (
            <>
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "left",
                  height: "600px",
                  maxWidth: "900px",
                  fontFamily: "times new roman",
                  fontSize: "16px",
                  marginTop: "0px",
                }}
              >
                <div style={{ backgroundColor: "white" }}>
                  <Grid
                    alignItems="space-between"
                    container
                    style={{
                      padding: "50px",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Grid
                      item
                      alignItems="center"
                      justify="space-between"
                      container
                      style={{
                        textAlign: "center",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Grid
                        item
                        alignItems="center"
                        justify="space-between"
                        container
                        style={{
                          textAlign: "center",
                          alignSelf: "flex-start",
                          paddingBottom: "24px",
                          borderBottom: "1px solid black",
                          marginBottom: "24px",
                        }}
                      >
                        <img
                          src={space}
                          alt="bat"
                          style={{ width: "100%", height: "1px" }}
                        />
                        <Grid
                          item
                          md={4}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          {/* <img
                            src={logo}
                            alt="logo"
                            style={{ width: "100%", maxWidth: "100px" }}
                          /> */}
                        </Grid>
                        <Grid
                          item
                          md={8}
                          style={{
                            textAlign: "right",
                            float: "right",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            Telephone - 2421111 / 2439185
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Fax - 2439188
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Email - medical@institute.lk
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid item alignItems="center" container>
                        <img
                          src={space}
                          alt="bat"
                          style={{ width: "100%", height: "1px" }}
                        />
                        <Grid
                          item
                          md={12}
                          style={{
                            textAlign: "left",
                            marginBottom: "24px",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            Invoice Reference : {this.props.data.invoiceRef}
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Date :{" "}
                            {moment(Date.now(this.props.data.date)).format(
                              "YYYY-MM-DD"
                            )}
                          </Typography>

                          <br />

                          <Typography variant="body2" color="initial">
                            Patient Name : {this.props.data.patientFirstname}{" "}
                            {this.props.data.patientLastname}
                          </Typography>
                          <Typography variant="body2" color="initial">
                            NIC : {this.props.data.patientNic}
                          </Typography>

                          <Typography variant="body2" color="initial">
                            Doctor Name : {this.props.data.doctor}
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Hospital Name : {this.props.data.hospital}
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Lab Type : {this.props.data.lab}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        alignItems="center"
                        justify="center"
                        container
                        style={{
                          textAlign: "center",
                          marginTop: "12px",
                        }}
                      >
                        <Grid
                          item
                          lg={12}
                          style={{
                            marginBottom: "12px",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="body1" color="initial">
                            <b>
                              <u>Payment Invoice</u>
                            </b>
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        alignItems="center"
                        justify="space-between"
                        container
                        style={{
                          textAlign: "center",
                          alignSelf: "flex-start",
                          backgroundColor: "#34d399",
                        }}
                      >
                        <img
                          src={space}
                          alt="bat"
                          style={{ width: "100%", height: "1px" }}
                        />

                        <div>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{
                              marginBottom: "8px",
                              padding: "8px",
                            }}
                          >
                            <b>Test Name</b>
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{
                              padding: "8px",
                            }}
                          >
                            <b>Payment</b>
                          </Typography>
                        </div>
                      </Grid>

                      <Grid
                        item
                        alignItems="center"
                        justify="space-between"
                        container
                        style={{
                          textAlign: "center",
                          alignSelf: "flex-start",
                          backgroundColor: "#86efac",
                        }}
                      >
                        <img
                          src={space}
                          alt="bat"
                          style={{ width: "100%", height: "1px" }}
                        />

                        <div>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{
                              marginBottom: "8px",
                              padding: "8px",
                            }}
                          >
                            {this.props.data.lab}
                          </Typography>
                        </div>
                        <div>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{
                              padding: "8px",
                            }}
                          >
                            {this.props.data.payment} LKR
                          </Typography>
                        </div>
                      </Grid>

                      <Grid
                        item
                        alignItems="center"
                        justify="center"
                        container
                        style={{
                          textAlign: "center",
                          marginTop: "12px",
                          borderTop: "1px solid black",
                        }}
                      >
                        <Grid
                          item
                          lg={12}
                          style={{
                            marginBottom: "12px",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="overline" color="initial">
                            <b>End of Invoice</b>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </>
          ) : (
            <Grid item md={12} xs={12} sm={12}>
              <Typography variant="body1" color="initial">
                No Invoice Available
              </Typography>
            </Grid>
          )}
        </div>
      );
    }
  }
}

const ViewInvoice = (props) => {
  const componentRef = useRef();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const token = JSON.parse(localStorage.getItem("jwt-token"));
  console.log(token);

  const config = {
    headers: { authorization: `Bearer ${token || null}` },
    params: { id: props.match.params.id },
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${endpoint}invoice`, config)
      .then((response) => {
        console.log(response.data.data);

        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <Dashboard>
      <Print ref={componentRef} props={props} loading={loading} data={data} />

      {!loading ? (
        <ReactToPrint
          trigger={() => (
            <Button
              style={{ marginTop: "24px" }}
              variant="contained"
              color="primary"
              disableElevation
            >
              Print / Download
            </Button>
          )}
          content={() => componentRef.current}
        />
      ) : (
        <>
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
        </>
      )}
    </Dashboard>
  );
};

export default ViewInvoice;
