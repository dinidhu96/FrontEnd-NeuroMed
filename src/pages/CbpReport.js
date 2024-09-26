import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

import space from "../assets/images/space.jpg";
import qr from "../assets/images/qrcode.png";

import { Button, Grid, Typography } from "@material-ui/core";

import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

class Print extends React.Component {
  generateQR = async () => {
    try {
      const response = await axios.get("http://localhost:5000/generate_qr", {
        params: { id: this.props.props.match.params.id },
      });
      console.log(response.data.data);

      if (response.data.data) {
      }

      this.setState({ data: response.data.data });
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ data: null });
      this.setState({ loading: false });
    }
  };

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
          {!this.props.data ? (
            <>
              <div
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "left",
                  height: "1100px",
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
                            Telephone - 0112566566 / 0701221122
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Fax - 2566566
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Email - support@nuromed.lk
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
                          borderBottom: "1px solid black",
                          paddingBottom: "24px",
                        }}
                      >
                        <img
                          src={space}
                          alt="bat"
                          style={{ width: "100%", height: "1px" }}
                        />
                        <Grid
                          item
                          md={6}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            Name : Dinidhu Jayasinghe
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Age / Gender : 25 / Male
                          </Typography>
                          <Typography variant="body2" color="initial">
                            NIC : 199632500738
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Ref Dr : Dr.Dushyantha
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Ref No : CBP-8a67ef3d
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={6}
                          style={{
                            textAlign: "right",
                            float: "right",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            Sample Type : CBP
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Registered On : 2022.10.12
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Collected On : 2022.10.12
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Reported On : 2022.10.12
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
                              <u>Complete Blood Picture (CBP)</u>
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
                          paddingBottom: "12px",
                        }}
                      >
                        <img
                          src={space}
                          alt="bat"
                          style={{ width: "100%", height: "1px" }}
                        />
                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "8px" }}
                          >
                            <b>Test Name</b>
                          </Typography>
                          <Typography variant="body2" color="initial">
                            HEMOGLOBIN
                          </Typography>
                          <Typography variant="body2" color="initial">
                            PCV
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Total RBC Count
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Platelet Count
                          </Typography>
                          <Typography variant="body2" color="initial">
                            Total WBC Count
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "8px" }}
                          >
                            <b>Observerd Values</b>
                          </Typography>
                          <Typography variant="body2" color="initial">
                            11.6
                            {/* {this.props.hemo < 11.1 ||
                            this.props.hemo > 14.6 ? (
                              <span
                                style={{
                                  backgroundColor: "orange",
                                }}
                              >
                                <b>{this.props.hemo}</b>
                              </span>
                            ) : (
                              this.props.hemo
                            )} */}
                          </Typography>
                          <Typography variant="body2" color="initial">
                            32.4
                          </Typography>
                          <Typography variant="body2" color="initial">
                            4.55
                          </Typography>
                          <Typography variant="body2" color="initial">
                            2.08
                          </Typography>
                          <Typography variant="body2" color="initial">
                            5400
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "8px" }}
                          >
                            <b>Units</b>
                          </Typography>
                          <Typography variant="body2" color="initial">
                            gm/dL
                          </Typography>
                          <Typography variant="body2" color="initial">
                            %
                          </Typography>
                          <Typography variant="body2" color="initial">
                            millions/cumm
                          </Typography>
                          <Typography variant="body2" color="initial">
                            lakhs/cumm
                          </Typography>
                          <Typography variant="body2" color="initial">
                            cells/cumm
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "right",
                            float: "right",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "8px" }}
                          >
                            <b>Biological Reference Intervals</b>
                          </Typography>
                          <Typography variant="body2" color="initial">
                            11.1 - 14.6
                          </Typography>
                          <Typography variant="body2" color="initial">
                            30 - 38
                          </Typography>
                          <Typography variant="body2" color="initial">
                            3.9 - 5.2
                          </Typography>
                          <Typography variant="body2" color="initial">
                            2.0 - 5.5
                          </Typography>
                          <Typography variant="body2" color="initial">
                            5000 - 16000
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        alignItems="center"
                        justify="center"
                        container
                        style={{
                          textAlign: "left",
                          marginTop: "12px",
                        }}
                      >
                        <Grid
                          item
                          lg={12}
                          style={{
                            marginBottom: "12px",
                            textAlign: "left",
                          }}
                        >
                          <Typography variant="body1" color="initial">
                            <b>
                              <u>Differential Count</u>
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
                          paddingBottom: "12px",
                        }}
                      >
                        <img
                          src={space}
                          alt="bat"
                          style={{ width: "100%", height: "1px" }}
                        />
                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            NEUTROPHILS
                          </Typography>
                          <Typography variant="body2" color="initial">
                            LYMPHOCYTES
                          </Typography>
                          <Typography variant="body2" color="initial">
                            EOSINOPHILS
                          </Typography>
                          <Typography variant="body2" color="initial">
                            MONOCYTES
                          </Typography>
                          <Typography variant="body2" color="initial">
                            BASOPHILS
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            55
                          </Typography>
                          <Typography variant="body2" color="initial">
                            36
                          </Typography>
                          <Typography variant="body2" color="initial">
                            05
                          </Typography>
                          <Typography variant="body2" color="initial">
                            06
                          </Typography>
                          <Typography variant="body2" color="initial">
                            00
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "left",
                            float: "left",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            %
                          </Typography>
                          <Typography variant="body2" color="initial">
                            %
                          </Typography>
                          <Typography variant="body2" color="initial">
                            %
                          </Typography>
                          <Typography variant="body2" color="initial">
                            %
                          </Typography>
                          <Typography variant="body2" color="initial">
                            %
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={3}
                          style={{
                            textAlign: "right",
                            float: "right",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            30 - 53
                          </Typography>
                          <Typography variant="body2" color="initial">
                            58 - 69
                          </Typography>
                          <Typography variant="body2" color="initial">
                            2 - 6
                          </Typography>
                          <Typography variant="body2" color="initial">
                            3 - 7
                          </Typography>
                          <Typography variant="body2" color="initial">
                            0 - 2
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        alignItems="center"
                        justify="center"
                        container
                        style={{
                          textAlign: "left",
                          marginTop: "12px",
                        }}
                      >
                        <Grid
                          item
                          lg={12}
                          style={{
                            marginBottom: "12px",
                            textAlign: "left",
                          }}
                        >
                          <Typography variant="body1" color="initial">
                            <b>
                              <u>Peripheral Smear</u>
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
                          paddingBottom: "12px",
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
                          <Typography variant="body2" color="initial">
                            R B C MORPHOLOGY
                          </Typography>
                          <Typography variant="body2" color="initial">
                            W B C
                          </Typography>
                          <Typography variant="body2" color="initial">
                            PLATEKETS
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          md={8}
                          style={{
                            textAlign: "left",
                          }}
                        >
                          <Typography variant="body2" color="initial">
                            NORMOCYTIC NORMOCHROMIC
                          </Typography>
                          <Typography variant="body2" color="initial">
                            LEUCOPENIA WITH NETROPHILIC PREDOMINANCE
                          </Typography>
                          <Typography variant="body2" color="initial">
                            ADEQUATE
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
                            <b>End of Report</b>
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
                          marginTop: "24px",
                        }}
                      >
                        <Grid
                          item
                          lg={12}
                          style={{
                            marginBottom: "24px",
                            textAlign: "center",
                          }}
                        >
                          <img
                            src={qr}
                            style={{ maxWidth: "200px" }}
                            alt="qr"
                          />
                          <Typography variant="body1" color="initial">
                            <b>SCAN ME</b>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </>
          ) : null}
        </div>
      );
    }
  }
}

const CbpReport = (props) => {
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
      .get(`${endpoint}view_qr`, config)
      .then((response) => {
        console.log(response.data.data);

        // setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const generateQR = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${endpoint}generate_qr`, config);
      console.log(response.data);

      window.location.reload();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <Print
        ref={componentRef}
        props={props}
        loading={loading}
        data={data}
        hemo={10}
      />

      {!data && !loading ? (
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
          <Grid
            container
            component="main"
            spacing={3}
            style={{
              display: "flex",
              direction: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "90vh",
            }}
          >
            <Grid item md={12} sm={12} xs={12}>
              <Typography variant="h6" color="initial">
                Certificate Not Found, Try Generating the QR Code :)
              </Typography>
              <Button
                onClick={generateQR}
                style={{ marginTop: "24px" }}
                variant="contained"
                color="primary"
                disableElevation
              >
                Generate QR Code
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Dashboard>
  );
};

export default CbpReport;
