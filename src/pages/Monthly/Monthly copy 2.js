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
import { getCompanyAll,getMonthly } from "../service";
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
  const [loading, setLoading] = useState(true);
  const [insurance, setInsurance] = useState([]);
  const [dataMonthly,setDataMonthly] = useState([]);

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
  const [progress, setProgress] = React.useState(0);

  // const [dataRow1, setDataRow1] = useState();
  // const [dataRow2, setDataRow2] = useState([]);
  // const [dataRow3, setDataRow3] = useState([]);
  // const [dataRow4, setDataRow4] = useState([]);
  // const [dataRow5, setDataRow5] = useState([]);
  // const [dataRow6, setDataRow6] = useState([]);
  // const [dataRow7, setDataRow7] = useState([]);
  // const [dataRow8, setDataRow8] = useState([]);
  // const [dataRow9, setDataRow9] = useState([]);
  // const [dataRow10, setDataRow10] = useState([]);
  // const [dataRow11, setDataRow11] = useState([]);
  // const [dataRow12, setDataRow12] = useState([]);
  // const [dataRow13, setDataRow13] = useState([]);

  const [company, setCompany] = useState("");
  const [template, setTemplate] = useState("");
  const [memberNo, setMemberNo] = useState("");
  const [yearly, setYearly] = useState("");
  const [monthy, setMonthy] = useState("");
  const [dataType, setDataType] = useState("");
  const [order, setOrder] = useState("");

  //////////////// Variable of Form A ////////////////
  const [ord_insur, setOrd_insur] = useState("");
  const [ord_person, setOrd_person] = useState("");
  const [ord_money, setOrd_money] = useState("");
  const [ind_insur, setInd_insur] = useState("");
  const [ind_person, setInd_person] = useState("");
  const [ind_money, setInd_money] = useState("");
  // const [gro_insur, setGro_insur] = useState("");
  // const [gro_person, setGro_person] = useState("");
  // const [gro_money, setGro_money] = useState("");
  const [term_insur, setTerm_insur] = useState("");
  const [term_person, setTerm_person] = useState("");
  const [term_money, setTerm_money] = useState("");
  const [endo_insur, setEndo_insur] = useState("");
  const [endo_person, setEndo_person] = useState("");
  const [endo_money, setEndo_money] = useState("");
  const [mor_insur, setMor_insur] = useState("");
  const [mor_person, setMor_person] = useState("");
  const [mor_money, setMor_money] = useState("");
  const [oth_insur, setOth_insur] = useState("");
  const [oth_person, setOth_person] = useState("");
  const [oth_money, setOth_money] = useState("");
  const [PAind_insur, setPAind_insur] = useState("");
  const [PAind_person, setPAind_person] = useState("");
  const [PAind_money, setPAind_money] = useState("");
  const [PAgro_insur, setPAgro_insur] = useState("");
  const [PAgro_person, setPAgro_person] = useState("");
  const [PAgro_money, setPAgro_money] = useState("");
  const [PAstu_insur, setPAstu_insur] = useState("");
  const [PAstu_person, setPAstu_person] = useState("");
  const [PAstu_money, setPAstu_money] = useState("");

  //////////////// Variable of Form B ////////////////

  const [ord_once, setOrd_once] = useState("");
  const [ord_first, setOrd_first] = useState("");
  const [ord_extend, setOrd_extend] = useState("");
  const [ind_once, setInd_once] = useState("");
  const [ind_first, setInd_first] = useState("");
  const [ind_extend, setInd_extend] = useState("");
  // const [gro_once, setGro_once] = useState("");
  // const [gro_first, setGro_first] = useState("");
  // const [gro_extend, setGro_extend] = useState("");
  const [term_once, setTerm_once] = useState("");
  const [term_first, setTerm_first] = useState("");
  const [term_extend, setTerm_extend] = useState("");
  const [endo_once, setEndo_once] = useState("");
  const [endo_first, setEndo_first] = useState("");
  const [endo_extend, setEndo_extend] = useState("");
  const [mor_once, setMor_once] = useState("");
  const [mor_first, setMor_first] = useState("");
  const [mor_extend, setMor_extend] = useState("");
  const [oth_once, setOth_once] = useState("");
  const [oth_first, setOth_first] = useState("");
  const [oth_extend, setOth_extend] = useState("");
  const [PAind_once, setPAind_once] = useState("");
  const [PAind_first, setPAind_first] = useState("");
  const [PAind_extend, setPAind_extend] = useState("");
  const [PAgro_once, setPAgro_once] = useState("");
  const [PAgro_first, setPAgro_first] = useState("");
  const [PAgro_extend, setPAgro_extend] = useState("");
  const [PAstu_once, setPAstu_once] = useState("");
  const [PAstu_first, setPAstu_first] = useState("");
  const [PAstu_extend, setPAstu_extend] = useState("");

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
      setOrd_insur(jsonData[5].__EMPTY_4);
      setOrd_person(jsonData[5].__EMPTY_5);
      setOrd_money(jsonData[5].__EMPTY_6);

      setInd_insur(jsonData[6].__EMPTY_4);
      setInd_person(jsonData[6].__EMPTY_5);
      setInd_money(jsonData[6].__EMPTY_6);

      // setGro_insur(jsonData[7].__EMPTY_4);
      // setGro_person(jsonData[7].__EMPTY_5);
      // setGro_money(jsonData[7].__EMPTY_6);

      setTerm_insur(jsonData[8].__EMPTY_4);
      setTerm_person(jsonData[8].__EMPTY_5);
      setTerm_money(jsonData[8].__EMPTY_6);

      setEndo_insur(jsonData[9].__EMPTY_4);
      setEndo_person(jsonData[9].__EMPTY_5);
      setEndo_money(jsonData[9].__EMPTY_6);

      setMor_insur(jsonData[10].__EMPTY_4);
      setMor_person(jsonData[10].__EMPTY_5);
      setMor_money(jsonData[10].__EMPTY_6);

      setOth_insur(jsonData[11].__EMPTY_4);
      setOth_person(jsonData[11].__EMPTY_5);
      setOth_money(jsonData[11].__EMPTY_6);

      setPAind_insur(jsonData[12].__EMPTY_4);
      setPAind_person(jsonData[12].__EMPTY_5);
      setPAind_money(jsonData[12].__EMPTY_6);

      setPAgro_insur(jsonData[13].__EMPTY_4);
      setPAgro_person(jsonData[13].__EMPTY_5);
      setPAgro_money(jsonData[13].__EMPTY_6);

      setPAstu_insur(jsonData[14].__EMPTY_4);
      setPAstu_person(jsonData[14].__EMPTY_5);
      setPAstu_money(jsonData[14].__EMPTY_6);
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
      setOrd_once(jsonData[5].__EMPTY_4);
      setOrd_first(jsonData[5].__EMPTY_5);
      setOrd_extend(jsonData[5].__EMPTY_6);

      setInd_once(jsonData[6].__EMPTY_4);
      setInd_first(jsonData[6].__EMPTY_5);
      setInd_extend(jsonData[6].__EMPTY_6);

      // setGro_once(jsonData[7].__EMPTY_4);
      // setGro_first(jsonData[7].__EMPTY_5);
      // setGro_extend(jsonData[7].__EMPTY_6);

      setTerm_once(jsonData[8].__EMPTY_4);
      setTerm_first(jsonData[8].__EMPTY_5);
      setTerm_extend(jsonData[8].__EMPTY_6);

      setEndo_once(jsonData[9].__EMPTY_4);
      setEndo_first(jsonData[9].__EMPTY_5);
      setEndo_extend(jsonData[9].__EMPTY_6);

      setMor_once(jsonData[10].__EMPTY_4);
      setMor_first(jsonData[10].__EMPTY_5);
      setMor_extend(jsonData[10].__EMPTY_6);

      setOth_once(jsonData[11].__EMPTY_4);
      setOth_first(jsonData[11].__EMPTY_5);
      setOth_extend(jsonData[11].__EMPTY_6);

      setPAind_once(jsonData[12].__EMPTY_4);
      setPAind_first(jsonData[12].__EMPTY_5);
      setPAind_extend(jsonData[12].__EMPTY_6);

      setPAgro_once(jsonData[13].__EMPTY_4);
      setPAgro_first(jsonData[13].__EMPTY_5);
      setPAgro_extend(jsonData[13].__EMPTY_6);

      setPAstu_once(jsonData[14].__EMPTY_4);
      setPAstu_first(jsonData[14].__EMPTY_5);
      setPAstu_extend(jsonData[14].__EMPTY_6);
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
            {/* <TableContainer component={Paper}>
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
            </TableContainer> */}
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
