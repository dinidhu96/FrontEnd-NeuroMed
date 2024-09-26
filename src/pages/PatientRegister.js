import React, { useState, forwardRef, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, ErrorMessage, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import {
  Button,
  Container,
  Select,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";

import Label from "../components/Label";
import FieldError from "../components/FieldError";
import Spinner from "../components/Spinner";
import { DatePicker } from "@mui/x-date-pickers";
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

export default function PatientRegister() {
  const classes = useStyles();
  let history = useHistory();

  const {
    watch,
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const confirmPassword = useRef({});
  confirmPassword.current = watch("confirmPassword", "");

  console.log(errors);
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
        title: d.title,
        address: d.address,
        firstname: d.firstname,
        lastname: d.lastname,
        fullname: d.fullname,
        dob: d.dob,
        nic: d.nic,
        gender: d.gender,
        role: "Patient",
        email: d.email,
        mobile: d.mobile,
        landphone: d.landphone,
        guardianName: d.guardianName,
        guardianNic: d.guardianNic,
        guardianAddress: d.guardianAddress,
        guardianRelationship: d.guardianRelationship,
        guardianNumber: d.guardianNumber,
        registrationDate: d.registrationDate,
        city: d.city,
        postalCode: d.postalCode,
        wallet: d.wallet,
        hospitalId: d.hospitalId,
      };

      const response = await axios.post(
        `${endpoint}patient-register`,
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
              <form onSubmit={handleSubmit(verify)}>
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
                      <b>Patient Register</b>
                    </Typography>
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
                      error={errors.title ? true : false}
                    >
                      <InputLabel htmlFor="title">Title</InputLabel>
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title Required" }}
                        render={({ field }) => (
                          <Select labelId="title" label="Title" {...field}>
                            <MenuItem value={"Mr"}>Mr</MenuItem>
                            <MenuItem value={"Mrs"}>Mrs</MenuItem>
                            <MenuItem value={"Miss"}>Miss</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>

                    <FieldError
                      text={errors.title ? errors.title.message : null}
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
                      label="Firstname"
                      id="firstname"
                      name="firstname"
                      placeholder="John"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("firstname", {
                        required: "Firstname is required",
                      })}
                      error={errors.firstname ? true : false}
                    />

                    <FieldError
                      text={errors.firstname ? errors.firstname.message : null}
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
                      label="Lastname"
                      id="lastname"
                      name="lastname"
                      placeholder="Doe"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("lastname", {
                        required: "lastname is required",
                      })}
                      error={errors.lastname ? true : false}
                    />

                    <FieldError
                      text={errors.lastname ? errors.lastname.message : null}
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
                      label="Full Name as NIC"
                      id="fullname"
                      name="fullname"
                      placeholder="Doe"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("fullname", {
                        required: "fullname is required",
                      })}
                      error={errors.fullname ? true : false}
                    />

                    <FieldError
                      text={errors.fullname ? errors.fullname.message : null}
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
                      label="Address as NIC"
                      id="address"
                      name="address"
                      placeholder="Doe"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("address", {
                        required: "address is required",
                      })}
                      error={errors.address ? true : false}
                    />

                    <FieldError
                      text={errors.address ? errors.address.message : null}
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
                      label="Email"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="johndoe@gmail.com"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("email", { required: "Email is required" })}
                      error={errors.email ? true : false}
                    />

                    <FieldError
                      text={errors.email ? errors.email.message : null}
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
                      name="dob"
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
                              label="Date of Birth"
                              variant="outlined"
                              error={errors.dob ? true : false}
                              {...register("dob", {
                                required: "Date of Birth is required",
                              })}
                              {...restField}
                            />
                          )}
                        />
                      )}
                    />

                    <FieldError
                      text={errors.dob ? errors.dob.message : null}
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
                      label="NIC"
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
                    <TextField
                      label="Mobile"
                      id="mobile"
                      name="mobile"
                      type="mobile"
                      placeholder="0111234567"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("mobile", {
                        required: "mobile Number is required",
                      })}
                      error={errors.mobile ? true : false}
                    />

                    <FieldError
                      text={errors.mobile ? errors.mobile.message : null}
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
                      label="Land phone"
                      id="landphone"
                      name="landphone"
                      type="landphone"
                      placeholder="0111234567"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("landphone", {
                        required: "Landphone Number is required",
                      })}
                      error={errors.landphone ? true : false}
                    />

                    <FieldError
                      text={errors.landphone ? errors.landphone.message : null}
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
                      label="Gender"
                      id="gender"
                      name="gender"
                      type="gender"
                      placeholder="male"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("gender", {
                        required: "gender Number is required",
                      })}
                      error={errors.gender ? true : false}
                    />

                    <FieldError
                      text={errors.gender ? errors.gender.message : null}
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
                      label="City"
                      id="city"
                      name="city"
                      type="city"
                      placeholder="ratnapura"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("city", {
                        required: "City is required",
                      })}
                      error={errors.city ? true : false}
                    />

                    <FieldError
                      text={errors.city ? errors.city.message : null}
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
                      label="Postal Code"
                      id="postalCode"
                      name="postalCode"
                      type="postalCode"
                      placeholder="70000"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("postalCode", {
                        required: "Postal Code is required",
                      })}
                      error={errors.postalCode ? true : false}
                    />

                    <FieldError
                      text={
                        errors.postalCode ? errors.postalCode.message : null
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
                      name="registrationDate"
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
                              label="Registration Date"
                              variant="outlined"
                              error={errors.registrationDate ? true : false}
                              {...register("registrationDate", {
                                required: "Registration Date is required",
                              })}
                              {...restField}
                            />
                          )}
                        />
                      )}
                    />

                    <FieldError
                      text={
                        errors.registrationDate
                          ? errors.registrationDate.message
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
                      label="Name of Guardian"
                      id="guardianName"
                      name="guardianName"
                      type="guardianName"
                      placeholder="john doe"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("guardianName", {
                        required: "guardianName is required",
                      })}
                      error={errors.guardianName ? true : false}
                    />

                    <FieldError
                      text={
                        errors.guardianName ? errors.guardianName.message : null
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
                      label="NIC of Guardian"
                      id="guardianNic"
                      name="guardianNic"
                      type="guardianNic"
                      placeholder="123456789V"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("guardianNic", {
                        required: "guardianNic is required",
                      })}
                      error={errors.guardianNic ? true : false}
                    />

                    <FieldError
                      text={
                        errors.guardianNic ? errors.guardianNic.message : null
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
                      label="Address of Guardian"
                      id="guardianAddress"
                      name="guardianAddress"
                      type="guardianAddress"
                      placeholder="address"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("guardianAddress", {
                        required: "guardianAddress is required",
                      })}
                      error={errors.guardianAddress ? true : false}
                    />

                    <FieldError
                      text={
                        errors.guardianAddress
                          ? errors.guardianAddress.message
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
                      label="Relationship of Guardian"
                      id="guardianRelationship"
                      name="guardianRelationship"
                      type="guardianRelationship"
                      placeholder="father"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("guardianRelationship", {
                        required: "guardianRelationship is required",
                      })}
                      error={errors.guardianRelationship ? true : false}
                    />

                    <FieldError
                      text={
                        errors.guardianRelationship
                          ? errors.guardianRelationship.message
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
                      label="Telephone of Guardian"
                      id="guardianNumber"
                      name="guardianNumber"
                      type="guardianNumber"
                      placeholder="0771234567"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("guardianNumber", {
                        required: "guardianNumber is required",
                      })}
                      error={errors.guardianNumber ? true : false}
                    />

                    <FieldError
                      text={
                        errors.guardianNumber
                          ? errors.guardianNumber.message
                          : null
                      }
                      marginTop="8px"
                    />
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={6}
                    sm={6}
                    style={{ marginBottom: "0px" }}
                  >
                    <TextField
                      label="Wallet Address"
                      id="wallet"
                      name="wallet"
                      placeholder="1BoatSLRHtKNngkdXEeobR76b53LETtpyT"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("wallet", {
                        required: "Wallet Address is required",
                      })}
                      error={errors.wallet ? true : false}
                    />

                    <FieldError
                      text={errors.wallet ? errors.wallet.message : null}
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
                      label="Hospital ID"
                      id="hospitalId"
                      name="hospitalId"
                      type="hospitalId"
                      placeholder="hospitalId"
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
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "24px" }}
                  >
                    <Button
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

                  <Grid item md={12} xs={12} sm={12}>
                    <Typography variant="body1" color="initial">
                      Already have an account? please login{" "}
                      <NavLink to="/patient-login" style={{ color: "#000080" }}>
                        <b>here</b>
                      </NavLink>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            </Container>
          </div>
        )}
      </Dashboard>
    </>
  );
}
