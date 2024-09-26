import React, { useState, useEffect, useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Context } from "../util/Provider";

import Webcam from "react-webcam";
import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import Spinner from "../components/Spinner";

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

const endpoint = `${
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD
}`;

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: { exact: "environment" },
};

// const videoConstraints = {
//   width: 1280,
//   height: 720,
//   facingMode: "user",
// };

export default function KycVerification2(props) {
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
    mode: "onSubmit",
  });

  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImage(null);
  };

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     console.log(currentUser);
  //     if (currentUser) {
  //       props.history.push("/");
  //     }

  //     setLoading(false);
  //   }, []);

  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const send = async () => {
    try {
      setLoading(true);

      const token = JSON.parse(localStorage.getItem("jwt-token"));
      console.log(token);

      let formData = new FormData();

      let newImage = dataURLtoBlob(image);

      console.log(newImage);
      let imageName = uuidv4();

      formData.append("image", newImage, `${imageName}.png`);
      formData.append("token", props.kycToken);

      // return list.push({
      //   name: image.name,
      //   filename: `${imageName}.${ext}`,
      // });

      const config = {
        headers: { authorization: `Bearer ${token || null}` },
      };

      const response = await axios.post(
        `${endpoint}patient-activation-idfront`,
        formData,
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
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Grid
            md={6}
            xs={12}
            sm={12}
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
            style={{ padding: "24px" }}
          >
            <Grid
              container
              item
              md={12}
              xs={12}
              sm={12}
              style={{ marginBottom: "16px" }}
            >
              <Grid item md={12} xs={12} sm={12}>
                {image ? (
                  <>
                    <img src={image} style={{ width: "100%" }} />

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={retake}
                      style={{ marginTop: "24px" }}
                    >
                      Retake photo
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={send}
                      style={{ marginTop: "24px", marginLeft: "24px" }}
                    >
                      Send photo
                    </Button>
                  </>
                ) : (
                  <>
                    <Webcam
                      style={{ width: "100%" }}
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={1920}
                      videoConstraints={videoConstraints}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={capture}
                      style={{ marginTop: "24px" }}
                    >
                      Capture photo
                    </Button>
                  </>
                )}
              </Grid>
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
        </div>
      )}
    </>
  );
}
