import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import { Paper } from "@mui/material";

export default function CardSummary() {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "50px",
        gap: "9px",
        justifyItems: "center",
        border: "1px solid #1976d2",
      }}
    >
      <Typography fontSize={34}>เบี้ยฯ รับรวม</Typography>
      <Typography fontSize={38}>611,374</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography fontSize={44} color="#d50000">
          <ArrowDropDownSharpIcon fontSize="30px" />
        </Typography>
        <Typography fontSize={38} color="#d50000">
          -0.45%
        </Typography>
      </Box>
    </Paper>
  );
}
