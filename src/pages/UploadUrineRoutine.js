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

export default function UploadUrineRoutine() {
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
        quantity: d.quantity,
        colour: d.colour,
        appearance: d.appearance,
        specificGravity: d.specificGravity,
        proteins: d.proteins,
        glucose: d.glucose,
        urineKetones: d.urineKetones,
        reaction: d.reaction,
        occultBlood: d.occultBlood,
        bileSalts: d.bileSalts,
        bilePigments: d.bilePigments,
        urobilinogen: d.urobilinogen,
        epithelialCells: d.epithelialCells,
        pusCells: d.pusCells,
        redBloodCells: d.redBloodCells,
        casts: d.casts,
        crystals: d.crystals,
        amorphousMaterial: d.amorphousMaterial,
        yeastCells: d.yeastCells,
        bacteria: d.bacteria,
        trichomonasVaginalis: d.trichomonasVaginalis,
        speramatozoa: d.speramatozoa,
      };

      console.log(data);
      const response = await axios.post(
        `${endpoint}upload-urine-routine`,
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
                      <b>Upload Urine Routine Form</b>
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
                      label="Quantity"
                      id="quantity"
                      name="quantity"
                      type="quantity"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("quantity", {
                        required: "Quantity is required",
                      })}
                      error={errors3.quantity ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.quantity ? errors3.quantity.message : null}
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
                      label="Colour"
                      id="colour"
                      name="colour"
                      type="colour"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("colour", {
                        required: "Colour is required",
                      })}
                      error={errors3.colour ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.colour ? errors3.colour.message : null}
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
                      label="Appearance"
                      id="appearance"
                      name="appearance"
                      type="appearance"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("appearance", {
                        required: "Appearance is required",
                      })}
                      error={errors3.appearance ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.appearance ? errors3.appearance.message : null
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
                      label="Specific Gravity"
                      id="specificGravity"
                      name="specificGravity"
                      type="specificGravity"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("specificGravity", {
                        required: "Specific Gravity is required",
                      })}
                      error={errors3.specificGravity ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.specificGravity
                          ? errors3.specificGravity.message
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
                      label="Proteins"
                      id="proteins"
                      name="proteins"
                      type="proteins"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("proteins", {
                        required: "Proteins is required",
                      })}
                      error={errors3.proteins ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.proteins ? errors3.proteins.message : null}
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
                      label="Glucose"
                      id="glucose"
                      name="glucose"
                      type="glucose"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("glucose", {
                        required: "Glucose is required",
                      })}
                      error={errors3.glucose ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.glucose ? errors3.glucose.message : null}
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
                      label="Urine Ketones"
                      id="urineKetones"
                      name="urineKetones"
                      type="urineKetones"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("urineKetones", {
                        required: "Urine Ketones is required",
                      })}
                      error={errors3.urineKetones ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.urineKetones
                          ? errors3.urineKetones.message
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
                      label="Reaction (pH)"
                      id="reaction"
                      name="reaction"
                      type="reaction"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("reaction", {
                        required: "Reaction (pH) is required",
                      })}
                      error={errors3.reaction ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.reaction ? errors3.reaction.message : null}
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
                      label="Occult Blood"
                      id="occultBlood"
                      name="occultBlood"
                      type="occultBlood"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("occultBlood", {
                        required: "Occult Blood is required",
                      })}
                      error={errors3.occultBlood ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.occultBlood ? errors3.occultBlood.message : null
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
                      label="Bile Salts"
                      id="bileSalts"
                      name="bileSalts"
                      type="bileSalts"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("bileSalts", {
                        required: "Bile Salts is required",
                      })}
                      error={errors3.bileSalts ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.bileSalts ? errors3.bileSalts.message : null
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
                      label="Bile Pigments"
                      id="bilePigments"
                      name="bilePigments"
                      type="bilePigments"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("bilePigments", {
                        required: "Bile Pigments is required",
                      })}
                      error={errors3.bilePigments ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.bilePigments
                          ? errors3.bilePigments.message
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
                      label="Urobilinogen"
                      id="urobilinogen"
                      name="urobilinogen"
                      type="urobilinogen"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("urobilinogen", {
                        required: "Urobilinogen is required",
                      })}
                      error={errors3.urobilinogen ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.urobilinogen
                          ? errors3.urobilinogen.message
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
                      label="Epithelial Cells"
                      id="epithelialCells"
                      name="epithelialCells"
                      type="epithelialCells"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("epithelialCells", {
                        required: "Epithelial Cells is required",
                      })}
                      error={errors3.epithelialCells ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.epithelialCells
                          ? errors3.epithelialCells.message
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
                      label="Pus Cells"
                      id="pusCells"
                      name="pusCells"
                      type="pusCells"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("pusCells", {
                        required: "Pus Cells is required",
                      })}
                      error={errors3.pusCells ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.pusCells ? errors3.pusCells.message : null}
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
                      label="Red Blood Cells"
                      id="redBloodCells"
                      name="redBloodCells"
                      type="redBloodCells"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("redBloodCells", {
                        required: "Red Blood Cells is required",
                      })}
                      error={errors3.redBloodCells ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.redBloodCells
                          ? errors3.redBloodCells.message
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
                      label="Casts"
                      id="casts"
                      name="casts"
                      type="casts"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("casts", {
                        required: "Casts is required",
                      })}
                      error={errors3.casts ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.casts ? errors3.casts.message : null}
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
                      label="Crystals"
                      id="crystals"
                      name="crystals"
                      type="crystals"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("crystals", {
                        required: "Crystals is required",
                      })}
                      error={errors3.crystals ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.crystals ? errors3.crystals.message : null}
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
                      label="Amorphous Material"
                      id="amorphousMaterial"
                      name="amorphousMaterial"
                      type="amorphousMaterial"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("amorphousMaterial", {
                        required: "Amorphous Material is required",
                      })}
                      error={errors3.amorphousMaterial ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.amorphousMaterial
                          ? errors3.amorphousMaterial.message
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
                      label="Yeast Cells"
                      id="yeastCells"
                      name="yeastCells"
                      type="yeastCells"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("yeastCells", {
                        required: "Yeast Cells is required",
                      })}
                      error={errors3.yeastCells ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.yeastCells ? errors3.yeastCells.message : null
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
                      label="Bacteria"
                      id="bacteria"
                      name="bacteria"
                      type="bacteria"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("bacteria", {
                        required: "Bacteria is required",
                      })}
                      error={errors3.bacteria ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={errors3.bacteria ? errors3.bacteria.message : null}
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
                      label="Trichomonas Vaginalis"
                      id="trichomonasVaginalis"
                      name="trichomonasVaginalis"
                      type="trichomonasVaginalis"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("trichomonasVaginalis", {
                        required: "Trichomonas Vaginalis is required",
                      })}
                      error={errors3.trichomonasVaginalis ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.trichomonasVaginalis
                          ? errors3.trichomonasVaginalis.message
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
                      label="Speramatozoa"
                      id="speramatozoa"
                      name="speramatozoa"
                      type="speramatozoa"
                      color="primary"
                      variant="outlined"
                      size="small"
                      fullWidth
                      {...register3("speramatozoa", {
                        required: "Speramatozoa is required",
                      })}
                      error={errors3.speramatozoa ? true : false}
                    />

                    <FieldError
                      marginTop="8px"
                      text={
                        errors3.speramatozoa
                          ? errors3.speramatozoa.message
                          : null
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
