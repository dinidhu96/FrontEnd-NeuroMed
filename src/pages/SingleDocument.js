import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Label from "../components/Label";
import SubTitle from "../components/SubTitle";
import BodyText from "../components/BodyText";
import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function SingleDocument(props) {
  const [application, setApplication] = useState(null);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("jwt-token"));
  console.log(token);

  const getApplication = async () => {
    try {
      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: props.match.params.id },
      };

      const response = await axios.get(`${endpoint}view_application`, config);

      setApplication(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setApplication(null);
      console.log(error);
    }
  };

  const getDocument = async () => {
    try {
      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: props.match.params.id },
      };

      const response = await axios.get(`${endpoint}view_document`, config);

      setDocument(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setDocument(null);
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const app = await getApplication();
      const doc = await getDocument();
      setLoading(false);
    })();
  }, []);

  const validate = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: props.match.params.id },
      };

      let data = {
        application_id: document.application_id,
        id: document.id,
        created_at: document.created_at,
        fullnameNIC: document.fullnameNIC,
        fullnamePassport: document.fullnamePassport,
        localAddress: document.localAddress,
        occupation: document.occupation,
        overseasAddress: document.overseasAddress,
        passportDate: document.passportDate,
        printName: document.printName,
        purpose: document.purpose,
        sex: document.sex,
        slfeb: document.slfeb,
        status: document.status,
        previous: document.previous,
        addressList: document.addressList,
        verified: "VERIFIED",
      };

      const valid = await axios.post(
        `${endpoint}validate_document",
        { data },
        config,
        {
          withCredentials: true,
        }
      );

      console.log(valid);
      props.history.push("/documents`
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const reject = async () => {
    try {
      setLoading(true);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: props.match.params.id },
      };

      let data = {
        application_id: document.application_id,
        id: document.id,
        created_at: document.created_at,
        fullnameNIC: document.fullnameNIC,
        fullnamePassport: document.fullnamePassport,
        localAddress: document.localAddress,
        occupation: document.occupation,
        overseasAddress: document.overseasAddress,
        passportDate: document.passportDate,
        printName: document.printName,
        purpose: document.purpose,
        sex: document.sex,
        slfeb: document.slfeb,
        status: document.status,
        previous: document.previous,
        addressList: document.addressList,
        verified: "REJECTED",
      };

      const valid = await axios.post(
        `${endpoint}validate_document`,
        { data },
        config,
        {
          withCredentials: true,
        }
      );

      console.log(valid);

      props.history.push("/documents");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Dashboard currentPath="/document">
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
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{
                textAlign: "left",
              }}
            >
              {application && document ? (
                <>
                  <Grid item md={12} xs={12} sm={12}>
                    <SubTitle text="USER INFORMATION" />
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Application Id" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application.application_id}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Nationalty" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application.nationality}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Were citizen of Sri Lanka"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application?.citizen ? application?.citizen : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Date of citizenship obtained from another country?"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application.DOB}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="NIC number" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application?.oldNicNo ? application.oldNicNo : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Confirm NIC number" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application?.confirmOldNicNo
                          ? application.confirmOldNicNo
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="New NIC number" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application?.newNicNo ? application.newNicNo : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Confirm new NIC number" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application?.confirmNewNicNo
                          ? application.confirmNewNicNo
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Passport number" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application.passportNo}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Confirm passport number"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application.confirmPassportNo}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: "24px" }}
                  >
                    <Divider />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: "24px" }}
                  >
                    <SubTitle text="AUTHORITY INFORMATION" />
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Country" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application.country}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Reference high commission/embassy/consulate"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application?.authority}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Address" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {application?.address}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: "24px" }}
                  >
                    <Divider />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: "24px" }}
                  >
                    <SubTitle text="DOCUMENT INFORMATION" />
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Full name as in the NIC"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.fullnameNIC}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Sex" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.sex}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Status" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.status}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Full name as in the Passport"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.fullnamePassport}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Which name should be printed in certificate"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.printName}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Passport issue date" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.passportDate}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Present address in Sri Lanka"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.localAddress ? document?.localAddress : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Present address (overseas)"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.overseasAddress
                          ? document?.overseasAddress
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Occupation" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.occupation}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label text="Purpose" marginBottom="0px" />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.purpose}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Have you applied for a certificate previously"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.previous ? document?.previous : "-"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    container
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "8px" }}
                  >
                    <Grid item md={12} xs={12} sm={12}>
                      <Label
                        text="Are you preferred applicant through the Sri Lanka Foreign Employement Beaureu (SLFEB)"
                        marginBottom="0px"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} sm={12}>
                      <Typography variant="body1" color="initial">
                        {document?.slfeb}
                      </Typography>
                    </Grid>
                  </Grid>

                  {document?.addressList.length > 0 ? (
                    <Grid
                      item
                      container
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginTop: "24px", marginBottom: "24px" }}
                    >
                      <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">
                                <b>Address</b>
                              </TableCell>
                              <TableCell>
                                <b>Police Area</b>
                              </TableCell>
                              <TableCell>
                                <b>From</b>
                              </TableCell>
                              <TableCell>
                                <b>To</b>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {document?.addressList.map((address) => (
                              <TableRow key={address.id}>
                                <TableCell align="left">
                                  {address.address}
                                </TableCell>
                                <TableCell align="left">
                                  {address.policeArea}
                                </TableCell>
                                <TableCell align="left">
                                  {address.from}
                                </TableCell>
                                <TableCell align="left">{address.to}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  ) : null}

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: "24px" }}
                  >
                    <Divider />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: "24px" }}
                  >
                    <SubTitle text="DOCUMENTS" />
                  </Grid>

                  <Grid
                    item
                    container
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    {document?.imagesList.map((image) => (
                      <Grid
                        container
                        item
                        md={3}
                        xs={12}
                        sm={12}
                        style={{
                          marginTop: "12px",
                          marginBottom: "12px",
                          padding: "12px",
                        }}
                      >
                        <Grid item md={12} xs={12} sm={12}>
                          <Label text={image?.name} marginBottom="0px" />
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                          <NavLink
                            to={`/image/${image?.filename}/${image?.name}`}
                          >
                            <img
                              src={`http://localhost:5001/images/${image?.filename}`}
                              alt="sdf"
                              style={{ width: "100%" }}
                            />
                          </NavLink>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginTop: "48px" }}
                  >
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      disableElevation
                      onClick={validate}
                    >
                      Validate Application
                    </Button>

                    <Button
                      size="large"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        marginLeft: "16px",
                      }}
                      variant="contained"
                      disableElevation
                      onClick={reject}
                    >
                      Reject Application
                    </Button>
                  </Grid>
                </>
              ) : (
                <Typography variant="body1" color="initial">
                  No Document Found
                </Typography>
              )}
            </Grid>
          </Container>
        )}
      </Dashboard>
    </>
  );
}
