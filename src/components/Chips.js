import React from "react";
import Chip from "@material-ui/core/Chip";

export default function Chips({ status, text }) {
  if (status) {
    return (
      <Chip
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
