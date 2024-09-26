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

export default function PastEHR() {
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
      if (illnesses.length > 0) {
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
          blood: d.blood,
          lastDate: d.lastDate,
          allergies: d.allergies,
          illnesses: illnesses,
          hypertension: d.hypertension,
          heartDisease: d.heartDisease,
          everMarried: d.everMarried,
          workType: d.workType,
          ResidenceType: d.ResidenceType,
          avgGlucoseLevel: d.avgGlucoseLevel,
          bmi: d.bmi,
          smokingStatus: d.smokingStatus,
          weight: d.weight,
          metformin: d.metformin,
          insulin: d.insulin,
          miglitol: d.miglitol,
          geneticRisk: d.geneticRisk,
          chestPain: d.chestPain,
          lungRealatedComplexities: d.lungRealatedComplexities,
          shortnessOfBreath: d.shortnessOfBreath,
          snoring: d.snoring,
          smokingHabits: d.smokingHabits,
        };

        const response = await axios.post(
          `${endpoint}create-ehr`,
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
      } else {
        setError(
          "Please add one or more to major illnesses and surgeries with respective dates"
        );
        setLoading(false);
      }
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
                      <b>Past EHR Form</b>
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
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                      error={errors.blood ? true : false}
                    >
                      <InputLabel htmlFor="blood1">Blood Type</InputLabel>
                      <Controller
                        name="blood"
                        control={control}
                        rules={{ required: "Blood Type Required" }}
                        render={({ field }) => (
                          <Select labelId="blood" label="Blood Type" {...field}>
                            <MenuItem value={"A+"}>A+</MenuItem>
                            <MenuItem value={"AB+"}>AB+</MenuItem>
                            <MenuItem value={"B+"}>B+</MenuItem>
                            <MenuItem value={"O+"}>O+</MenuItem>
                            <MenuItem value={"A-"}>A-</MenuItem>
                            <MenuItem value={"AB-"}>AB-</MenuItem>
                            <MenuItem value={"B-"}>B-</MenuItem>
                            <MenuItem value={"O-"}>O-</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>

                    <FieldError
                      text={errors.blood ? errors.blood.message : null}
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
                      name="lastDate"
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
                              label="Date of last physical examination by the doctor"
                              variant="outlined"
                              error={errors.lastDate ? true : false}
                              {...register("lastDate", {
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
                    md={6}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="Known food and medicine allergies"
                      id="allergies"
                      name="allergies"
                      type="allergies"
                      placeholder="allergies"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("allergies", {
                        required:
                          "Known food and medicine allergies is required",
                      })}
                      error={errors.allergies ? true : false}
                    />

                    <FieldError
                      text={errors.allergies ? errors.allergies.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "0px" }}
                  >
                    <Divider />
                  </Grid>

                  <Typography
                    variant="h5"
                    color="initial"
                    style={{
                      marginBottom: "24px",
                      marginTop: "24px",
                      marginLeft: "8px",
                    }}
                  >
                    <b>Major illnesses and surgeries with respective dates</b>
                  </Typography>

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
                      error={errors2.type ? true : false}
                    >
                      <InputLabel htmlFor="Type">Type</InputLabel>
                      <Controller
                        name="type"
                        control={control2}
                        rules={{ required: "Type Required" }}
                        render={({ field }) => (
                          <Select labelId="Type" label="Type" {...field}>
                            <MenuItem value={"illnesses "}>illnesses </MenuItem>
                            <MenuItem value={"surgery"}>surgery</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>

                    <FieldError
                      text={errors2.type ? errors2.type.message : null}
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
                      label="Title"
                      id="title"
                      name="title"
                      type="title"
                      placeholder="title"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register2("title", {
                        required: "Title is required",
                      })}
                      error={errors2.title ? true : false}
                    />

                    <FieldError
                      text={errors2.title ? errors2.title.message : null}
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
                      type="description"
                      placeholder="description"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register2("description", {
                        required: "Description is required",
                      })}
                      error={errors2.description ? true : false}
                    />

                    <FieldError
                      text={
                        errors2.description ? errors2.description.message : null
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
                      name="illnessDate"
                      defaultValue={null}
                      control={control2}
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
                              error={errors2.illnessDate ? true : false}
                              {...register2("illnessDate", {
                                required: "Date is required",
                              })}
                              {...restField}
                            />
                          )}
                        />
                      )}
                    />

                    <FieldError
                      text={
                        errors2.illnessDate ? errors2.illnessDate.message : null
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
                      label="a history of illnesses in your family"
                      id="illness"
                      name="illness"
                      type="illness"
                      multiline
                      rows={4}
                      placeholder="illness"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register2("illness", {
                        required:
                          "a history of illnesses in your family is required",
                      })}
                      error={errors2.illness ? true : false}
                    />

                    <FieldError
                      text={errors2.illness ? errors2.illness.message : null}
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
                      onClick={handleSubmit2(addIllness)}
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Add</b>
                    </Button>
                  </Grid>

                  {illnesses.map((illness) => {
                    return (
                      <Grid
                        item
                        container
                        md={12}
                        xs={12}
                        sm={12}
                        style={{
                          marginBottom: "24px",
                          textAlign: "left",
                          backgroundColor: "#f9f9f9",
                          padding: "24px",
                        }}
                      >
                        <Grid item md={6} xs={12} sm={12}>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "6px" }}
                          >
                            <b>Title</b>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "12px" }}
                          >
                            {illness.title}
                          </Typography>
                        </Grid>

                        <Grid item md={6} xs={12} sm={12}>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "6px" }}
                          >
                            <b>Type</b>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "12px" }}
                          >
                            {illness.type}
                          </Typography>
                        </Grid>

                        <Grid item md={6} xs={12} sm={12}>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "6px" }}
                          >
                            <b>Date</b>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "12px" }}
                          >
                            {illness.illnessDate}
                          </Typography>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "6px" }}
                          >
                            <b>Description</b>
                          </Typography>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "12px" }}
                          >
                            {illness.description}
                          </Typography>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                          <Typography
                            variant="body2"
                            color="initial"
                            style={{ marginBottom: "6px" }}
                          >
                            <b>A history of illnesses in your family</b>
                          </Typography>
                          <Typography variant="body2" color="initial">
                            {illness.illness}
                          </Typography>
                        </Grid>
                      </Grid>
                    );
                  })}

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "0px" }}
                  >
                    <Divider />
                  </Grid>

                  <Typography
                    variant="h5"
                    color="initial"
                    style={{
                      marginBottom: "12px",
                      marginTop: "12px",
                      marginLeft: "8px",
                    }}
                  >
                    <b>Information considering several disease types</b>
                  </Typography>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "0px" }}
                  >
                    <Typography variant="h6" color="initial">
                      Heart Disease
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
                      label="Hypertension"
                      id="hypertension"
                      name="hypertension"
                      placeholder="hypertension"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("hypertension", {
                        required: "hypertension is required",
                      })}
                      error={errors.hypertension ? true : false}
                    />

                    <FieldError
                      text={
                        errors.hypertension ? errors.hypertension.message : null
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
                      label="Heart disease"
                      id="heartDisease"
                      name="heartDisease"
                      placeholder="heartDisease"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("heartDisease", {
                        required: "Heart disease is required",
                      })}
                      error={errors.heartDisease ? true : false}
                    />

                    <FieldError
                      text={
                        errors.heartDisease ? errors.heartDisease.message : null
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
                      label="Ever Married"
                      id="everMarried"
                      name="everMarried"
                      placeholder="everMarried"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("everMarried", {
                        required: "Ever Married is required",
                      })}
                      error={errors.everMarried ? true : false}
                    />

                    <FieldError
                      text={
                        errors.everMarried ? errors.everMarried.message : null
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
                      label="Work Type"
                      id="workType"
                      name="workType"
                      placeholder="workType"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("workType", {
                        required: "Work Type is required",
                      })}
                      error={errors.workType ? true : false}
                    />

                    <FieldError
                      text={errors.workType ? errors.workType.message : null}
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
                      label="Residence Type"
                      id="ResidenceType"
                      name="ResidenceType"
                      placeholder="ResidenceType"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("ResidenceType", {
                        required: "Residence Type is required",
                      })}
                      error={errors.ResidenceType ? true : false}
                    />

                    <FieldError
                      text={
                        errors.ResidenceType
                          ? errors.ResidenceType.message
                          : null
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
                      label="Average Glucose Level"
                      id="avgGlucoseLevel"
                      name="avgGlucoseLevel"
                      placeholder="avgGlucoseLevel"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("avgGlucoseLevel", {
                        required: "Average Glucose Level is required",
                      })}
                      error={errors.avgGlucoseLevel ? true : false}
                    />

                    <FieldError
                      text={
                        errors.avgGlucoseLevel
                          ? errors.avgGlucoseLevel.message
                          : null
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
                      label="BMI"
                      id="bmi"
                      name="bmi"
                      placeholder="bmi"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("bmi", {
                        required: "BMI is required",
                      })}
                      error={errors.bmi ? true : false}
                    />

                    <FieldError
                      text={errors.bmi ? errors.bmi.message : null}
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
                      label="Smoking Status"
                      id="smokingStatus"
                      name="smokingStatus"
                      placeholder="smokingStatus"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("smokingStatus", {
                        required: "Smoking Status is required",
                      })}
                      error={errors.smokingStatus ? true : false}
                    />

                    <FieldError
                      text={
                        errors.smokingStatus
                          ? errors.smokingStatus.message
                          : null
                      }
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "0px" }}
                  >
                    <Typography variant="h6" color="initial">
                      Diabetes
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
                      label="Weight"
                      id="weight"
                      name="weight"
                      placeholder="weight"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("weight", {
                        required: "Weight is required",
                      })}
                      error={errors.weight ? true : false}
                    />

                    <FieldError
                      text={errors.weight ? errors.weight.message : null}
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
                      label="Metformin"
                      id="metformin"
                      name="metformin"
                      placeholder="metformin"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("metformin", {
                        required: "Metformin is required",
                      })}
                      error={errors.metformin ? true : false}
                    />

                    <FieldError
                      text={errors.metformin ? errors.metformin.message : null}
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
                      label="Insulin"
                      id="insulin"
                      name="insulin"
                      placeholder="insulin"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("insulin", {
                        required: "Insulin is required",
                      })}
                      error={errors.insulin ? true : false}
                    />

                    <FieldError
                      text={errors.insulin ? errors.insulin.message : null}
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
                      label="Miglitol"
                      id="miglitol"
                      name="miglitol"
                      placeholder="miglitol"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("miglitol", {
                        required: "Miglitol is required",
                      })}
                      error={errors.miglitol ? true : false}
                    />

                    <FieldError
                      text={errors.miglitol ? errors.miglitol.message : null}
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ textAlign: "left", marginBottom: "0px" }}
                  >
                    <Typography variant="h6" color="initial">
                      Cancer
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
                      label="Genetic Risk"
                      id="geneticRisk"
                      name="geneticRisk"
                      placeholder="geneticRisk"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("geneticRisk", {
                        required: "Genetic Risk is required",
                      })}
                      error={errors.geneticRisk ? true : false}
                    />

                    <FieldError
                      text={
                        errors.geneticRisk ? errors.geneticRisk.message : null
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
                      label="Chest Pain"
                      id="chestPain"
                      name="chestPain"
                      placeholder="chestPain"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("chestPain", {
                        required: "Chest Pain is required",
                      })}
                      error={errors.chestPain ? true : false}
                    />

                    <FieldError
                      text={errors.chestPain ? errors.chestPain.message : null}
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
                      label="Lung Realated Complexities"
                      id="lungRealatedComplexities"
                      name="lungRealatedComplexities"
                      placeholder="lungRealatedComplexities"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("lungRealatedComplexities", {
                        required: "Lung Realated Complexities is required",
                      })}
                      error={errors.lungRealatedComplexities ? true : false}
                    />

                    <FieldError
                      text={
                        errors.lungRealatedComplexities
                          ? errors.lungRealatedComplexities.message
                          : null
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
                      label="Shortness Of Breath"
                      id="shortnessOfBreath"
                      name="shortnessOfBreath"
                      placeholder="shortnessOfBreath"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("shortnessOfBreath", {
                        required: "Shortness Of Breath is required",
                      })}
                      error={errors.shortnessOfBreath ? true : false}
                    />

                    <FieldError
                      text={
                        errors.shortnessOfBreath
                          ? errors.shortnessOfBreath.message
                          : null
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
                      label="Snoring"
                      id="snoring"
                      name="snoring"
                      placeholder="snoring"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("snoring", {
                        required: "Snoring is required",
                      })}
                      error={errors.snoring ? true : false}
                    />

                    <FieldError
                      text={errors.snoring ? errors.snoring.message : null}
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
                      label="Smoking Habits"
                      id="smokingHabits"
                      name="smokingHabits"
                      placeholder="smokingHabits"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("smokingHabits", {
                        required: "Smoking Habits is required",
                      })}
                      error={errors.smokingHabits ? true : false}
                    />

                    <FieldError
                      text={
                        errors.smokingHabits
                          ? errors.smokingHabits.message
                          : null
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
