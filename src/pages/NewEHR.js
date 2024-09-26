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

export default function NewEHR() {
  const classes = useStyles();
  let history = useHistory();

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

  const {
    watch: watch2,
    register: register2,
    control: control2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm({
    mode: "onSubmit",
  });

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

  const [illnesses, setIllnesses] = useState([]);
  const [patient, setPatient] = useState(null);

  const confirmPassword = useRef({});
  confirmPassword.current = watch("confirmPassword", "");

  const addIllness = (data) => {
    console.log(data);

    let list = illnesses;
    list.push(data);

    setIllnesses(list);
  };

  const searchPatient = async (d) => {
    try {
      console.log(d);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: d.nic },
      };

      setLoading(true);

      const response = await axios.get(`${endpoint}search-patient-lab`, config);

      console.log(response);
      setPatient(response?.data?.data);
      setError3(null);
      reset3();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError3(err?.response?.data?.message);
      setPatient(null);
      reset3();
      setLoading(false);
    }
  };

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
        nic: patient.nic,
        fullname: patient.fullname,
        doctor: d.doctor,
        date: d.date,
        title: d.title,
        description: d.description,
        medication: d.medication,
        injuries: d.injuries,
      };

      const response = await axios.post(
        `${endpoint}create-new-ehr`,
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
                      <b>New EHR Form</b>
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
                      Patient Data
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
                      {...register3("nic", {
                        required: "nic Number is required",
                      })}
                      error={errors3.nic ? true : false}
                    />
                  </Grid>

                  {errors3.nic ? (
                    <Grid item md={12} xs={12} sm={12}>
                      <FieldError
                        text={errors3.nic ? errors3.nic.message : null}
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
                      onClick={handleSubmit3(searchPatient)}
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Search Patient Data</b>
                    </Button>
                  </Grid>

                  {patient ? (
                    <>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "0px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Patient NIC : {patient?.nic}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "0px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Patient Name : {patient?.firstname}{" "}
                          {patient?.lastname}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "0px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Patient Gender : {patient?.gender}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        sm={12}
                        style={{ marginBottom: "0px" }}
                      >
                        <Typography
                          variant="body1"
                          color="initial"
                          align="left"
                        >
                          Patient Birthday : {patient?.dob}
                        </Typography>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </form>

              <form>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  style={{ padding: "24px" }}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="Doctor ID"
                      id="doctor"
                      name="doctor"
                      type="doctor"
                      placeholder="doctor"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("doctor", {
                        required: "Doctor ID is required",
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
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <Typography
                      variant="h5"
                      color="initial"
                      align="left"
                      style={{
                        marginBottom: "24px",
                        marginTop: "24px",
                        marginLeft: "8px",
                      }}
                    >
                      <b>Current Disease</b>
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
                      label="Title"
                      id="title"
                      name="title"
                      type="title"
                      placeholder="title"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("title", {
                        required: "Title is required",
                      })}
                      error={errors.title ? true : false}
                    />

                    <FieldError
                      text={errors.title ? errors.title.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="Description"
                      multiline
                      rows={4}
                      id="description"
                      name="description"
                      placeholder="description"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("description", {
                        required: "Description is required",
                      })}
                      error={errors.description ? true : false}
                    />

                    <FieldError
                      text={
                        errors.description ? errors.description.message : null
                      }
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
                      text={errors.lastDate ? errors.lastDate.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="medication"
                      multiline
                      rows={4}
                      id="medication"
                      name="medication"
                      placeholder="Current Medication"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("medication", {
                        required: "medication is required",
                      })}
                      error={errors.medication ? true : false}
                    />

                    <FieldError
                      text={
                        errors.medication ? errors.medication.message : null
                      }
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="injuries"
                      multiline
                      rows={4}
                      id="injuries"
                      name="injuries"
                      placeholder="Sustaining Injuries"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("injuries", {
                        required: "injuries is required",
                      })}
                      error={errors.injuries ? true : false}
                    />

                    <FieldError
                      text={errors.injuries ? errors.injuries.message : null}
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
                      <b>Create</b>
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
