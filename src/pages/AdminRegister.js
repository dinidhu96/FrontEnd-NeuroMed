import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";

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

import FieldError from "../components/FieldError";
import Spinner from "../components/Spinner";
import { DatePicker } from "@mui/x-date-pickers";
import Dashboard from "../components/Dashboard";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

export default function AdminRegister() {
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

  const role = useRef({});
  role.current = watch("role", "");
  console.log(role);

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
        firstname: d.firstname,
        lastname: d.lastname,
        dob: d.dob,
        nic: d.nic,
        address1: d.address1,
        address2: d.address2,
        gender: d.gender,
        role: d.role,
        fullname: d.fullname,
        email: d.email,
        mobile: d.mobile,
        password: d.password,
        confirmPassword: d.confirmPassword,
        wallet: d.wallet,
        hospitalId: d.hospitalId,
      };

      const response = await axios.post(
        `${endpoint}admin-register`,
        {
          data,
        },
        config
      );

      console.log(response.data.data);
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
                      <b>Create Management Users</b>
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
                      label="Address Line 1"
                      id="address1"
                      name="address1"
                      type="address1"
                      placeholder="address1"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("address1", {
                        required: "address1 Number is required",
                      })}
                      error={errors.address1 ? true : false}
                    />

                    <FieldError
                      text={errors.address1 ? errors.address1.message : null}
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
                      label="Address Line 2"
                      id="address2"
                      name="address2"
                      type="address2"
                      placeholder="address2"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("address2", {
                        required: "address2 Number is required",
                      })}
                      error={errors.address2 ? true : false}
                    />

                    <FieldError
                      text={errors.address2 ? errors.address2.message : null}
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
                      error={errors.role ? true : false}
                    >
                      <InputLabel htmlFor="role">Role</InputLabel>
                      <Controller
                        name="role"
                        control={control}
                        rules={{ required: "Role Required" }}
                        render={({ field }) => (
                          <Select labelId="role" label="role" {...field}>
                            <MenuItem value={"Hospital Admin"}>
                              Hospital Admin
                            </MenuItem>
                            <MenuItem value={"Medical Rep"}>
                              Medical Rep
                            </MenuItem>
                            <MenuItem value={"Doctor"}>Doctor</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>

                    <FieldError
                      text={errors.role ? errors.role.message : null}
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
                        required: role.current === "Hospital Admin",
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
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="***********"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("password", {
                        required: "Password is required",
                      })}
                      error={errors.password ? true : false}
                    />

                    <FieldError
                      text={errors.password ? errors.password.message : null}
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
                      label="Confirm Password"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="***********"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === confirmPassword.current ||
                          "Password does not match",
                      })}
                      error={errors.confirmPassword ? true : false}
                    />

                    <FieldError
                      text={
                        errors.confirmPassword
                          ? errors.confirmPassword.message
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
                      <NavLink to="/admin-login" style={{ color: "#000080" }}>
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
