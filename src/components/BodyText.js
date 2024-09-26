import React from "react";
import Typography from "@material-ui/core/Typography";

export default function BodyText({ text, title }) {
  return (
    <div>
      <Typography
        variant="h6"
        color="initial"
        style={{ fontSize: "16px", marginBottom: "8px" }}
      >
        <b>{title}</b> {`: ${text}`}
      </Typography>
    </div>
  );
}
