import React, { useEffect, useState } from "react";
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

import SubTitle from "../components/SubTitle";
import BodyText from "../components/BodyText";
import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";
import Label from "../components/Label";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function SingleApplication(props) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const token = JSON.parse(localStorage.getItem("jwt-token"));
    console.log(token);

    const config = {
      headers: { authorization: `Bearer ${token || null}` },
      params: { id: props.match.params.id },
    };

    axios
      .get(`${endpoint}view_application`, config)
      .then((response) => {
        console.log(response.data.data);

        setApplication(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setApplication(null);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const validate = async () => {
    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
      };

      let data = {
        application_id: application.application_id,
        id: application.id,
        created_at: application.created_at,
        nationality: application.nationality,
        citizen: application.citizen,
        age: application.age,
        citizenshipDate: application.citizenshipDate,
        leave: application.leave,
        DOB: application.DOB,
        oldNicNo: application.oldNicNo,
        confirmOldNicNo: application.confirmOldNicNo,
        newNicNo: application.newNicNo,
        confirmNewNicNo: application.confirmNewNicNo,
        passportNo: application.passportNo,
        confirmPassportNo: application.confirmPassportNo,
        country: application.country,
        reference: application.reference,
        authority: application.authority,
        address: application.address,
        status: "VALIDATED",
      };

      const valid = await axios.post(
        `${endpoint}validate_application`,
        { data },
        config,
        {
          withCredentials: true,
        }
      );

      console.log(valid);

      setLoading(false);
      props.history.push("/applications");
    } catch (error) {
      console.log(error);
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
      };

      let data = {
        ...application,
        status: "REJECTED",
      };

      const valid = await axios.post(
        `${endpoint}validate_application`,
        { data },
        config,
        {
          withCredentials: true,
        }
      );

      console.log(valid);

      setLoading(false);
      props.history.push("/applications");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Dashboard currentPath="/application">
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
              {application ? (
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
                        {application?.address}
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
                        text="High commission/embassy/consulate to which the certificate should be addressed to"
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
                  No Application Found
                </Typography>
              )}
            </Grid>
          </Container>
        )}
      </Dashboard>
    </>
  );
}
