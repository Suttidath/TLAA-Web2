import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Grid } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import CardNewInsurance from "../components/CardNewInsurance";
import CardRenewalinsurance from "../components/CardRenewalinsurance";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Overview1 from "../img/overview1.png";
import Overview2 from "../img/overview2.png";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

export const data = {
  labels: ["เบี้ยฯ ปีแรก", "เบี้ยฯ ต่ออายุ", "เบี้ยฯ จ่ายครั้งเดียว"],
  datasets: [
    {
      label: "# of Votes",
      data: [16390.93, 70971.01, 8821.21],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

//const labels = ["เบี้ยฯ ปีแรก", "เบี้ยฯ ต่ออายุ", "เบี้ยฯ จ่ายครั้งเดียว"]

export const data2 = {
  labels: ["เบี้ยฯ ปีแรก", "เบี้ยฯ ต่ออายุ", "เบี้ยฯ จ่ายครั้งเดียว"],
  datasets: [
    {
      label: "Ordinary",
      data: [1375.54, 6241.99, 3063.96],
      backgroundColor: "#0d47a1",
    },
    {
      label: "Industrial",
      data: [38.75, 787.49, 8821.21],
      backgroundColor: "#40c4ff",
    },
    {
      label: "Group",
      data: [263.08, 718.95, 5757.241],
      backgroundColor: "#673ab7",
    },
    {
      label: "PA",
      data: [713.57, 122.55, 8821.21],
      backgroundColor: "#ff9100",
    },
  ],
};

export default function Overview() {
  return (
    <Box
      style={{
        margin: "65px 0px 0px 0px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/*  ////////////////////////// Main Topic Pages ////////////////////////// */}

      <Box>
        <Typography
          style={{
            fontWeight: "400",
            color: "#1565c0",
            fontSize: "1.9rem",
          }}
        >
          Overview
        </Typography>

        <Typography
          sx={{
            mt: 3,
            fontWeight: "400",
            color: "#1565c0",
            fontSize: "1.7rem",
          }}
        >
          ภาพรวมเบี้ยประกันชีวิต ปี 2565
        </Typography>

        <Box
          sx={{
            mt: 4,
            ml: 8,
            mr: 8,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "end", mb: 3 }}>
            <Typography variant="h6">หน่วย : ล้านบาท</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Paper
              elevation={1}
              // variant="outlined"
              sx={{
                width: "33%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
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
              </Box>
            </Paper>
            <Paper elevation={0} sx={{ width: "33%" }}>
              <Paper
                elevation={0}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
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
                      <Typography fontSize={32} color="#d50000">
                        <ArrowDropDownSharpIcon fontSize="30px" />
                      </Typography>
                      <Typography fontSize={21} color="#d50000">
                        -0.49%
                      </Typography>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Typography fontSize={21}>Share 27.79%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Box sx={{ display: "flex", mt: 1, width: "100%", gap: 2 }}>
                <Paper variant="outlined" sx={{ p: 2, width: "50%" }}>
                  <Typography fontSize={20}>เบี้ยฯ ปีแรก</Typography>
                  <Typography fontSize={20} color="#1976d2">
                    105,192
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography fontSize={24} color="#4caf50">
                      <ArrowDropUpIcon fontSize="30px" />
                    </Typography>
                    <Typography fontSize={18} color="#4caf50">
                      10.42%
                    </Typography>
                  </Box>
                  <Typography fontSize={18}>Share 17.21%</Typography>
                </Paper>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontSize={20}>เบี้ยฯ จ่ายครั้งเดียว</Typography>
                  <Typography fontSize={20} color="#1976d2">
                    64,686
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography fontSize={24} color="#d50000">
                      <ArrowDropDownSharpIcon fontSize="30px" />
                    </Typography>
                    <Typography fontSize={18} color="#d50000">
                      -14.27%
                    </Typography>
                  </Box>
                  <Typography fontSize={18}>Share 10.58%</Typography>
                </Paper>
              </Box>
            </Paper>
            <Paper elevation={0} sx={{ width: "33%" }}>
              <Paper
                elevation={0}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      alt="Logo1"
                      src={Overview2}
                      style={{ width: "6rem", height: "7.5rem" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                    }}
                  >
                    <Typography fontSize={26}>เบี้ยฯ ต่ออายุ</Typography>
                    <Typography fontSize={24} color="#1976d2">
                      441,496
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <Typography fontSize={32} color="#d50000">
                        <ArrowDropDownSharpIcon fontSize="30px" />
                      </Typography>
                      <Typography fontSize={21} color="#d50000">
                        -0.43%
                      </Typography>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Typography fontSize={21}>Share 72.21%</Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: 5.5,
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <Typography fontSize={22}>
                  อัตตราความคงอยู่ของกรมธรรม์
                </Typography>
                <Typography fontSize={22} color="#1976d2">
                  82%
                </Typography>
              </Paper>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: 9,
              marginBottom: 7,
            }}
          >
            <Box
              sx={{
                width: "40%",
                height: "350px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pie
                data={data}
                style={{
                  padding: "10px",
                }}
              />
              ;
            </Box>
            <Box
              sx={{
                width: "60%",
                height: "350px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Bar options={options} data={data2} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
