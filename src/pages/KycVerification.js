import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import KycVerification1 from "../components/KycVerification1";
import KycVerification2 from "../components/KycVerification2";
import KycVerification3 from "../components/KycVerification3";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
}));

function getSteps() {
  return ["Take a Selfie", "ID Front Photo", "ID Back Photo"];
}

export default function KycVerification(props) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.paper}>
      <Container
        maxWidth="md"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          padding: "24px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: `0px 10px 38px rgba(221, 230, 237, 1)`,
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          spacing={0}
          style={{ padding: "12px" }}
        >
          <Grid item md={12} xs={12} sm={12}>
            <Typography
              variant="h4"
              color="initial"
              style={{ marginBottom: "24px" }}
            >
              <b>KYC Verification</b>
            </Typography>
          </Grid>

          <Grid
            className={classes.root}
            container
            direction="column"
            item
            md={12}
            xs={12}
            sm={12}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <>
                  {activeStep === 0 ? (
                    <KycVerification1 kycToken={props.match.params.id} />
                  ) : null}
                  {activeStep === 1 ? (
                    <KycVerification2 kycToken={props.match.params.id} />
                  ) : null}
                  {activeStep === 2 ? (
                    <KycVerification3 kycToken={props.match.params.id} />
                  ) : null}

                  <div style={{ marginTop: "24px" }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </>
              )}
            </>
          </Grid>
        </Grid>

        <div className={classes.root}></div>
      </Container>
    </div>
  );
}
