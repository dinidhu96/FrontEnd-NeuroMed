import React, { useState, forwardRef, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, ErrorMessage, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//

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

export default function LabInvoice() {
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
        nic: d.nic,
        lab: d.lab,
        date: d.date,
        doctor: d.doctor,
        hospital: d.hospital,
      };

      const response = await axios.post(
        `${endpoint}create-invoice`,
        {
          data,
        },
        config
      );

      console.log(response);
      setSuccess(response?.data?.message);
      setError(null);
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
                      <b>Lab Invoice Form</b>
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
                      label="Patient NIC"
                      id="nic"
                      name="nic"
                      type="nic"
                      placeholder="123456789V"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("nic", {
                        required: "nic Number is required",
                      })}
                      error={errors.nic ? true : false}
                    />

                    <FieldError
                      text={errors.nic ? errors.nic.message : null}
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
                    <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                      error={errors.lab ? true : false}
                    >
                      <InputLabel htmlFor="lab">Lab Type</InputLabel>
                      <Controller
                        name="lab"
                        control={control}
                        rules={{ required: "Lab Type Required" }}
                        render={({ field }) => (
                          <Select labelId="lab" label="lab Type" {...field}>
                            <MenuItem value={"CBP"}>CBP</MenuItem>
                            <MenuItem value={"URINE ROUTINE"}>
                              URINE ROUTINE
                            </MenuItem>
                            <MenuItem value={"LFR"}>LFR</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>

                    <FieldError
                      text={errors.lab ? errors.lab.message : null}
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
                      label="Doctor Name"
                      id="doctor"
                      name="doctor"
                      type="doctor"
                      placeholder="john doe"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("doctor", {
                        required: "Doctor Name is required",
                      })}
                      error={errors.doctor ? true : false}
                    />

                    <FieldError
                      text={errors.doctor ? errors.doctor.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "0px" }}
                  >
                    <Controller
                      name="date"
                      defaultValue={null}
                      control={control}
                      render={({ field, ...restField }) => (
                        <DatePicker
                          inputFormat="MM/dd/yyyy"
                          onChange={(date) => {
                            field.onChange(moment(date).format("YYYY-MM-DD"));
                          }}
                          value={field.value}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              fullWidth
                              label="Date"
                              variant="outlined"
                              error={errors.date ? true : false}
                              {...register("date", {
                                required: "Date is required",
                              })}
                              {...restField}
                            />
                          )}
                        />
                      )}
                    />

                    <FieldError
                      text={errors.date ? errors.date.message : null}
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
                      id="hospital"
                      name="hospital"
                      type="hospital"
                      placeholder="john doe"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("hospital", {
                        required: "Hospital Name is required",
                      })}
                      error={errors.hospital ? true : false}
                    />

                    <FieldError
                      text={errors.hospital ? errors.hospital.message : null}
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
                      <b>Create Invoice</b>
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
