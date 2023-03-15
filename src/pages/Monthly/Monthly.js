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
import {
  getCompanyAll,
  getMonthly,
  postAddformA,
  postAddformB,
  deleteMonthly,
} from "../service";
import LinearProgress from "@mui/material/LinearProgress";
import { Empty } from "antd";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ReactMonthPicker from "react-month-picker";
import "react-month-picker/css/month-picker.css";
import moment from "moment";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { set } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 3,
};

const styleModaldelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
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

const columns = [
  {
    id: "Insurance",
    label: "Insurance Company",
    align: "left",
  },
  {
    id: "Month",
    label: "Month",
    align: "center",
  },
  {
    id: "Year",
    label: "Year",
    align: "center",
  },
  {
    id: "Form",
    label: "Form",
    align: "center",
  },
  {
    id: "Status",
    label: "Status",
    align: "center",
  },
  {
    id: "Action",
    label: "Action",
    align: "center",
  },
];

const forms = [
  {
    value: "All",
    label: "-- All Form --",
  },
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
    value: "All",
    label: "-- All Status --",
  },
  {
    value: "Confirm",
    label: "Confirm",
  },
  {
    value: "Wait to confirm",
    label: "Wait to confirm",
  },
];

export default function Monthly() {
  const [value, setValue] = React.useState(moment().format("YYYY-MM"));
  const [valueYear, setValueYear] = React.useState(moment().format("YYYY"));
  const [valueMonth, setValueMonth] = React.useState(moment().format("MM"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [companyname, setCompanyname] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [form, setForm] = useState("");
  const [status, setStatus] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [formCode, setFormCode] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [insuranceid, setInsuranceid] = useState("");
  const [loadingAddform, setLoadingAddform] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingSh, setLoadingSh] = useState(false);

  const [insurance, setInsurance] = useState([]);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [values, setValues] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setErrorMsg("");
  };

  const [openModal, setOpenModal] = useState(false);
  const [loadingbutton, setloadingbutton] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    handleRemove();
    handleClearData();
  };

  const [openModaldelete, setOpenModaldelete] = useState(false);
  const [loadingbuttondelete, setloadingbuttondelete] = useState(false);
  const handleOpenModaldelete = () => {
    setOpenModaldelete(true);
    console.log(id);
  };
  const handleCloseModaldelete = () => setOpenModaldelete(false);

  const handleClickModal = () => {
    setloadingbutton(true);
    addForm();
  };

  const handleClickModaldelete = () => {
    setloadingbuttondelete(true);
    deleteMonthlyData();
  };

  const [formimport, setFormimport] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [valuepick, setValuePick] = useState("");
  // const [value, setValue] = React.useState("");
  const [date, setDate] = React.useState(dayjs("2022-04-07"));
  const [progress, setProgress] = React.useState(0);

  const [selectmonth, setSelectMonth] = React.useState(
    moment().format("YYYY-MM")
  );
  const [id, setId] = useState(null);

  let monthtrim = selectmonth.substring(5, 7);
  let yeartrim = selectmonth.substring(0, 4);

  const [importmonth, setImportMonth] = React.useState(
    moment().format("YYYY-MM")
  );

  //const [selectmonth, setSelectMonth] = useState("");
  const [company, setCompany] = useState("");
  const [template, setTemplate] = useState("");
  const [memberNo, setMemberNo] = useState("");
  const [yearly, setYearly] = useState("");
  const [monthy, setMonthy] = useState("");
  const [dataType, setDataType] = useState("");
  const [order, setOrder] = useState("");

  //////////////// Variable of Form A,B ////////////////
  const [ord1, setOrd1] = useState("");
  const [ord2, setOrd2] = useState("");
  const [ord3, setOrd3] = useState("");

  const [ind1, setInd1] = useState("");
  const [ind2, setInd2] = useState("");
  const [ind3, setInd3] = useState("");

  const [term1, setTerm1] = useState("");
  const [term2, setTerm2] = useState("");
  const [term3, setTerm3] = useState("");

  const [endo1, setEndo1] = useState("");
  const [endo2, setEndo2] = useState("");
  const [endo3, setEndo3] = useState("");

  const [mor1, setMor1] = useState("");
  const [mor2, setMor2] = useState("");
  const [mor3, setMor3] = useState("");

  const [oth1, setOth1] = useState("");
  const [oth2, setOth2] = useState("");
  const [oth3, setOth3] = useState("");

  const [PAind1, setPAind1] = useState("");
  const [PAind2, setPAind2] = useState("");
  const [PAind3, setPAind3] = useState("");

  const [PAgro1, setPAgro1] = useState("");
  const [PAgro2, setPAgro2] = useState("");
  const [PAgro3, setPAgro3] = useState("");

  const [PAstu1, setPAstu1] = useState("");
  const [PAstu2, setPAstu2] = useState("");
  const [PAstu3, setPAstu3] = useState("");

  ////////// for get DataUser //////////
  React.useEffect(() => {
    GetMonthly();
  }, []);

  const fileRef = useRef();

  const acceptableFileName = ["xlsx", "xls"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  //////////////// setting RowsPerPage ////////////////
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataMonthly.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeform = (event) => {
    setForm(event.target.value);

    if (event.target.value == "A") {
      setFormCode("A");
    }
    if (event.target.value == "B") {
      setFormCode("B");
    }
    if (event.target.value == "All") {
      setFormCode("");
    }
    console.log(event.target.value);
  };

  const handleChangestatus = (event) => {
    setStatus(event.target.value);
    if (event.target.value == "Confirm") {
      setStatusCode("1");
    } else if (event.target.value == "Wait to confirm") {
      setStatusCode("0");
    } else if (event.target.value == "All") {
      setStatusCode("");
    }
  };

  const handleChangemonth = (newValue) => {
    setSelectMonth(newValue.format("YYYY-MM"));
    console.log("selectmonth", newValue.format("YYYY-MM"));
    // console.log(monthtrim);
    // console.log(yeartrim);
  };

  const handleClearData = () => {
    //for Table 1
    setCompany("");
    setTemplate("");
    setMemberNo("");
    setYearly("");
    setMonthy("");
    setDataType("");
    setOrder("");

    //for Table 2
    setOrd1("");
    setOrd2("");
    setOrd3("");

    setInd1("");
    setInd2("");
    setInd3("");

    setTerm1("");
    setTerm2("");
    setTerm3("");

    setEndo1("");
    setEndo2("");
    setEndo3("");

    setMor1("");
    setMor2("");
    setMor3("");

    setOth1("");
    setOth2("");
    setOth3("");

    setPAind1("");
    setPAind2("");
    setPAind3("");

    setPAgro1("");
    setPAgro2("");
    setPAgro3("");

    setPAstu1("");
    setPAstu2("");
    setPAstu3("");
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
      return;
    }

    //Read The XLSX MetaData
    const data = await myFile.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log("datawb", jsonData);
    console.log("form", jsonData[1].__EMPTY_1);

    setFile(myFile);
    setFileName(myFile.name);
    setErrorMsg("");

    if (jsonData[1].__EMPTY_1 == "tplPC1T2A") {
      //for Table 1
      setCompany(jsonData[1].รายงานสถิติธุรกิจประกันชีวิต);
      setTemplate(jsonData[1].__EMPTY_1);
      setMemberNo(jsonData[1].__EMPTY_2);
      setYearly(jsonData[1].__EMPTY_3);
      setMonthy(jsonData[1].__EMPTY_4);
      setDataType(jsonData[1].__EMPTY_5);
      setOrder(jsonData[1].__EMPTY_6);

      //for Table 2
      setOrd1(jsonData[5].__EMPTY_4);
      setOrd2(jsonData[5].__EMPTY_5);
      setOrd3(jsonData[5].__EMPTY_6);

      setInd1(jsonData[6].__EMPTY_4);
      setInd2(jsonData[6].__EMPTY_5);
      setInd3(jsonData[6].__EMPTY_6);

      setTerm1(jsonData[8].__EMPTY_4);
      setTerm2(jsonData[8].__EMPTY_5);
      setTerm3(jsonData[8].__EMPTY_6);

      setEndo1(jsonData[9].__EMPTY_4);
      setEndo2(jsonData[9].__EMPTY_5);
      setEndo3(jsonData[9].__EMPTY_6);

      setMor1(jsonData[10].__EMPTY_4);
      setMor2(jsonData[10].__EMPTY_5);
      setMor3(jsonData[10].__EMPTY_6);

      setOth1(jsonData[11].__EMPTY_4);
      setOth2(jsonData[11].__EMPTY_5);
      setOth3(jsonData[11].__EMPTY_6);

      setPAind1(jsonData[12].__EMPTY_4);
      setPAind2(jsonData[12].__EMPTY_5);
      setPAind3(jsonData[12].__EMPTY_6);

      setPAgro1(jsonData[13].__EMPTY_4);
      setPAgro2(jsonData[13].__EMPTY_5);
      setPAgro3(jsonData[13].__EMPTY_6);

      setPAstu1(jsonData[14].__EMPTY_4);
      setPAstu2(jsonData[14].__EMPTY_5);
      setPAstu3(jsonData[14].__EMPTY_6);
    } else if (jsonData[1].__EMPTY_2 == "tplPC1T2B") {
      //for Table 1
      setCompany(jsonData[1].รายงานสถิติธุรกิจประกันชีวิต);
      setTemplate(jsonData[1].__EMPTY_2);
      setMemberNo(jsonData[1].__EMPTY_3);
      setYearly(jsonData[1].__EMPTY_4);
      setMonthy(jsonData[1].__EMPTY_5);
      setDataType(jsonData[1].__EMPTY_6);
      setOrder(jsonData[1].__EMPTY_7);

      //for Table 2
      setOrd1(jsonData[5].__EMPTY_4);
      setOrd2(jsonData[5].__EMPTY_5);
      setOrd3(jsonData[5].__EMPTY_6);

      setInd1(jsonData[6].__EMPTY_4);
      setInd2(jsonData[6].__EMPTY_5);
      setInd3(jsonData[6].__EMPTY_6);

      setTerm1(jsonData[8].__EMPTY_4);
      setTerm2(jsonData[8].__EMPTY_5);
      setTerm3(jsonData[8].__EMPTY_6);

      setEndo1(jsonData[9].__EMPTY_4);
      setEndo2(jsonData[9].__EMPTY_5);
      setEndo3(jsonData[9].__EMPTY_6);

      setMor1(jsonData[10].__EMPTY_4);
      setMor2(jsonData[10].__EMPTY_5);
      setMor3(jsonData[10].__EMPTY_6);

      setOth1(jsonData[11].__EMPTY_4);
      setOth2(jsonData[11].__EMPTY_5);
      setOth3(jsonData[11].__EMPTY_6);

      setPAind1(jsonData[12].__EMPTY_4);
      setPAind2(jsonData[12].__EMPTY_5);
      setPAind3(jsonData[12].__EMPTY_6);

      setPAgro1(jsonData[13].__EMPTY_4);
      setPAgro2(jsonData[13].__EMPTY_5);
      setPAgro3(jsonData[13].__EMPTY_6);

      setPAstu1(jsonData[14].__EMPTY_4);
      setPAstu2(jsonData[14].__EMPTY_5);
      setPAstu3(jsonData[14].__EMPTY_6);
    } else {
      Swal.fire(
        "form invalid?",
        "Form is not match ,Please check !!",
        "question"
      );
      handleRemove();
    }
  };

  let temptrim = template.substring(8, 16);

  const handleRemove = (jsonData) => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = "";
    console.log("datawb", jsonData);
  };

  const handleClickSearch = () => {
    setLoading(true);
    setLoadingSh(true);
    GetMonthly();
  };

  //////////////// Get DataMonthly List ////////////////
  const GetMonthly = () => {
    let qString = "?";
    //if (companyname) qString = qString + "&company_name=เมือง";
    if (companyname) qString = qString + "&company_name=" + companyname;
    if (valueYear) qString = qString + "&year=" + valueYear;
    if (valueMonth) qString = qString + "&month=" + valueMonth;
    if (formCode) qString = qString + "&formtype=" + formCode;
    if (statusCode) qString = qString + "&status=" + statusCode;

    getMonthly(qString).then((res) => {
      console.log("Datamonthly", res.data);
      if (res && res.status === 200) {
        setDataMonthly(res.data);
      }
      setLoading(false);
      setLoadingSh(false);
    });
  };

  // //////////////// Get User List ////////////////
  // const GetInsurance = () => {
  //   let qString = "?";
  //   getCompanyAll(qString).then((res) => {
  //     console.log("Datamember1", res.data);
  //     //console.log(res.data.message);
  //     if (res && res.status === 200) {
  //       setInsurance(res.data);
  //     }
  //     setLoading(false);
  //   });
  // };

  //////////////// Add User ////////////////

  const addForm = () => {
    //setLoadingAddform(false);

    values["company_name"] = company;
    values["template"] = template;
    values["company_code"] = memberNo;
    values["tag_money_year"] = yearly;
    values["tag_money_month"] = monthy;
    values["data_type"] = dataType;
    values["item_qty"] = order;

    values["ord1"] = ord1;
    values["ord2"] = ord2;
    values["ord3"] = ord3;

    values["ind1"] = ind1;
    values["ind2"] = ind2;
    values["ind3"] = ind3;

    values["term1"] = term1;
    values["term2"] = term2;
    values["term3"] = term3;

    values["endo1"] = endo1;
    values["endo2"] = endo2;
    values["endo3"] = endo3;

    values["mor1"] = mor1;
    values["mor2"] = mor2;
    values["mor3"] = mor3;

    values["oth1"] = oth1;
    values["oth2"] = oth2;
    values["oth3"] = oth3;

    values["PAind1"] = PAind1;
    values["PAind2"] = PAind2;
    values["PAind3"] = PAind3;

    values["PAgro1"] = PAgro1;
    values["PAgro2"] = PAgro2;
    values["PAgro3"] = PAgro3;

    values["PAstu1"] = PAstu1;
    values["PAstu2"] = PAstu2;
    values["PAstu3"] = PAstu3;

    if (template == "tplPC1T2A") {
      postAddformA(values).then((response) => {
        console.log("postAdduser: response", response);
        console.log("postAdduser: values", values);
        if (response && (response.status === 200 || response.status === 201)) {
          setOpenModal(false);
          //console.log("tag_money_id", response.data.tag_money_id);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "เพิ่ม Form เรียบร้อย!",
            showConfirmButton: false,
            timer: 5000,
          });
          window.location.pathname = `/monthly/editdata/${response.data.tag_money_id}`;
        } else {
          console.log(
            "API response error1 [" + response.status + "]",
            response.data.message
          );
          setOpenModal(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
        setloadingbutton(false);
      });
    } else if (template == "tplPC1T2B") {
      postAddformB(values).then((response) => {
        console.log("postAdduser: response", response);
        console.log("postAdduser: values", values);
        if (response && (response.status === 200 || response.status === 201)) {
          setOpenModal(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "เพิ่ม Form เรียบร้อย!",
            showConfirmButton: false,
            timer: 5000,
          });
          window.location.pathname = `/monthly/editdata/${response.data.tag_money_id}`;
        } else {
          console.log(
            "API response error1 [" + response.status + "]",
            response.data.message
          );
          setOpenModal(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.message,
          });
        }
        setloadingbutton(false);
      });
    }
  };

  //////////////// Delete Monthly by id ////////////////
  function deleteMonthlyData() {
    deleteMonthly(id).then((res) => {
      if (res && res.status === 200) {
        handleCloseModaldelete();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Detete Form เรียบร้อย!",
          showConfirmButton: false,
          timer: 5000,
        });
        window.location.pathname = `/monthly`;
      } else {
        handleCloseModaldelete();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message,
        });
      }
      setloadingbuttondelete(false);
    });
  }

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

      <Box sx={{ display: "flex", paddingBottom: "20px" }}>
        <Box sx={{ width: 400, display: "flex", mr: 2 }}>
          <TextField
            placeholder="Search Insurance Company"
            size="middle"
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
              console.log(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ mr: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DesktopDatePicker
              clearable
              disableFuture
              label="Month and Year"
              inputFormat="YYYY-MM"
              views={["year", "month"]}
              value={selectmonth}
              onChange={handleChangemonth}
              renderInput={(params) => <TextField {...params} />}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setSelectMonth(null)}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
              InputAdornmentProps={{
                position: "start",
              }}
            /> */}
            <DatePicker
              disableFuture
              views={["year", "month"]}
              label="Year and Month"
              value={value}
              onChange={(newValue) => {
                setValue(newValue.format("YYYY-MM"));
                setValueYear(newValue.format("YYYY"));
                setValueMonth(newValue.format("MM"));
                // console.log("Year", newValue.format("YYYY"));
                // console.log("Month", newValue.format("MM"));
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      setValue(null);
                      setValueYear(null);
                      setValueMonth(null);
                      // console.log("Year and Month", value);
                      // console.log("Year", valueYear);
                      // console.log("Month", valueMonth);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                ),
              }}
              InputAdornmentProps={{
                position: "start",
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="middle"
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
            size="middle"
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

        <LoadingButton
          onClick={handleClickSearch}
          loading={loadingSh}
          loadingIndicator="Loading…"
          variant="contained"
          style={{ width: "80px" }}
        >
          <span style={{ fontSize: "14px" }}>ค้นหา</span>
        </LoadingButton>
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
                <TableCell colSpan={6}>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : dataMonthly.length > 0 ? (
              (rowsPerPage > 0
                ? dataMonthly.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dataMonthly
              ).map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ width: 500 }} align="left">
                    <Typography
                      style={{ fontSize: "1.15rem", fontWeight: "450" }}
                    >
                      {row.company_name}
                    </Typography>
                    <Typography style={{ fontSize: "1rem" }}>
                      Import Time: {row.tag_money_time}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: 120 }} align="center">
                    <Typography
                      style={{ fontSize: "1.15rem", fontWeight: "450" }}
                    >
                      {row.month_name}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="center">
                    <Typography
                      style={{ fontSize: "1.15rem", fontWeight: "450" }}
                    >
                      {row.tag_money_year}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="center">
                    <Typography
                      style={{ fontSize: "1.15rem", fontWeight: "450" }}
                    >
                      {row.form_type}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="center">
                    {row.isConfirm == "1" ? (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                          color: "#43a047",
                        }}
                      >
                        Confirm
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                          color: "#ef6c00",
                        }}
                      >
                        Wait to confirm
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 120 }} align="center">
                    <Typography
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "450",
                      }}
                    >
                      <Link
                        to={`/monthly/editdata/${row.tag_money_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <FiEdit
                          style={{ color: "#4fc3f7", cursor: "pointer" }}
                        />
                      </Link>
                      &nbsp;&nbsp;
                      <BsFillXCircleFill
                        style={{ color: "#f44336", cursor: "pointer" }}
                        onClick={() => {
                          setId(row.tag_money_id);
                          //console.log(row.tag_money_id);
                          handleOpenModaldelete();
                        }}
                      />
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}

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
                count={dataMonthly.length}
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
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/*//////////////// Modal popup for Import form A,B ////////////////*/}
      <Modal open={open}>
        <Box sx={style}>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" style={{ color: "#1565c0" }}>
              Import Report
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box>
                {fileName && (
                  <Typography
                    style={{
                      fontSize: "14px",
                      color: "#357a38",
                      fontWeight: 400,
                    }}
                  >
                    upload a file already!!
                  </Typography>
                )}
                {!fileName && (
                  <Typography style={{ fontSize: "14px", color: "#9E9E9E" }}>
                    Please upload a file
                  </Typography>
                )}
              </Box>
              <Box>
                <input
                  type="file"
                  accept="xlsx,xls"
                  multiple={false}
                  onChange={(e) => handleFile(e)}
                  ref={fileRef}
                />
                {fileName && (
                  <ClearIcon
                    onClick={() => {
                      handleRemove();
                      handleClearData();
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
          {fileName && (
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Typography fontSize={14}>
                <span style={{ color: "#1565c0", fontWeight: 500 }}>
                  ชื่อบริษัท :{" "}
                </span>
                {company}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#1565c0", fontWeight: 500 }}>
                  Form Import :{" "}
                </span>
                {temptrim}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#1565c0", fontWeight: 500 }}>
                  ประจำเดือน :{" "}
                </span>
                {monthy}
              </Typography>
              <Typography fontSize={14}>
                <span style={{ color: "#1565c0", fontWeight: 500 }}>
                  ประจำปี :{" "}
                </span>
                {yearly}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              mt: 5,
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography color="error" variant="h6" fontWeight={400}>
                {errorMsg}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                size="middle"
                style={{ backgroundColor: "#32B917", marginRight: "15px" }}
                onClick={() => {
                  if (fileName) {
                    handleOpenModal();
                    handleClose();
                  } else {
                    setErrorMsg("** Please choose file excel");
                  }
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
                  handleClearData();
                }}
              >
                <Typography fontSize={14}>Back</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal open={openModal}>
        <Box sx={styleModal}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h5" component="h2">
              Import data form
            </Typography>
            <IconButton size="large">
              <CloseIcon fontSize="inherit" onClick={handleCloseModal} />
            </IconButton>
          </Box>
          <Typography
            sx={{ mt: 3, color: "#616161" }}
            fontSize={14}
            fontWeight={300}
          >
            Do you want to confirm import data
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "5rem",
            }}
          >
            <LoadingButton
              color="primary"
              onClick={handleClickModal}
              loading={loadingbutton}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              size="large"
            >
              <span>Save</span>
            </LoadingButton>
            <Button
              style={{ marginLeft: 12 }}
              variant="outlined"
              size="middle"
              color="inherit"
              onClick={handleCloseModal}
            >
              <Typography fontSize={14}>cancel</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* /////////// Modal confirm Delete form /////////// */}

      <Modal open={openModaldelete}>
        <Box sx={styleModaldelete}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h5" component="h2">
              Delete form
            </Typography>
            <IconButton size="large">
              <CloseIcon fontSize="inherit" onClick={handleCloseModaldelete} />
            </IconButton>
          </Box>
          <Typography
            sx={{ mt: 3, color: "#616161" }}
            fontSize={14}
            fontWeight={300}
          >
            Do you want to confirm Delete form ?
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "5rem",
            }}
          >
            <LoadingButton
              color="error"
              onClick={handleClickModaldelete}
              loading={loadingbuttondelete}
              loadingPosition="start"
              startIcon={<DeleteIcon />}
              variant="contained"
              size="large"
            >
              <span>Delete</span>
            </LoadingButton>
            <Button
              style={{ marginLeft: 12 }}
              variant="outlined"
              size="middle"
              color="inherit"
              onClick={handleCloseModaldelete}
            >
              <Typography fontSize={14}>cancel</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
