import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";

import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";
import NewEHR from "../components/NewEHR";
import PastEhrNormal from "../components/PastEhrNormal";
import PastEhrCritical from "../components/PastEhrCritical";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function SingleEHR(props) {
  const [newEhr, setnewEhr] = useState([]);
  const [pastEhrNormal, setpastEhrNormal] = useState([]);
  const [pastEhrCritical, setpastEhrCritical] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("jwt-token"));
  console.log(token);

  useEffect(() => {
    setLoading(true);

    const config = {
      headers: { authorization: `Bearer ${token || null}` },
      params: { id: props.match.params.id },
    };

    axios
      .get(`${endpoint}get-ehr`, config)
      .then((response) => {
        console.log(response.data.data);

        let newEhr = [];
        let pastEhrNormal = [];
        let pastEhrCritical = [];

        response.data.data.map((data) => {
          if (data.ehrId.split("-")[1] === "New") {
            newEhr.push(data);
          }

          if (data.ehrId.split("-")[1] === "CRI") {
            pastEhrCritical.push(data);
          }

          if (data.ehrId.split("-")[1] === "NOR") {
            pastEhrNormal.push(data);
          }
        });

        setnewEhr(newEhr);
        setpastEhrNormal(pastEhrNormal);
        setpastEhrCritical(pastEhrCritical);
        setLoading(false);
      })
      .catch((error) => {
        setnewEhr([]);
        setpastEhrNormal([]);
        setpastEhrCritical([]);
        setLoading(false);
        console.log(error);
      });
    setLoading(false);
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
            {pastEhrNormal.length > 0 ? (
              <PastEhrNormal ehr={pastEhrNormal} />
            ) : null}
            {pastEhrCritical.length > 0 ? (
              <PastEhrCritical ehr={pastEhrCritical} />
            ) : null}
            {newEhr.length > 0 ? <NewEHR ehr={newEhr} /> : null}
          </Container>
        )}
      </Dashboard>
    </>
  );
}
