import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Overview1 from "../img/overview1.png";
import { Paper } from "@mui/material";

export default function CardNewInsurance() {
  return (
    <Box sx={{ border: "1px solid #1976d2" }}>
      <Paper elevation={0} sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "30%", display: "flex", justifyContent: "center" }}>
            <img
              alt="Logo1"
              src={Overview1}
              style={{ width: "10rem", height: "7.5rem" }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            <Typography fontSize={26}>เบี้ยฯ รายใหม่</Typography>
            <Typography fontSize={24} color="#1976d2">
              169,878
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography fontSize={32} color="#4caf50">
                <ArrowDropUpIcon fontSize="30px" />
              </Typography>
              <Typography fontSize={21} color="#4caf50">
                0.45%
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Typography fontSize={21}>Share 27.29%</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", mt: 1, width: "100%", gap: 2 }}>
        <Paper elevation={2} sx={{ p: 2, width: "50%" }}>
          <Typography fontSize={20}>เบี้ยฯ ปีแรก</Typography>
          <Typography fontSize={20} color="#1976d2">
            169,878
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography fontSize={24} color="#4caf50">
              <ArrowDropUpIcon fontSize="30px" />
            </Typography>
            <Typography fontSize={18} color="#4caf50">
              0.45%
            </Typography>
          </Box>
          <Typography fontSize={18}>Share 17.21%</Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            width: "50%",
            display: "flex",
            flexDirection: "column",
            //textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontSize={20}>เบี้ยฯ จ่ายครั้งเดียว</Typography>
          <Typography fontSize={20} color="#1976d2">
            169,878
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography fontSize={24} color="#d50000">
              <ArrowDropDownSharpIcon fontSize="30px" />
            </Typography>
            <Typography fontSize={18} color="#d50000">
              -0.45%
            </Typography>
          </Box>
          <Typography fontSize={18}>Share 17.21%</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
