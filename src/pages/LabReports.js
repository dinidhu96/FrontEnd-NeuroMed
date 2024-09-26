import React, { useState, forwardRef, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, ErrorMessage, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { saveAs } from "file-saver";

import {
  Button,
  Container,
  Select,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  Divider,
} from "@material-ui/core";

import Label from "../components/Label";
import FieldError from "../components/FieldError";
import Spinner from "../components/Spinner";
import Dashboard from "../components/Dashboard";

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

export default function LabReports(props) {
  const {
    watch: watch3,
    register: register3,
    control: control3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    formState: { errors: errors3, isValid: isValid3 },
  } = useForm({
    mode: "onSubmit",
  });

  const [error, setError] = useState(null);
  const [error3, setError3] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async (d) => {
    try {
      console.log(d);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: {
          authorization: `Bearer ${token || null}`,
          "Content-Type": "multipart/form-data",
        },
        params: { id: d.invoiceRef },
        responseType: "arraybuffer",
      };

      setLoading(true);

      const { data } = await axios.get(`${endpoint}generate-pdf`, config);
      const blob = new Blob([data], { type: "application/pdf" });
      saveAs(blob, `${d.invoiceRef}.pdf`);

      // setSuccess(response?.data?.message);
      setError(null);
      reset3();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
      setSuccess(null);
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
                      <b>Search Lab Report</b>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <Typography variant="h6" color="initial" align="left">
                      Invoice Ref
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
                      label="Invoice Ref"
                      id="invoiceRef"
                      name="invoiceRef"
                      type="invoiceRef"
                      placeholder="CBP-1f752e4d"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("invoiceRef", {
                        required: "Invoice Ref is required",
                      })}
                      error={errors3.invoiceRef ? true : false}
                    />
                  </Grid>

                  {errors3.invoiceRef ? (
                    <Grid item md={12} xs={12} sm={12}>
                      <FieldError
                        text={
                          errors3.invoiceRef ? errors3.invoiceRef.message : null
                        }
                      />
                    </Grid>
                  ) : null}

                  {error3 ? (
                    <Grid item md={12} xs={12} sm={12}>
                      <FieldError text={error3} />
                    </Grid>
                  ) : null}

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "12px", textAlign: "left" }}
                  >
                    <Button
                      onClick={handleSubmit3(verify)}
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Search Lab Report</b>
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
