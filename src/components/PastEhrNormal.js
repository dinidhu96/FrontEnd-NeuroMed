import React from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";

function PastEhrNormal({ ehr }) {
  console.log(ehr);
  return (
    <>
      {ehr.map((ehr) => {
        return (
          <div
            style={{
              backgroundColor: "white",
              border: "2px solid green",
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
                  Date of last physical examination by the doctor :{" "}
                  {ehr.lastDate}
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
                  Blood Type : {ehr.blood}
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
                  Known food and medicine allergies : {ehr.allergies}
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
                  <b>Major illnesses and surgeries with respective dates </b>
                </Typography>
              </Grid>

              {ehr.illnesses.map((ill) => {
                return (
                  <>
                    <Grid
                      item
                      container
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Grid
                        item
                        md={4}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "12px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Title : {ill.title}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        md={4}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "12px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Type : {ill.type}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        md={4}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "12px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Date : {ill.illnessDate}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "12px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Description : {ill.description}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        md={12}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "12px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          a history of illnesses in your family : {ill.illness}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                );
              })}

              <Grid
                item
                md={12}
                xs={12}
                sm={12}
                style={{ marginBottom: "24px" }}
              >
                <Typography variant="h6" color="initial" align="left">
                  <b>Diabetes </b>
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
                  Weight : {ehr.weight}
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
                  Metformin : {ehr.metformin}
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
                  Insulin : {ehr.insulin}
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
                  Miglitol : {ehr.miglitol}
                </Typography>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </>
  );
}

export default PastEhrNormal;
