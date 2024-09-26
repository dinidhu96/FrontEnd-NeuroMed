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

export default function UploadLFR() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm({
    mode: "onSubmit",
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    reset: reset3,
    formState: { errors: errors3 },
  } = useForm({
    mode: "onSubmit",
  });

  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [error3, setError3] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const [invoice, setInvoice] = useState(null);

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
      setError(null);
      reset();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
      setSuccess(null);
      setPatient(null);
      reset();
      setLoading(false);
    }
  };

  const searchInvoice = async (d) => {
    try {
      console.log(d);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
        params: { id: d.ref },
      };

      setLoading(true);

      const response = await axios.get(`${endpoint}invoice`, config);

      console.log(response);
      setInvoice(response?.data?.data);
      setError2(null);
      reset2();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError2(err?.response?.data?.message);
      setSuccess(null);
      setInvoice(null);
      reset2();
      setLoading(false);
    }
  };

  const submit = async (d) => {
    try {
      console.log(d);

      if (!patient || !invoice) {
        throw new Error("Please add patient data");
      }

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
      };

      setLoading(true);
      let data = {
        nic: patient.nic,
        gender: patient.gender,
        fullname: patient.fullname,
        dob: patient.dob,
        doctor: invoice.doctor,
        hospital: invoice.hospital,
        invoiceRef: invoice.invoiceRef,
        collectedOn: invoice.createdDate,
        biiirubinTotal: d.biiirubinTotal,
        biiirubinDirect: d.biiirubinDirect,
        biiirubinIndirect: d.biiirubinIndirect,
        sgpt: d.sgpt,
        sgot: d.sgot,
        alkalinePhosphatase: d.alkalinePhosphatase,
        totalProteins: d.totalProteins,
        albumin: d.albumin,
        globulin: d.globulin,
        agRatio: d.agRatio,
      };

      console.log(data);
      const response = await axios.post(
        `${endpoint}upload-lfr`,
        {
          data,
        },
        config
      );

      console.log(response);
      setSuccess(response?.data?.message);
      setError3(null);
      // reset3();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError3(err?.response?.data?.message);
      setSuccess(null);
      // reset3();
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
                      <b>Upload LFR Form</b>
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
                      {...register("nic", {
                        required: "nic Number is required",
                      })}
                      error={errors.nic ? true : false}
                    />
                  </Grid>

                  {errors.nic ? (
                    <Grid item md={12} xs={12} sm={12}>
                      <FieldError
                        text={errors.nic ? errors.nic.message : null}
                      />
                    </Grid>
                  ) : null}

                  {error ? (
                    <Grid item md={12} xs={12} sm={12}>
                      <FieldError text={error} />
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
                      onClick={handleSubmit(searchPatient)}
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
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <Typography variant="h6" color="initial" align="left">
                      Invoice Data
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
                      label="Reference Number"
                      id="ref"
                      name="ref"
                      type="ref"
                      placeholder="CBP-019d19aa-a672-4ad4-a939-99cf3ec651f9"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register2("ref", {
                        required: "Reference Number is required",
                      })}
                      error={errors2.ref ? true : false}
                    />
                  </Grid>

                  {errors2.ref ? (
                    <Grid item md={12} xs={12} sm={12}>
                      <FieldError
                        text={errors2.ref ? errors2.ref.message : null}
                      />
                    </Grid>
                  ) : null}

                  {error2 ? (
                    <Grid item md={12} xs={12} sm={12}>
                      <FieldError text={error2} />
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
                      onClick={handleSubmit2(searchInvoice)}
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Search Invoice Date</b>
                    </Button>
                  </Grid>

                  {invoice ? (
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
                          Invoice Ref : {invoice?.invoiceRef}
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
                          Date :{" "}
                          {moment(Date.now(invoice?.createdDate)).format(
                            "YYYY-MM-DD"
                          )}
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
                          Hospital Name : {invoice?.hospital}
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
                          Doctor Name : {invoice?.doctor}
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
                      label="Biiirubin Total"
                      id="biiirubinTotal"
                      name="biiirubinTotal"
                      type="biiirubinTotal"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("biiirubinTotal", {
                        required: "Biiirubin Total is required",
                      })}
                      error={errors3.biiirubinTotal ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.biiirubinTotal
                          ? errors3.biiirubinTotal.message
                          : null
                      }
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
                      label="Biiirubin Direct"
                      id="biiirubinDirect"
                      name="biiirubinDirect"
                      type="biiirubinDirect"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("biiirubinDirect", {
                        required: "Biiirubin Direct is required",
                      })}
                      error={errors3.biiirubinDirect ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.biiirubinDirect
                          ? errors3.biiirubinDirect.message
                          : null
                      }
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
                      label="Biiirubin Indirect"
                      id="biiirubinIndirect"
                      name="biiirubinIndirect"
                      type="biiirubinIndirect"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("biiirubinIndirect", {
                        required: "Biiirubin Indirect is required",
                      })}
                      error={errors3.biiirubinIndirect ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.biiirubinIndirect
                          ? errors3.biiirubinIndirect.message
                          : null
                      }
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
                      label="SGPT (ALT)"
                      id="sgpt"
                      name="sgpt"
                      type="sgpt"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("sgpt", {
                        required: "SGPT (ALT) is required",
                      })}
                      error={errors3.sgpt ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.sgpt ? errors3.sgpt.message : null}
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
                      label="SGOT (AST)"
                      id="sgot"
                      name="sgot"
                      type="sgot"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("sgot", {
                        required: "SGOT (AST) is required",
                      })}
                      error={errors3.sgot ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.sgot ? errors3.sgot.message : null}
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
                      label="Alkaline Phosphatase"
                      id="alkalinePhosphatase"
                      name="alkalinePhosphatase"
                      type="alkalinePhosphatase"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("alkalinePhosphatase", {
                        required: "Alkaline Phosphatase is required",
                      })}
                      error={errors3.alkalinePhosphatase ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.alkalinePhosphatase
                          ? errors3.alkalinePhosphatase.message
                          : null
                      }
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
                      label="Total Proteins"
                      id="totalProteins"
                      name="totalProteins"
                      type="totalProteins"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("totalProteins", {
                        required: "Total Proteins is required",
                      })}
                      error={errors3.totalProteins ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.totalProteins
                          ? errors3.totalProteins.message
                          : null
                      }
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
                      label="Albumin"
                      id="albumin"
                      name="albumin"
                      type="albumin"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("albumin", {
                        required: "Albumin is required",
                      })}
                      error={errors3.albumin ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.albumin ? errors3.albumin.message : null}
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
                      label="Globulin"
                      id="globulin"
                      name="globulin"
                      type="globulin"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("globulin", {
                        required: "Globulin is required",
                      })}
                      error={errors3.globulin ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.globulin ? errors3.globulin.message : null}
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
                      label="A/G Ratio"
                      id="agRatio"
                      name="agRatio"
                      type="agRatio"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("agRatio", {
                        required: "A/G Ratio is required",
                      })}
                      error={errors3.agRatio ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.agRatio ? errors3.agRatio.message : null}
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "12px", textAlign: "left" }}
                  >
                    <Button
                      onClick={handleSubmit3(submit)}
                      type="submit"
                      size="large"
                      variant="contained"
                      color="primary"
                    >
                      <b>Submit Data</b>
                    </Button>
                  </Grid>

                  {error3 ? (
                    <Grid
                      item
                      md={12}
                      xs={12}
                      sm={12}
                      style={{ marginBottom: "24px" }}
                    >
                      <Alert severity="error">
                        <b>{error3}</b>
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
