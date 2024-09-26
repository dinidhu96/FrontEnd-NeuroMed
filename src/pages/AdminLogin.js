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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from "@material-ui/core";

import FieldError from "../components/FieldError";
import Spinner from "../components/Spinner";

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

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

export default function AdminLogin(props) {
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
    mode: "all",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      props.history.push("/");
    }

    setLoading(false);
  }, []);

  const verify = async (d) => {
    try {
      setLoading(true);

      let data = {
        email: d.email,
        password: d.password,
        role: d.role,
      };

      const response = await axios.post(`${endpoint}admin-login`, {
        data,
      });

      console.log(response);
      setSuccess(response?.data?.message);
      setError(null);
      reset();

      //set token in local storage
      console.log(JSON.stringify(response?.data?.data));
      localStorage.setItem("jwt-token", JSON.stringify(response?.data?.data));

      window.location.reload();
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
        <div className={classes.paper}>
          <Container
            maxWidth="sm"
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
                spacing={0}
                style={{ padding: "24px" }}
              >
                <Grid item md={12} xs={12} sm={12}>
                  <Typography
                    variant="h4"
                    color="initial"
                    style={{ marginBottom: "24px" }}
                  >
                    <b>Management User Login</b>
                  </Typography>
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "16px" }}
                >
                  <TextField
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="XXXXXXXXXX"
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
                  md={12}
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "16px" }}
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
                  md={12}
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "24px" }}
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
                          <MenuItem value={"Doctor"}>Doctor</MenuItem>
                          <MenuItem value={"Medical Rep"}>Medical Rep</MenuItem>
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
                  md={12}
                  xs={12}
                  sm={12}
                  style={{ marginBottom: "24px" }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                  >
                    <b>Login</b>
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
                    Don't have an account? Create a new account
                    <NavLink to="/admin-register" style={{ color: "#000080" }}>
                      {" "}
                      <b>Here</b>
                    </NavLink>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Container>
        </div>
      )}
    </>
  );
}
