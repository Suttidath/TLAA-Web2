import React, { useState, useRef } from "react";
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
import { Typography, TextField, Button, MenuItem, Modal } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FiEdit } from "react-icons/fi";
import { BsFillXCircleFill } from "react-icons/bs";
import { read, utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import ClearIcon from "@mui/icons-material/Clear";
import FormA from "../Components/FormA";
import FormB from "../Components/FormB";
import { getCompanyAll } from "../service";

import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ReactMonthPicker from "react-month-picker";
import "react-month-picker/css/month-picker.css";

const minDate = dayjs("2020-01-01T00:00:00.000");
const maxDate = dayjs("2034-01-01T00:00:00.000");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 16,
  p: 6,
};

const styleEdit = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 16,
  p: 3,
};

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        ml: 2.5,
      }}
    >
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat, form, status, date, time) {
  return { name, calories, fat, form, status, date, time };
}

const rows = [
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "A",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2019,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2021,
    "B",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "A",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "B",
    "Confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
  createData(
    "โตเกียวมารีนประกันชีวิต (ประเทศไทย) จำกัด (มหาชน)",
    "September",
    2022,
    "A",
    "Wait to confirm",
    "1-Sep-2022",
    "16:16:16"
  ),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const columns = [
  {
    id: "Insurance",
    label: "Insurance Company",
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
    id: "Form",
    label: "Form",
    align: "left",
  },
  {
    id: "Status",
    label: "Status",
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

const forms = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
];

const statuses = [
  {
    value: "Confirm",
    label: "Confirm",
  },
  {
    value: "Wait to confirm",
    label: "Wait to confirm",
  },
];

const FormA_One = [
  {
    id: "ชื่อบริษัท",
    label: "ชื่อบริษัท",
    align: "center",
  },
  {
    id: "Template",
    label: "Template",
    align: "left",
  },
  {
    id: "รหัสสมาชิก",
    label: "รหัสสมาชิก",
    align: "left",
  },
  {
    id: "ค.ศ.",
    label: "ค.ศ.",
    align: "left",
  },
  {
    id: "ประจำเดือน",
    label: "ประจำเดือน",
    align: "left",
  },
  {
    id: "ประเภทข้อมูล",
    label: "ประเภทข้อมูล",
    align: "left",
  },
  {
    id: "จำนวนรายการ",
    label: "จำนวนรายการ",
    align: "left",
  },
];

const FormA_Two = [
  {
    id: "ประเภท",
    label: "ประเภท",
    align: "center",
  },
  {
    id: "จำนวนกรมธรรม์",
    label: "จำนวนกรมธรรม์",
    align: "left",
  },
  {
    id: "จำนวนคน",
    label: "จำนวนคน",
    align: "left",
  },
  {
    id: "จำนวนเงินเอาประกันภัย(ของสัญญาหลัก)",
    label: "จำนวนเงินเอาประกันภัย(ของสัญญาหลัก)",
    align: "left",
  },
];

export default function Monthly() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [companyname, setCompanyname] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [form, setForm] = useState("");
  const [status, setStatus] = useState("");

  const [insuranceid, setInsuranceid] = useState("");
  const [loading, setLoading] = React.useState(true);
  const [insurance, setInsurance] = React.useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [formimport, setFormimport] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [valuepick, setValuePick] = useState("");
  const [valuemonth, setValueMonth] = useState("");
  // const [value, setValue] = React.useState("");
  const [date, setDate] = React.useState(dayjs("2022-04-07"));

  const [dataRow1, setDataRow1] = useState();
  const [dataRow2, setDataRow2] = useState([]);
  const [dataRow3, setDataRow3] = useState([]);
  const [dataRow4, setDataRow4] = useState([]);
  const [dataRow5, setDataRow5] = useState([]);
  const [dataRow6, setDataRow6] = useState([]);
  const [dataRow7, setDataRow7] = useState([]);
  const [dataRow8, setDataRow8] = useState([]);
  const [dataRow9, setDataRow9] = useState([]);
  const [dataRow10, setDataRow10] = useState([]);
  const [dataRow11, setDataRow11] = useState([]);
  const [dataRow12, setDataRow12] = useState([]);
  const [dataRow13, setDataRow13] = useState([]);

  const [company, setCompany] = useState("");
  const [template, setTemplate] = useState("");
  const [memberNo, setMemberNo] = useState("");
  const [yearly, setYearly] = useState("");
  const [monthy, setMonthy] = useState("");
  const [dataType, setDataType] = useState("");
  const [order, setOrder] = useState("");

  //////////////// Variable of Form A ////////////////
  const [data, setData] = useState("");

  //////////////// Variable of Form B ////////////////

  ////////// for get DataUser //////////
  React.useEffect(() => {
    GetInsurance();
  }, []);

  const fileRef = useRef();

  const acceptableFileName = ["xlsx", "xls"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  //////////////// setting RowsPerPage ////////////////
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //////////////// DropDown Box ////////////////
  const handleChangemonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeyear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeform = (event) => {
    setForm(event.target.value);
  };

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
  };

  const handleChangeformimport = (event) => {
    setFormimport(event.target.value);
  };

  const handleChangeinsuranceid = (event) => {
    setInsuranceid(event.target.value);
    console.log(insuranceid);
  };

  //////////////// Import file xlsx ////////////////

  const handleFile = async (e) => {
    const myFile = e.target.files[0];

    if (!myFile) return;

    if (!checkFileName(myFile.name)) {
      Swal.fire({
        icon: "warning",
        text: "Invalid File Type!",
      });
      //alert("Invalid File Type");
      return;
    }

    //Read The XLSX MetaData
    const data = await myFile.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log("datawb", jsonData);
    setCompany(jsonData[1].รายงานสถิติธุรกิจประกันชีวิต);
    setTemplate(jsonData[1].__EMPTY_2);
    setMemberNo(jsonData[1].__EMPTY_3);
    setYearly(jsonData[1].__EMPTY_4);
    setMonthy(jsonData[1].__EMPTY_5);
    setDataType(jsonData[1].__EMPTY_6);
    setOrder(jsonData[1].__EMPTY_7);

    setDataRow1(jsonData[0]);
    setDataRow2(jsonData[1]);
    setDataRow3(jsonData[5]);
    setDataRow4(jsonData[6]);
    setDataRow5(jsonData[7]);
    setDataRow6(jsonData[8]);
    setDataRow7(jsonData[9]);
    setDataRow8(jsonData[10]);
    setDataRow9(jsonData[11]);
    setDataRow10(jsonData[12]);
    setDataRow11(jsonData[13]);
    setDataRow12(jsonData[14]);
    setDataRow13(jsonData[15]);
    setData(jsonData[15].__EMPTY_4);

    setFile(myFile);
    setFileName(myFile.name);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = "";
  };

  // const handleImport = (jsonData) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //     }
  //   });
  //   // console.log("data", company);
  // };

  //////////////// Get User List ////////////////
  const GetInsurance = () => {
    let qString = "?";
    getCompanyAll(qString).then((res) => {
      console.log("Datamember1", res.data);
      console.log(res.data.message);
      if (res && res.status === 200) {
        setInsurance(res.data);
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
          ตรวจสอบข้อมูลรายเดือน
        </Typography>
      </Box>

      {/*  ////////////////////////// Import Button ////////////////////////// */}
      <Box
        style={{
          display: "flex",
          margin: "20px 0px 20px 0px",
        }}
      >
        <FileDownloadOutlinedIcon style={{ fontSize: "2.2rem" }} /> &nbsp;&nbsp;
        <Typography
          style={{
            color: "#1565c0",
            fontWeight: "400",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        >
          Import
        </Typography>
      </Box>

      {/*  ////////////////////////// Search Box ////////////////////////// */}

      <Box sx={{ display: "flex", paddingBottom: "15px" }}>
        <Box sx={{ width: 400, display: "flex", mr: 2 }}>
          <TextField
            placeholder="Search Insurance Company"
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            value={companyname}
            onChange={(e) => {
              setCompanyname(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            select
            label="Month"
            value={month}
            onChange={handleChangemonth}
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            select
            label="Year"
            value={year}
            onChange={handleChangeyear}
          >
            {years.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            select
            label="Form"
            value={form}
            onChange={handleChangeform}
          >
            {forms.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            select
            label="Status"
            value={status}
            onChange={handleChangestatus}
          >
            {statuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          size="small"
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
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{ width: 500 }} align="left">
                  <Typography
                    style={{ fontSize: "1.15rem", fontWeight: "450" }}
                  >
                    {row.name}
                  </Typography>
                  <Typography style={{ fontSize: "1rem" }}>
                    Import Time: {row.date} {row.time}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 120 }} align="left">
                  <Typography
                    style={{ fontSize: "1.15rem", fontWeight: "450" }}
                  >
                    {row.calories}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  <Typography
                    style={{ fontSize: "1.15rem", fontWeight: "450" }}
                  >
                    {row.fat}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 100 }} align="left">
                  <Typography
                    style={{ fontSize: "1.15rem", fontWeight: "450" }}
                  >
                    {row.form}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 200 }} align="left">
                  <Typography
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: "450",
                      color:
                        (row.status === "Confirm" && "#43a047") ||
                        (row.status === "Wait to confirm" && "#ef6c00"),
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell style={{ width: 120 }} align="left">
                  <Typography
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "450",
                    }}
                  >
                    <Link
                      to={`/monthly/editdata/${row.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <FiEdit
                        style={{ color: "#4fc3f7", cursor: "pointer" }}
                        //onClick={handleOpenEdit}
                      />
                    </Link>
                    &nbsp;&nbsp;
                    <BsFillXCircleFill
                      style={{ color: "#f44336", cursor: "pointer" }}
                    />
                  </Typography>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                // style={{ fontSize: "1.15 rem", fontWeight: "450" }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/*//////////////// Modal popup for Import form A,B ////////////////*/}
      <Modal open={open}>
        <Box sx={style}>
          <Typography variant="h4" style={{ color: "#1565c0" }}>
            Import Report
          </Typography>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 400, mt: 2 }}>
              <TextField
                label="Form A or B"
                variant="outlined"
                size="middle"
                select
                fullWidth
                value={formimport}
                onChange={handleChangeformimport}
              >
                {forms.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ width: 400, mt: 2 }}>
              <TextField
                label="Select Insurance Company"
                variant="outlined"
                size="middle"
                select
                fullWidth
                value={insuranceid}
                onChange={handleChangeinsuranceid}
              >
                {insurance.map((option, index) => (
                  <MenuItem key={option.company_id} value={option.company_id}>
                    {option.company_name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ mt: 2, display: "flex" }}>
              <Box sx={{ width: 190, mr: 2 }}>
                <TextField
                  label="Month"
                  variant="outlined"
                  size="middle"
                  fullWidth
                />
              </Box>
              <Box sx={{ width: 195 }}>
                <TextField
                  label="Year"
                  variant="outlined"
                  size="middle"
                  fullWidth
                />
              </Box>
            </Box>

            <Box sx={{ mt: 4, width: 400 }}>
              <Box>
                {fileName && (
                  <Typography
                    style={{
                      fontSize: "13px",
                      color: "#357a38",
                      fontWeight: 400,
                    }}
                  >
                    upload a file already!!
                    {/* FileName: {fileName} */}
                  </Typography>
                )}
                {!fileName && (
                  <Typography style={{ fontSize: "13px", color: "#9E9E9E" }}>
                    Please upload a file
                  </Typography>
                )}
              </Box>
              <Box sx={{ mt: 1 }}>
                <input
                  type="file"
                  accept="xlsx,xls"
                  multiple={false}
                  onChange={(e) => handleFile(e)}
                  ref={fileRef}
                />
                {fileName && <ClearIcon onClick={handleRemove} />}
              </Box>
            </Box>
          </Box>

          <Box sx={{ mt: 9, display: "flex" }}>
            <Button
              variant="contained"
              size="middle"
              style={{ backgroundColor: "#32B917", marginRight: "15px" }}
              onClick={() => {
                // handleImport();

                handleClose();
                handleOpenEdit();
              }}
            >
              <Typography fontSize={14}>Import</Typography>
            </Button>
            <Button
              variant="contained"
              size="middle"
              color="inherit"
              onClick={() => {
                handleClose();
                handleRemove();
                setFormimport("");
                setInsuranceid("");
              }}
            >
              <Typography fontSize={14}>Back</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*//////////////// Modal popup for Edit form ////////////////*/}
      <Modal open={openEdit}>
        <Box sx={styleEdit}>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5">Form A</Typography>
          </Box>

          <Box sx={{ mt: 1 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    {FormA_One.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          backgroundColor: "#e0e0e0",
                          padding: "8px",
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: "400",
                            fontSize: "1.1rem",
                          }}
                        >
                          {column.label}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "12px",
                      // paddingRight: "1px",
                      // paddingLeft: "1px",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>&nbsp;&nbsp; {company}</TableCell>
                    <TableCell>&nbsp;&nbsp;{template}</TableCell>
                    <TableCell>&nbsp;&nbsp;{memberNo}</TableCell>
                    <TableCell>&nbsp;&nbsp;{yearly}</TableCell>
                    <TableCell>&nbsp;&nbsp;{monthy}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataType}</TableCell>
                    <TableCell>&nbsp;&nbsp;{order}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                color: "#1976d2",
              }}
            >
              1. การรับประกันภัยรายใหม่
            </Typography>
            <Typography
              style={{
                color: "#f44336",
              }}
            >
              หน่วย : พันบาท
            </Typography>
          </Box>

          <Box sx={{ mt: 1 }}>
            {/* {dataRow2.__EMPTY_1 === "tplPC1T2A" ? <FormA /> : <FormB />} */}
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableRow>
                  {FormA_Two.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        backgroundColor: "#e0e0e0",
                        padding: "8px",
                      }}
                    >
                      <Typography
                        style={{
                          fontWeight: "400",
                          fontSize: "1.1rem",
                        }}
                      >
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
                <TableBody
                  sx={{
                    "& .MuiTableCell-root": {
                      // paddingRight: "1px",
                      // paddingLeft: "1px",
                      padding: "10px",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; {dataRow3.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow3.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow3.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow3.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; {dataRow4.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow4.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow4.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow4.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; {dataRow5.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow5.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow5.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow5.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {dataRow6.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow6.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow6.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow6.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {dataRow7.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow7.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow7.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow7.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {dataRow8.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow8.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow8.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow8.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        {dataRow9.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow9.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow9.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow9.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; {dataRow10.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow10.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow10.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow10.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; {dataRow11.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow11.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow11.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow11.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; {dataRow12.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow12.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow12.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow12.__EMPTY_6}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "320px",
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        &nbsp;&nbsp; {dataRow13.รายงานสถิติธุรกิจประกันชีวิต}
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow13.__EMPTY_4}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow13.__EMPTY_5}</TableCell>
                    <TableCell>&nbsp;&nbsp;{dataRow13.__EMPTY_6}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Button
                variant="outlined"
                size="middle"
                color="success"
                style={{ marginRight: "15px" }}
              >
                <Typography fontSize={14}>Edit Data</Typography>
              </Button>
              <Button variant="outlined" size="middle">
                <Typography fontSize={14}>Save Edit Data</Typography>
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="middle"
                style={{ backgroundColor: "#32B917", marginRight: "15px" }}
              >
                <Typography fontSize={14}>Confirm</Typography>
              </Button>
              <Button
                variant="contained"
                size="middle"
                color="inherit"
                onClick={handleCloseEdit}
              >
                <Typography fontSize={14}>Back</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
