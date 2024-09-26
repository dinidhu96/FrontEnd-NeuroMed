import React, { useState, forwardRef, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, ErrorMessage, Controller } from "react-hook-form";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addLabReport } from "../Web3Client";

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

export default function UploadCBP() {
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
        params: { id: d.ref, nic: patient.nic },
      };

      setLoading(true);

      const response = await axios.get(`${endpoint}search-invoice-lab`, config);

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
        HEMOGLOBIN: d.HEMOGLOBIN,
        PCV: d.PCV,
        TRBC: d.TRBC,
        platelet: d.platelet,
        TWBC: d.TWBC,
        NEUTROPHILS: d.NEUTROPHILS,
        LYMPHOCYTES: d.LYMPHOCYTES,
        EOSINOPHILS: d.EOSINOPHILS,
        MONOCYTES: d.MONOCYTES,
        BASOPHILS: d.BASOPHILS,
        RBCMORPHOLOGY: d.RBCMORPHOLOGY,
        WBC: d.WBC,
        PLATEKETS: d.PLATEKETS,
      };

      console.log(data);
      const response = await axios.post(
        `${endpoint}upload-cbp`,
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
                      <b>Upload CBP Form</b>
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
                      label="HEMOGLOBIN"
                      id="HEMOGLOBIN"
                      name="HEMOGLOBIN"
                      type="HEMOGLOBIN"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("HEMOGLOBIN", {
                        required: "HEMOGLOBIN is required",
                      })}
                      error={errors3.HEMOGLOBIN ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.HEMOGLOBIN ? errors3.HEMOGLOBIN.message : null
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
                      label="PCV"
                      id="PCV"
                      name="PCV"
                      type="PCV"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("PCV", {
                        required: "PCV is required",
                      })}
                      error={errors3.PCV ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.PCV ? errors3.PCV.message : null}
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
                      label="Total RBC Count"
                      id="TRBC"
                      name="TRBC"
                      type="TRBC"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("TRBC", {
                        required: "Total TRBC Count is required",
                      })}
                      error={errors3.TRBC ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.TRBC ? errors3.TRBC.message : null}
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
                      label="Platelet Count"
                      id="platelet"
                      name="platelet"
                      type="platelet"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("platelet", {
                        required: "Platelet Count is required",
                      })}
                      error={errors3.platelet ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.platelet ? errors3.platelet.message : null}
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
                      label="Total WBC Count"
                      id="TWBC"
                      name="TWBC"
                      type="TWBC"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("TWBC", {
                        required: "Total WBC Count is required",
                      })}
                      error={errors3.TWBC ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.TWBC ? errors3.TWBC.message : null}
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <Typography variant="h6" color="initial" align="left">
                      Differential Count
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
                      label="NEUTROPHILS"
                      id="NEUTROPHILS"
                      name="NEUTROPHILS"
                      type="NEUTROPHILS"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("NEUTROPHILS", {
                        required: "NEUTROPHILS is required",
                      })}
                      error={errors3.NEUTROPHILS ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.NEUTROPHILS ? errors3.NEUTROPHILS.message : null
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
                      label="LYMPHOCYTES"
                      id="LYMPHOCYTES"
                      name="LYMPHOCYTES"
                      type="LYMPHOCYTES"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("LYMPHOCYTES", {
                        required: "LYMPHOCYTES is required",
                      })}
                      error={errors3.LYMPHOCYTES ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.LYMPHOCYTES ? errors3.LYMPHOCYTES.message : null
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
                      label="EOSINOPHILS"
                      id="EOSINOPHILS"
                      name="EOSINOPHILS"
                      type="EOSINOPHILS"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("EOSINOPHILS", {
                        required: "EOSINOPHILS is required",
                      })}
                      error={errors3.EOSINOPHILS ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.EOSINOPHILS ? errors3.EOSINOPHILS.message : null
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
                      label="MONOCYTES"
                      id="MONOCYTES"
                      name="MONOCYTES"
                      type="MONOCYTES"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("MONOCYTES", {
                        required: "MONOCYTES is required",
                      })}
                      error={errors3.MONOCYTES ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.MONOCYTES ? errors3.MONOCYTES.message : null
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
                      label="BASOPHILS"
                      id="BASOPHILS"
                      name="BASOPHILS"
                      type="BASOPHILS"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("BASOPHILS", {
                        required: "BASOPHILS is required",
                      })}
                      error={errors3.BASOPHILS ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.BASOPHILS ? errors3.BASOPHILS.message : null
                      }
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    xs={12}
                    sm={12}
                    style={{ marginBottom: "0px" }}
                  >
                    <Typography variant="h6" color="initial" align="left">
                      Peripheral Smear
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
                      label="R B C MORPHOLOGY"
                      id="RBCMORPHOLOGY"
                      name="RBCMORPHOLOGY"
                      type="RBCMORPHOLOGY"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("RBCMORPHOLOGY", {
                        required: "R B C MORPHOLOGY is required",
                      })}
                      error={errors3.RBCMORPHOLOGY ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.RBCMORPHOLOGY
                          ? errors3.RBCMORPHOLOGY.message
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
                      label="W B C"
                      id="WBC"
                      name="WBC"
                      type="WBC"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("WBC", {
                        required: "W B C is required",
                      })}
                      error={errors3.WBC ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.WBC ? errors3.WBC.message : null}
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
                      label="PLATEKETS"
                      id="PLATEKETS"
                      name="PLATEKETS"
                      type="PLATEKETS"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("PLATEKETS", {
                        required: "PLATEKETS is required",
                      })}
                      error={errors3.PLATEKETS ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.PLATEKETS ? errors3.PLATEKETS.message : null
                      }
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
