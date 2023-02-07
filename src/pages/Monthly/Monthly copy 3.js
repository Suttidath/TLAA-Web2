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
import { getCompanyAll,getMonthly,postAddformA } from "../service";
import LinearProgress from "@mui/material/LinearProgress";
import { Empty } from "antd";

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

const styleEditA = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  boxShadow: 16,
  p: 3,
};

const styleEditB = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
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
    align: "center",
  },
  {
    id: "รหัสสมาชิก",
    label: "รหัสสมาชิก",
    align: "center",
  },
  {
    id: "ค.ศ.",
    label: "ค.ศ.",
    align: "center",
  },
  {
    id: "ประจำเดือน",
    label: "ประจำเดือน",
    align: "center",
  },
  {
    id: "ประเภทข้อมูล",
    label: "ประเภทข้อมูล",
    align: "center",
  },
  {
    id: "จำนวนรายการ",
    label: "จำนวนรายการ",
    align: "center",
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
  const [loadingAddform, setLoadingAddform] = useState(true);
  const [loading, setLoading] = useState(true);
  const [insurance, setInsurance] = useState([]);
  const [dataMonthly,setDataMonthly] = useState([]);
  const [values, setValues] = useState({});


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEditA, setOpenEditA] = useState(false);
  const handleOpenEditA = () => setOpenEditA(true);
  const handleCloseEditA = () => setOpenEditA(false);

  
  const [openEditB, setOpenEditB] = useState(false);
  const handleOpenEditB = () => setOpenEditB(true);
  const handleCloseEditB = () => setOpenEditB(false);

  const [formimport, setFormimport] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [valuepick, setValuePick] = useState("");
  const [valuemonth, setValueMonth] = useState("");
  // const [value, setValue] = React.useState("");
  const [date, setDate] = React.useState(dayjs("2022-04-07"));
  const [progress, setProgress] = React.useState(0);

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

  // const handleRemove = () => {
  //   setFile(null);
  //   setFileName(null);
  //   fileRef.current.value = "";
  // };

  const handleRemove = (jsonData) => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = "";
    console.log("datawb", jsonData);
  };

    //////////////// Get DataMonthly List ////////////////
    const GetMonthly = () => {
      let qString = "?";
      getMonthly(qString).then((res) => {
        console.log("Datamonthly", res.data);
        if (res && res.status === 200) {
          setDataMonthly(res.data);
        }
      });
    };


  //////////////// Get User List ////////////////
  const GetInsurance = () => {
    let qString = "?";
    getCompanyAll(qString).then((res) => {
      console.log("Datamember1", res.data);
      //console.log(res.data.message);
      if (res && res.status === 200) {
        setInsurance(res.data);
      }
      setLoading(false);
    });
  };

  //////////////// Add User ////////////////

  const addFormA = () => {
    setLoadingAddform(false);

    values["company_name"] = company;
    values["template"] = template;
    values["company_code"] = memberNo ;
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

    postAddformA(values).then((response) => {
      console.log("postAdduser: response", response);
      console.log("postAdduser: values", values);

      if (response && (response.status === 200 || response.status === 201)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "เพิ่ม Member เรียบร้อย!",
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.pathname = "/member";
      } else {
        console.log(
          "API response error1 [" + response.status + "]",
          response.data.message
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data.message,
        });
      }
      setLoadingAddform(true);
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
              ? dataMonthly.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                  {/* <Typography
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: "450",
                      color:
                        (row.status === "Confirm" && "#43a047") ||
                        (row.status === "Wait to confirm" && "#ef6c00"),
                    }}
                  >
                    {row.isConfirm}
                  </Typography> */}
                  {row.isConfirm == "1" ? (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                          color:"#43a047"
                        }}
                      >
                        Confirm
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                          color:"#ef6c00"
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
            ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
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
                addFormA();
                //  handleClose();
                // if (template == "tplPC1T2A") {
                //   handleOpenEditA();
                // } else if (template == "tplPC1T2B") {
                //   handleOpenEditB();
                // }
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
              }}
            >
              <Typography fontSize={14}>Back</Typography>
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*//////////////// Modal popup for Edit formA ////////////////*/}
      <Modal open={openEditA}>
        <Box sx={styleEditA}>
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
                            fontSize: "1.2rem",
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
                      fontSize: "1rem",  
                    },
                  }}
                >
                  <TableRow>
                    <TableCell align="left">&nbsp;&nbsp; {company}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{template}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{memberNo}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{yearly}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{monthy}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{dataType}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{order}</TableCell>
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
              fontSize: "1rem",
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
            
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead
                sx={{
                  "& .MuiTableCell-root": {
                    padding: "12px",
                    fontSize: "1.1rem",
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <TableRow>
                <TableCell  align="center" width={400}>ประเภท</TableCell>
                <TableCell  align="left" width={120}>จำนวนกรมธรรม์</TableCell>
                <TableCell  align="left" width={120}>จำนวนคน</TableCell>
                <TableCell  align="center" width={120}>จำนวนเงินเอาประกันภัย {<br></br>} (ของสัญญาหลัก)</TableCell>
                  
                </TableRow>
                
              </TableHead>
                <TableBody
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "10px",
                      fontSize: "1rem",
                    },
                  }}
                >
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; สามัญ
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{ord1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{ord2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{ord3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; อุตสาหกรรม
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{ind1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{ind1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{ind2}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; กลุ่ม
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;</TableCell>
                    <TableCell>&nbsp;&nbsp;</TableCell>
                    <TableCell>&nbsp;&nbsp;</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        - แบบชั่วระยะเวลา (ํYearly Renewable Term Insurance)
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{term1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{term2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{term3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        - แบบสะสมทรัพย์ (Endowment Insurance)
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{endo1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{endo2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{endo3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        - แบบคุ้มครองเงินกู้จำนอง (Mortgage Insurance)
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{mor1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{mor2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{mor3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        - แบบอื่นๆ
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{oth1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{oth2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{oth3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; สัญญาหลักประกันภัยอุบัติเหตุส่วนบุคคล
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{PAind1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{PAind2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{PAind3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; สัญญาหลักประกันภัยอุบัติเหตุกลุ่ม
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{PAgro1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{PAgro2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{PAgro3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "left",
                        }}
                      >
                        &nbsp;&nbsp; สัญญาหลักประกันภัยอุบัติเหตุสำหรับนักเรียน นิสิต และนักศึกษา
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{PAstu1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{PAstu2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{PAstu3}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Box
                        style={{
                          width: "400px",
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        &nbsp;&nbsp; รวม
                      </Box>
                    </TableCell>
                    <TableCell>&nbsp;&nbsp;{ord1+ind1+term1+endo1+mor1+oth1+PAind1+PAgro1+PAstu1}</TableCell>
                    <TableCell>&nbsp;&nbsp;{ord2+ind2+term2+endo2+mor2+oth2+PAind2+PAgro2+PAstu2}</TableCell>
                    <TableCell>&nbsp;&nbsp;{ord3+ind3+term3+endo3+mor3+oth3+PAind3+PAgro3+PAstu3}</TableCell>
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
                // onClick={()=>{
                //   handleCloseEditA();
                //   handleCloseEditB();
                // }}
                onClick={handleCloseEditA}
              >
                <Typography fontSize={14}>Back</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>


      {/*//////////////// Modal popup for Edit formB ////////////////*/}
      <Modal open={openEditB}>
        <Box sx={styleEditB}>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5">Form B</Typography>
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
                            fontSize: "1.2rem",
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
                      fontSize: "1rem",  
                    },
                  }}
                >
                  <TableRow>
                    <TableCell align="left">&nbsp;&nbsp; {company}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{template}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{memberNo}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{yearly}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{monthy}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{dataType}</TableCell>
                    <TableCell align="center">&nbsp;&nbsp;{order}</TableCell>
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
              fontSize: "1rem",
            }}
          >
            <Typography
              style={{
                color: "#1976d2",
              }}
            >
              2. เบี้ยประกันภัย (รวมของสัญญาเพิ่มเติมทุกแบบด้วย)
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
            
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >

              <TableHead
                sx={{
                  "& .MuiTableCell-root": {
                    padding: "12px",
                    fontSize: "1.1rem",
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                <TableRow>
                  <TableCell rowSpan={2} align="center" width={500}>ประเภท</TableCell>
                  <TableCell rowSpan={2} align="center" width={150}>แบบเบี้ยประกันภัย {<br></br>} จ่ายครั้งเดียว</TableCell>
                  <TableCell colSpan={2} align="center">
                    แบบเบี้ยประกันภัยรายปี
                  </TableCell>
                  <TableCell rowSpan={2} align="center" width={150}>รวม</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" width={150}>ปีแรก</TableCell>
                  <TableCell align="center" width={150}>ปีต่ออายุ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "& .MuiTableCell-root": {
                    padding: "12px",
                    fontSize: "1rem",
                  },
                }}
              >
                <TableRow>
                  <TableCell align="left">สามัญ</TableCell>
                  <TableCell align="left">{ord1}</TableCell>
                  <TableCell align="left">{ord2}</TableCell>
                  <TableCell align="left">{ord3}</TableCell>
                  <TableCell align="left">{ord1+ord2+ord3}</TableCell>
                  
                </TableRow>
                <TableRow>
                <TableCell align="left">อุตสาหกรรม</TableCell>
                  <TableCell align="left">{ind1}</TableCell>
                  <TableCell align="left">{ind2}</TableCell>
                  <TableCell align="left">{ind3}</TableCell>
                  <TableCell align="left">{ind1+ind2+ind3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">กลุ่ม</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">
                    &nbsp; &nbsp; - แบบชั่วระยะเวลา (Yearly Renewable Term
                    Insurance)
                  </TableCell>
                  <TableCell align="left">{term1}</TableCell>
                  <TableCell align="left">{term2}</TableCell>
                  <TableCell align="left">{term3}</TableCell>
                  <TableCell align="left">{term1+term2+term3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">
                    &nbsp; &nbsp; - แบบสะสมทรัพย์ (Endowment Insurance)
                  </TableCell>
                  <TableCell align="left">{endo1}</TableCell>
                  <TableCell align="left">{endo2}</TableCell>
                  <TableCell align="left">{endo3}</TableCell>
                  <TableCell align="left">{endo1+endo2+endo3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">
                    &nbsp; &nbsp; - แบบคุ้มครองเงินกู้จำนอง (Mortgage Insurance)
                  </TableCell>
                  <TableCell align="left">{mor1}</TableCell>
                  <TableCell align="left">{mor2}</TableCell>
                  <TableCell align="left">{mor3}</TableCell>
                  <TableCell align="left">{mor1+mor2+mor3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">&nbsp; &nbsp; - แบบอื่น ๆ</TableCell>
                  <TableCell align="left">{oth1}</TableCell>
                  <TableCell align="left">{oth2}</TableCell>
                  <TableCell align="left">{oth3}</TableCell>
                  <TableCell align="left">{oth1+oth2+oth3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">
                    สัญญาหลักประกันภัยอุบัติเหตุส่วนบุคคล
                  </TableCell>
                  <TableCell align="left">{PAind1}</TableCell>
                  <TableCell align="left">{PAind2}</TableCell>
                  <TableCell align="left">{PAind3}</TableCell>
                  <TableCell align="left">{PAind1+PAind2+PAind3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">
                    สัญญาหลักประกันภัยอุบัติเหตุกลุ่ม
                  </TableCell>
                  <TableCell align="left">{PAgro1}</TableCell>
                  <TableCell align="left">{PAgro2}</TableCell>
                  <TableCell align="left">{PAgro3}</TableCell>
                  <TableCell align="left">{PAgro1+PAgro2+PAgro3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="left">
                    สัญญาหลักประกันภัยอุบัติเหตุสำหรับนักเรียน นิสิต และนักศึกษา
                  </TableCell> 
                  <TableCell align="left">{PAstu1}</TableCell>
                  <TableCell align="left">{PAstu2}</TableCell>
                  <TableCell align="left">{PAstu3}</TableCell>
                  <TableCell align="left">{PAstu1+PAstu2+PAstu3}</TableCell>
                </TableRow>
                <TableRow>
                <TableCell align="center">รวม</TableCell>
                  <TableCell align="left">{ord1+ind1+term1+endo1+mor1+oth1+PAind1+PAgro1+PAstu1}</TableCell>
                  <TableCell align="left">{ord2+ind2+term2+endo2+mor2+oth2+PAind2+PAgro2+PAstu2}</TableCell>
                  <TableCell align="left">{ord3+ind3+term3+endo3+mor3+oth3+PAind3+PAgro3+PAstu3}</TableCell>
                  <TableCell align="left">0</TableCell>
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
                onClick={handleCloseEditB}
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
