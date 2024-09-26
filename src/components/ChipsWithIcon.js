import React from "react";
import Chip from "@material-ui/core/Chip";

import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default function ChipsWithIcon({ status, text }) {
  if (status) {
    return (
      <Chip
        icon={<CheckCircleIcon style={{ color: "white" }} />}
        label={text}
        style={{
          backgroundColor: "green",
          color: "white",
          fontFamily: "AirbnbCerealBook",
        }}
      />
    );
  } else {
    return (
      <Chip
        icon={<CancelIcon style={{ color: "white" }} />}
        label={text}
        style={{
          backgroundColor: "red",
          color: "white",
          fontFamily: "AirbnbCerealBook",
        }}
      />
    );
  }
}
