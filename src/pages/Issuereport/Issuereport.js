import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Typography, TextField, Button, MenuItem } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FiEdit } from "react-icons/fi";
import { BsFillXCircleFill } from "react-icons/bs";
import excel from "../../img/excel.png";
import pdf from "../../img/PDF_file_icon.svg.webp";
import { getReport } from "../service";
import moment from "moment/moment";
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker, Space } from "antd";
import LinearProgress from "@mui/material/LinearProgress";
import { Empty } from "antd";

function createData(name, calories, fat, form, status, date, time) {
  return { name, calories, fat, form, status, date, time };
}

const rows = [
  createData(
    "ตารางที่ 1 : T1. Premium (MTD)",
    "September",
    2022,
    "A",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 2 : T2. Premium (YTD)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 3 : T3. Ordinary,Industrial Group,Group & PA Premium 2021-2022 (YTD)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 4 : T4. Ordinary Premium 2021-2022 (YTD)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 5 : T5. Industrial Premium 2021-2022 (YTD)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 6 : T6. Group Premium 2021-2022 (YTD)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 7 : T7. Group Premium (YTD)",
    "September",
    2019,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 8 : T8. PA Premium 2021-2022 (YTD)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 9 : T9. PA Premium (YTD)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 10 : T10. Policy,Members & Sum Insured (MTD)",
    "September",
    2021,
    "B",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 11 : T11. Policy,Members & Sum Insured (YTD)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 12 : T12. Ordinary Policy & Sum Insured 2021-2022(YTD)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 13 : T13. Industrail Policy & Sum Insured 2021-2022(YTD)",
    "September",
    2022,
    "A",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 14 : T14. Group Policy, Members & Sum Insured (YTD)",
    "September",
    2022,
    "A",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 15 : T15. PA Policy, Members & Sum Insured (YTD)",
    "September",
    2022,
    "A",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "ตารางที่ 16 : T16. Premium Ranking",
    "September",
    2022,
    "A",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
];

const columns = [
  {
    id: "Reportname",
    label: "Report name",
    align: "left",
  },
  {
    id: "Month",
    label: "Month",
    align: "left",
  },
  {
    id: "Year",
    label: "Year",
    align: "left",
  },

  {
    id: "Action",
    label: "Action",
    align: "left",
  },
];

const months = [
  {
    value: "Jan",
    label: "January",
  },
  {
    value: "Feb",
    label: "Febuary",
  },
  {
    value: "Sep",
    label: "September",
  },
  {
    value: "Oct",
    label: "October",
  },
];

const years = [
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2020",
    label: "2020",
  },
  {
    value: "2019",
    label: "2019",
  },
];

export default function Issuereport() {
  const [reportname, setReportname] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  const [DataReport, setDataReport] = React.useState([]);
  const [selectdate, setSelectdate] = React.useState(
    moment().format("YYYY-MM")
  );

  React.useEffect(() => {
    GetDataReportdefault();
  }, []);

  ////////// for Progress loading //////////
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //////////////// DropDown Box ////////////////

  const handleChange = (newValue) => {
    setSelectdate(newValue.format("YYYY-MM"));
    console.log(newValue.format("YYYY-MM"));
  };

  const monthdf = moment().format("MM");
  const yeardf = moment().format("YYYY");

  //////////////// Get User List ////////////////

  const GetDataReportdefault = () => {
    //let qString = "?year=2023&month=01";
    let qString = "?year=" + yeardf + "&month=" + monthdf;
    getReport(qString).then((res) => {
      console.log("DataReport", res.data);
      if (res && res.status === 200) {
        setDataReport(res.data);
      }
      setLoading(false);
    });
  };

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
          ออกรายงาน
        </Typography>
      </Box>

      {/*  ////////////////////////// Import Button ////////////////////////// */}
      <Box
        style={{
          display: "flex",
          margin: "20px 0px 20px 0px",
          cursor: "pointer",
        }}
      >
        <FileUploadOutlinedIcon style={{ fontSize: "2.2rem" }} /> &nbsp;&nbsp;
        <Typography
          style={{
            color: "#1565c0",
            fontWeight: "400",
            fontSize: "1.4rem",
          }}
        >
          Export All Reports
        </Typography>
      </Box>

      {/*  ////////////////////////// Search Box ////////////////////////// */}

      <Box sx={{ display: "flex", paddingBottom: "20px" }}>
        <Box sx={{ width: 400, display: "flex", mr: 2 }}>
          <TextField
            placeholder="Report name"
            size="middle"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={reportname}
            onChange={(e) => {
              setReportname(e.target.value);
            }}
          />
        </Box>

        <Box sx={{ width: 200, mr: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              disableFuture
              label="Select Month and Year"
              inputFormat="YYYY-MM"
              views={["year", "month"]}
              value={selectdate}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>

        <Button
          variant="contained"
          size="small"
          style={{ width: "80px" }}
          // onClick={getData}
        >
          <Typography fontSize={14}>ค้นหา</Typography>
        </Button>
      </Box>

      {/*  ////////////////////////// Data Table ////////////////////////// */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    backgroundColor: "#e3f2fd",
                    padding: "10px",
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: "500",
                      color: "#1565c0",
                      fontSize: "1.25rem",
                    }}
                  >
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : DataReport.length > 0 ? (
              DataReport.map((row) => (
                <TableRow key={row.report_id}>
                  <TableCell
                    style={{ width: 700, padding: "10px" }}
                    align="left"
                  >
                    <Typography
                      style={{ fontSize: "1.12rem", fontWeight: "400" }}
                    >
                      {row.report_name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={{ width: 120, padding: "10px" }}
                    align="left"
                  >
                    <Typography
                      style={{ fontSize: "1.12rem", fontWeight: "400" }}
                    >
                      {row.month_name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={{ width: 120, padding: "10px" }}
                    align="left"
                  >
                    <Typography
                      style={{ fontSize: "1.12rem", fontWeight: "400" }}
                    >
                      {row.year}
                    </Typography>
                  </TableCell>

                  <TableCell
                    style={{ width: 80, padding: "10px" }}
                    align="left"
                  >
                    <Box
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {row.file_export == "excel" ? (
                        <img
                          alt="excelLogo"
                          src={excel}
                          style={{
                            display: "flex",
                            width: "22px",
                            height: "25px",
                            cursor: "pointer",
                          }}
                        />
                      ) : (
                        <img
                          alt="pdfLogo"
                          src={pdf}
                          style={{
                            display: "flex",
                            width: "23px",
                            height: "27px",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
