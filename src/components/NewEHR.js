import React from "react";
import { Grid, Typography } from "@material-ui/core";

function NewEHR({ ehr }) {
  return (
    <>
      {ehr.map((ehr) => {
        return (
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid blue",
              borderRadius: "24px",
              padding: "24px",
              marginBottom: "24px",
            }}
          >
            <Typography
              variant="h6"
              color="initial"
              align="left"
              style={{
                marginBottom: "32px",
              }}
            >
              <b>EHR ID : {ehr.ehrId}</b>
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
                <Typography variant="body1" color="initial" align="left">
                  Date : {ehr.date}
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
                  Title : {ehr.title}
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
                  Injuries : {ehr.injuries}
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
                  Medication : {ehr.medication}
                </Typography>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </>
  );
}

export default NewEHR;
