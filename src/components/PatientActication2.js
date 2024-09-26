import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Context } from "../util/Provider";

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import PatientActivationStepper from "./PatientActivationStepper";
import FieldError from "./FieldError";
import Spinner from "./Spinner";

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    direction: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
  },
  paper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function PatientActivation2(props) {
  const classes = useStyles();
  const { currentUser } = useContext(Context);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async (d) => {
    try {
      setLoading(true);

      let nic = localStorage.getItem("nic");

      let data = {
        otp: d.otp,
        nic: JSON.parse(nic).nic,
      };

      const response = await axios.post(`${endpoint}patient-activation-otp`, {
        data,
      });

      console.log(response);
      setSuccess(response?.data?.message);
      setError(null);
      reset();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
      setSuccess(null);
      reset();
      setLoading(false);
    }
  };

  return (
    <>
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
        <form
          onSubmit={handleSubmit(verify)}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Grid
            md={6}
            xs={12}
            sm={12}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
            style={{ padding: "24px" }}
          >
            <Grid item md={12} xs={12} sm={12} style={{ marginBottom: "16px" }}>
              <TextField
                label="OTP"
                id="otp"
                name="otp"
                placeholder="123456"
                color="primary"
                variant="outlined"
                size="small"
                InputLabelProps={{
                  shrink: true,
                  className: classes.inputLabel,
                }}
                InputProps={{
                  className: classes.input,
                  autoComplete: "false",
                }}
                fullWidth
                {...register("otp", { required: "OTP is required" })}
                error={errors.otp ? true : false}
              />

              <FieldError
                text={errors.otp ? errors.otp.message : null}
                marginTop="8px"
              />
            </Grid>

            <Grid item md={12} xs={12} sm={12} style={{ marginBottom: "24px" }}>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                <b>Submit OTP</b>
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
        </form>
      )}
    </>
  );
}
