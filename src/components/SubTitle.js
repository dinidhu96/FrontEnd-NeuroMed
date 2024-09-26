import React from "react";
import Typography from "@material-ui/core/Typography";

export default function SubTitle({ text }) {
  return (
    <div>
      <Typography variant="h5" color="initial" style={{ marginBottom: "24px" }}>
        <b>{text}</b>
      </Typography>
    </div>
  );
}
