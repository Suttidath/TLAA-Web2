import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
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
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Modal,
  Switch,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import {
  getCompany,
  postEditmember,
  getCompanyRecord,
  postChangecom,
} from "../service";
import LinearProgress from "@mui/material/LinearProgress";
import { Empty } from "antd";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment/moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MaskedInput from "react-text-mask";
import NumericInput from "material-ui-numeric-input";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 200,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 16,
  borderRadius: 2,
  p: 5,
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

const changecomp = [
  {
    id: "1",
    label: "เปลี่ยนครั้งที่",
    align: "left",
  },

  {
    id: "2",
    label: "ชื่อบริษัทประกันใหม่",
    align: "left",
  },
  {
    id: "3",
    label: "เปลี่ยนเมื่อวันที่",
    align: "left",
  },
];

export default function User() {
  const [companyrecord, setCompanyRecord] = useState([]);
  const [datacompany, setDatacompany] = useState([]);
  const [loadingmember, setLoadingMember] = useState(true);
  const [loadingcomrecord, setLoadingComrecord] = useState(true);
  const [loadingeditmember, setLoadingEditmember] = useState(true);
  const [loadingchange, setLoadingChange] = useState(true);

  // const [status, setStatus] = React.useState("");
  const [thaiName, setThaiName] = React.useState("");
  const [engName, setEngName] = React.useState("");
  const [engEtName, setengEtName] = React.useState("");
  const [companyCode, setCompanyCode] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fax, setFax] = React.useState("");
  const [tax, setTax] = React.useState(null);

  const [errTextTname, setErrTextTname] = React.useState("");
  const [errTname, setErrTname] = React.useState(false);
  const [errTextEname, setErrTextEname] = React.useState("");
  const [errEname, setErrEname] = React.useState(false);
  const [errTextEetname, setErrTextEetname] = React.useState("");
  const [errEetname, setErrEetname] = React.useState(false);

  const [checked, setChecked] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [values, setValues] = useState({});

  const [openeditcompany, setOpeneditcompany] = React.useState(false);
  const handleOpeneditcompany = () => setOpeneditcompany(true);
  const handleCloseeditcompany = () => setOpeneditcompany(false);

  const { id } = useParams();

  //////////////// Modal confirm edit member ////////////////

  const [openModal, setOpenModal] = useState(false);
  const [loadingbutton, setloadingbutton] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickModal = () => {
    setloadingbutton(true);
    Editmember();
  };

  //////////////// change company name ////////////////
  const [newThaiName, setNewThaiName] = React.useState("");
  const [newEngName, setNewEngName] = React.useState("");
  const [newShortName, setNewShortName] = React.useState("");
  const [valuedate, setValuedate] = React.useState(null);

  //////////////// setting Tabs ////////////////
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  /////// for datetimepicker ////////

  const [selectdate, setSelectdate] = React.useState(
    moment().format("YYYY-MM-DD")
  );

  const handleChangedate = (newValue) => {
    setSelectdate(newValue.format("YYYY-MM-DD"));
    console.log(newValue.format("YYYY-MM-DD"));
  };

  const time = moment().format("hh:mm:ss");
  //  const yeardf = moment().format('YYYY');

  ////////// for get DataUser //////////
  React.useEffect(() => {
    getDatacompany();
    getDatacompanyRecord();
  }, []);

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  ////////////// Get Member by id ////////////////
  function getDatacompany() {
    getCompany(id).then((res) => {
      //console.log(`getcompany-> id`, id);
      //console.log(`getcompany`, res);

      if (res && res.status === 200) {
        setDatacompany(res.data);
        setThaiName(res.data.company_name);
        setEngName(res.data.company_name_eng);
        setengEtName(res.data.company_name_eng_et);
        setCompanyCode(res.data.company_code);
        setPhone(res.data.phone);
        setAddress1(res.data.address1);
        setAddress2(res.data.address2);
        setEmail(res.data.email);
        setFax(res.data.fax);
        setTax(res.data.tax_number);

        if (res.data.isActive == "1") {
          setChecked(true);
        } else {
          setChecked(false);
        }
        console.log(`getcompany`, res.data);
      }
      setLoadingMember(false);
    });
  }

  //////////////// Edit Member ////////////////

  const Editmember = () => {
    //setLoadingEditmember(false);
    values["id"] = id;
    values["company_name"] = thaiName;
    values["company_name_eng"] = engName;
    values["company_name_eng_et"] = engEtName;
    values["company_code"] = companyCode;
    values["phone"] = phone;
    values["address1"] = address1;
    values["email"] = email;
    values["address2"] = address2;
    values["fax"] = fax;
    values["tax_number"] = tax;

    if (checked == true) {
      values["isActive"] = "1";
    } else if (checked == false) {
      values["isActive"] = "0";
    }

    postEditmember(values, id).then((response) => {
      console.log("postEditmember: response", response);
      console.log("postid: id", id);
      console.log("postid: values", values);

      if (response && (response.status === 200 || response.status === 201)) {
        handleCloseModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update Member เรียบร้อย!",
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.pathname = "/member";
      } else {
        console.log(
          "API response error1 [" + response.status + "]",
          response.data.message
        );
        handleCloseModal();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Update Member ได้ !!",
        });
      }
      //setLoadingEditmember(true);
      setloadingbutton(false);
    });
  };

  ////////////// Get Company Record by id ////////////////
  function getDatacompanyRecord() {
    let qString = "?company_id=";
    getCompanyRecord(qString, id).then((res) => {
      console.log(`getcompany-> id`, id);
      console.log(`getcompanyrecord`, res.data);

      if (res && res.status === 200) {
        setCompanyRecord(res.data);
      }

      setLoadingComrecord(false);
    });
  }

  //////////////// Edit Member ////////////////

  const changecompanyname = () => {
    setLoadingChange(false);
    values["company_id"] = id;
    values["company_name"] = newThaiName;
    values["company_name_eng"] = newEngName;
    values["company_name_eng_et"] = newShortName;
    values["last_changed_name_at"] = `${selectdate} + ${time}`;

    postChangecom(values).then((response) => {
      console.log("postChangecom: response", response);
      console.log("postChangecom: values", values);

      if (response && (response.status === 200 || response.status === 201)) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "เปลี่ยนชื่อเรียบร้อย!",
          showConfirmButton: false,
          timer: 2000,
        });
        getDatacompanyRecord();
        handleCloseeditcompany();
      } else {
        console.log(
          "API response error1 [" + response.status + "]",
          response.data.message
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถเปลี่ยนชื่อได้ !!",
        });
      }
      setLoadingChange(true);
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
      {/*  ////////////////////////// Breadcrumbs ////////////////////////// */}

      <Box style={{ display: "flex" }}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              to={`/member`}
              style={{ textDecoration: "none", color: "#9e9e9e" }}
            >
              <Typography
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "400",
                }}
              >
                สมาชิกในระบบ
              </Typography>
            </Link>

            <Typography
              style={{
                fontSize: "1.2rem",
                fontWeight: "400",
                color: "#212121",
              }}
            >
              Edit Member
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>

      {/*  ////////////////////////// Main Topic Pages ////////////////////////// */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            display: "flex",
            marginTop: "35px",
          }}
        >
          <ManageAccountsIcon
            fontSize="large"
            style={{
              alignItems: "center",
            }}
          />{" "}
          &nbsp;&nbsp;&nbsp;
          <Typography
            style={{
              fontWeight: "400",
              color: "#1565c0",
              fontSize: "1.9rem",
            }}
          >
            Edit Member
          </Typography>
        </Box>

        {/*  ////////////////////////// TabContext  ////////////////////////// */}

        <Box
          sx={{
            mt: 2,
            width: "65%",
            typography: "body1",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="ข้อมูลสมาชิก"
                  value="1"
                  style={{ fontSize: "15px" }}
                />
                <Tab
                  label="เปลี่ยนชื่อบริษัทประกัน"
                  value="2"
                  style={{ fontSize: "15px" }}
                  //onClick={getDatacompanyRecord}
                />
              </TabList>
            </Box>

            {/*  ///////////// Tab 1  ///////////// */}
            <TabPanel value="1">
              {loadingmember ? (
                <Box
                  sx={{
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <Skeleton variant="rounded" width={450} height={45} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 3,
                      width: 450,
                    }}
                  >
                    <Box>
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "16px" }}
                        width={150}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "12px" }}
                        width={200}
                      />
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <TextField
                        label="Insurance Thai Name"
                        variant="outlined"
                        size="middle"
                        fullWidth
                        value={thaiName == null ? "" : thaiName}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <TextField
                        label="Insurance English Name"
                        variant="outlined"
                        size="middle"
                        readOnly
                        fullWidth
                        value={engName == null ? "" : engName}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <TextField
                        label="Insurance Shorten Name "
                        variant="outlined"
                        size="middle"
                        fullWidth
                        readOnly
                        value={engEtName == null ? "" : engEtName}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <TextField
                        label="Insurance Code"
                        variant="outlined"
                        size="middle"
                        fullWidth
                        value={companyCode == null ? "" : companyCode}
                        InputProps={{
                          readOnly: true,
                        }}
                        // onChange={(e) => {
                        //   setCompanyCode(e.target.value);
                        // }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <TextField
                        label="Address1"
                        variant="outlined"
                        size="middle"
                        fullWidth
                        value={address1 == null ? "" : address1}
                        onChange={(e) => {
                          setAddress1(e.target.value);
                        }}
                      />
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <TextField
                        label="Email"
                        variant="outlined"
                        size="middle"
                        fullWidth
                        value={email == null ? "" : email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <TextField
                        label="Address2"
                        variant="outlined"
                        size="middle"
                        fullWidth
                        value={address2 == null ? "" : address2}
                        onChange={(e) => {
                          setAddress2(e.target.value);
                        }}
                      />
                    </Box>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <MaskedInput
                        guide={true}
                        mask={[
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          console.log(e.target.value);
                        }}
                        render={(ref, props) => (
                          <TextField
                            fullWidth
                            inputMode="numeric"
                            inputProps={{ inputMode: "numeric" }}
                            inputRef={ref}
                            label="Phone Number"
                            placeholder="0XX-XXX-XXXX"
                            variant="outlined"
                            {...props}
                          />
                        )}
                        showMask={false}
                        value={phone}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2, display: "flex" }}>
                    <Box sx={{ width: 450, mr: 4 }}>
                      <MaskedInput
                        guide={true}
                        mask={[
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          "-",
                          /\d/,
                          /\d/,
                          /\d/,
                          /\d/,
                        ]}
                        render={(ref, props) => (
                          <TextField
                            fullWidth
                            label="Fax No."
                            variant="outlined"
                            inputMode="numeric"
                            inputProps={{ inputMode: "numeric" }}
                            placeholder="XXX-XXX-XXXX"
                            inputRef={ref}
                            {...props}
                          />
                        )}
                        showMask={false}
                        value={fax == null ? "" : fax}
                        onChange={(e) => {
                          setFax(e.target.value);
                        }}
                      />
                      {/* <TextField
                        label="Fax No."
                        variant="outlined"
                        size="middle"
                        fullWidth
                        value={fax == null ? "" : fax}
                        onChange={(e) => {
                          setFax(e.target.value);
                        }}
                      /> */}
                    </Box>
                    <Box sx={{ width: 450 }}>
                      <TextField
                        label="Tax No."
                        variant="outlined"
                        size="middle"
                        type="number"
                        fullWidth
                        value={tax == null ? null : tax}
                        onChange={(e) => {
                          setTax(e.target.value);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      mt: 3,
                      width: 450,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography style={{ fontSize: "16px" }}>
                        Still be our member
                      </Typography>
                      <Typography
                        style={{ fontSize: "12px", color: "#9e9e9e" }}
                      >
                        Slide button to inactive member
                      </Typography>
                    </Box>
                    <Box>
                      <Switch
                        checked={checked}
                        onChange={handleChangeSwitch}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
            </TabPanel>

            {/*  ///////////// Tab 2  ///////////// */}
            <TabPanel value="2">
              <Box
                sx={{
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="contained"
                    size="middle"
                    style={{
                      backgroundColor: "#ff9800",
                      color: "#1a237e",
                    }}
                    onClick={() => {
                      handleOpeneditcompany();
                    }}
                  >
                    <Typography fontSize={14} fontWeight={400}>
                      เปลี่ยนชื่อบริษัทประกัน
                    </Typography>
                  </Button>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 500 }}
                      aria-label="custom pagination table"
                    >
                      <TableHead>
                        <TableRow>
                          {changecomp.map((column, index) => (
                            <TableCell
                              key={index}
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
                        {loadingcomrecord ? (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Box sx={{ width: "100%" }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={progress}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ) : companyrecord.length > 0 ? (
                          companyrecord.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell
                                style={{ width: 100, padding: "10px" }}
                                align="left"
                              >
                                <Typography
                                  style={{
                                    fontSize: "1.12rem",
                                    fontWeight: "400",
                                    marginLeft: "25px",
                                  }}
                                >
                                  {index + 1}
                                </Typography>
                              </TableCell>

                              <TableCell
                                style={{ width: 300, padding: "10px" }}
                                align="left"
                              >
                                <Typography
                                  style={{
                                    fontSize: "1.12rem",
                                    fontWeight: "400",
                                  }}
                                >
                                  {row.company_name}
                                </Typography>
                              </TableCell>
                              <TableCell
                                style={{ width: 200, padding: "10px" }}
                                align="left"
                              >
                                <Typography
                                  style={{
                                    fontSize: "1.12rem",
                                    fontWeight: "400",
                                  }}
                                >
                                  {row.last_changed_name_at}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3}>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                              </Box>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
          <Box
            sx={{
              mt: 4,
              ml: 3,
              width: 400,
            }}
          >
            {value == "1" ? (
              <Button
                variant="contained"
                size="middle"
                style={{ backgroundColor: "#32B917", marginRight: "15px" }}
                onClick={handleOpenModal}
              >
                <Typography fontSize={14}>Edit Member</Typography>
              </Button>
            ) : null}
            <Link
              underline="hover"
              to={`/member`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" size="middle" color="inherit">
                <Typography fontSize={14} style={{ color: "#212121" }}>
                  Cancel
                </Typography>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>

      {/*  ///////////// popup for edit company  ///////////// */}

      <Modal open={openeditcompany}>
        <Box sx={style2}>
          <Typography variant="h4" style={{ color: "#1565c0" }}>
            เปลี่ยนชื่อบริษัทประกัน
          </Typography>
          <Box>
            <Box sx={{ mt: 2, mb: 2, width: 540 }}>
              {!loadingchange ? (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
              ) : (
                ""
              )}
            </Box>
            <Box style={{ display: "flex" }}>
              <Box sx={{ mt: 2, mr: 3, width: 300 }}>
                <TextField
                  label="ชื่อบริษัทประกันใหม่ (ไทย)"
                  variant="outlined"
                  size="middle"
                  fullWidth
                  value={newThaiName}
                  error={errTname}
                  onChange={(e) => {
                    setNewThaiName(e.target.value);
                    if (e.target.value) {
                      setErrTextTname("");
                      setErrTname(false);
                    } else {
                      setErrTextTname("Thai Name is required");
                      setErrTname(true);
                    }
                  }}
                  helperText={
                    <Typography color="error">{errTextTname}</Typography>
                  }
                />
              </Box>
              <Box sx={{ mt: 2, width: 220 }}>
                <TextField
                  label="ชื่อบริษัทประกันใหม่ (อังกฤษ)"
                  variant="outlined"
                  size="middle"
                  fullWidth
                  value={newEngName}
                  error={errEname}
                  onChange={(e) => {
                    setNewEngName(e.target.value);
                    if (e.target.value) {
                      setErrTextEname("");
                      setErrEname(false);
                    } else {
                      setErrTextEname("English Name is required");
                      setErrEname(true);
                    }
                  }}
                  helperText={
                    <Typography color="error">{errTextEname}</Typography>
                  }
                />
              </Box>
            </Box>
            <Box style={{ display: "flex" }}>
              <Box sx={{ mt: 3, mr: 3, width: 300 }}>
                <TextField
                  label="ชื่อบริษัทประกันใหม่ (ชื่อย่อ)"
                  variant="outlined"
                  size="middle"
                  fullWidth
                  value={newShortName}
                  error={errEetname}
                  onChange={(e) => {
                    setNewShortName(e.target.value);
                    if (e.target.value) {
                      setErrTextEetname("");
                      setErrEetname(false);
                    } else {
                      setErrTextEetname("Shorten Name is required");
                      setErrEetname(true);
                    }
                  }}
                  helperText={
                    <Typography color="error">{errTextEetname}</Typography>
                  }
                />
              </Box>
              <Box sx={{ mt: 3, width: 220 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disableFuture
                    label="Select Month and Year"
                    inputFormat="YYYY-MM-DD"
                    value={selectdate}
                    onChange={handleChangedate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box sx={{ mt: 5, display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                size="middle"
                style={{
                  backgroundColor: "#ff9800",
                  marginRight: "10px",
                  padding: "10px",
                }}
                onClick={() => {
                  if (newThaiName.length === 0) {
                    setErrTname(true);
                    setErrTextTname("Thai Name is required");
                  }
                  if (newEngName.length === 0) {
                    setErrEname(true);
                    setErrTextEname("English Name is required");
                  }
                  if (newShortName.length === 0) {
                    setErrEetname(true);
                    setErrTextEetname("Shorten Name is required");
                  }

                  if (
                    newThaiName.length > 0 &&
                    newEngName.length > 0 &&
                    newShortName.length > 0
                  ) {
                    changecompanyname();
                  }
                }}
              >
                <Typography fontSize={12}>Save</Typography>
              </Button>
              <Button
                variant="contained"
                size="middle"
                color="inherit"
                onClick={handleCloseeditcompany}
              >
                <Typography fontSize={12}>Cancel</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal open={openModal}>
        <Box sx={styleModal}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h5" component="h2">
              Edit Member
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
            Do you want to confirm edit Member
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
              <span>Edit</span>
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
    </Box>
  );
}
