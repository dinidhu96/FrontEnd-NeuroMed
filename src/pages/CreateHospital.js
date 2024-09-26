import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import FieldError from "../components/FieldError";
import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function CreateHospital() {
  const {
    watch,
    register,
    control,
    handleSubmit,
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
      console.log(d);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
      };

      setLoading(true);

      let data = {
        hospitalId: d.hospitalId,
        hospitalName: d.hospitalName,
      };

      const response = await axios.post(
        `${endpoint}create-hospital`,
        {
          data,
        },
        config
      );

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
      <Dashboard>
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
          <div>
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
              <form>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  style={{ padding: "24px" }}
                >
                  <Grid item md={12} xs={12} sm={12}>
                    <Typography
                      variant="h4"
                      color="initial"
                      style={{ marginBottom: "24px", textAlign: "center" }}
                    >
                      <b>Create Hospital Form</b>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="Hospital ID"
                      id="hospitalId"
                      name="hospitalId"
                      type="hospitalId"
                      placeholder="123456789V"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("hospitalId", {
                        required: "Hospital ID is required",
                      })}
                      error={errors.hospitalId ? true : false}
                    />

                    <FieldError
                      text={
                        errors.hospitalId ? errors.hospitalId.message : null
                      }
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="Hospital Name"
                      id="hospitalName"
                      name="hospitalName"
                      type="hospitalName"
                      placeholder="john doe"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("hospitalName", {
                        required: "Hospital Name is required",
                      })}
                      error={errors.hospitalName ? true : false}
                    />

                    <FieldError
                      text={
                        errors.hospitalName ? errors.hospitalName.message : null
                      }
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Button
                      onClick={handleSubmit(verify)}
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Create Hospital</b>
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
            </Container>
          </div>
        )}
      </Dashboard>
    </>
  );
}
