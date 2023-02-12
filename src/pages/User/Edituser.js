import React, { useState, useRef } from "react";
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
import { getUser, postEdituser, getCompanyShort } from "../service";
import LinearProgress from "@mui/material/LinearProgress";
import { Empty } from "antd";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

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

function createData(name, calories, fat, form, status, company, role) {
  return { name, calories, fat, form, status, company, role };
}

const columns = [
  {
    id: "ชื่อผู้ใช้งานระบบ",
    label: "ชื่อผู้ใช้งานระบบ",
    align: "left",
  },
  {
    id: "บริษัท",
    label: "บริษัท",
    align: "left",
  },
  {
    id: "Role",
    label: "Role",
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

const statuses = [
  {
    id: "1",
    value: "Active",
    label: "Active",
  },
  {
    id: "0",
    value: "Inactive",
    label: "Inactive",
  },
];

const Roles = [
  {
    id: "1",
    value: "Admin",
    label: "Admin",
  },
  {
    id: "0",
    value: "User",
    label: "User",
  },
];

export default function User() {
  const [data, setData] = useState([]);
  const [loadingdata, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(true);

  // const [status, setStatus] = React.useState("");
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [companyID, setCompanyID] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [datacompany, setDataCompany] = React.useState([]);

  const [checked, setChecked] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [values, setValues] = useState({});

  const { id } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [loadingbutton, setloadingbutton] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickModal = () => {
    setloadingbutton(true);
    Edituser();
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

  ////////// for get DataUser //////////
  React.useEffect(() => {
    getCompany();
    getDatauser();
  }, []);

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  //////////////// Text field for hidden password ////////////////
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //////////////// Get User by id ////////////////
  function getDatauser() {
    getUser(id).then((res) => {
      // console.log(`getUser-> id`, id);
      // console.log(`getUser`, res);

      if (res && res.status === 200) {
        setData(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setEmail(res.data.email);
        setPosition(res.data.position);
        setPhone(res.data.phone);
        setPosition(res.data.position);
        setCompany(res.data.companyshorten);
        if (res.data.isAdmin == "1") {
          setRole("Admin");
        } else {
          setRole("User");
        }

        if (res.data.isActive == "1") {
          setChecked(true);
        } else {
          setChecked(false);
        }
        console.log(`getUser`, res.data);
      }
      setLoadingData(false);
    });
  }

  //////////////// Get Company shoten ////////////////
  const getCompany = () => {
    let qString = "?";
    getCompanyShort(qString).then((res) => {
      console.log("Company", res.data);
      if (res && res.status === 200) {
        setDataCompany(res.data);
      }
    });
  };

  //////////////// Edit User ////////////////

  const Edituser = () => {
    //setLoading(false);
    values["id"] = id;
    values["phone"] = phone;
    values["position"] = position;
    values["email"] = email;
    values["company"] = company;
    values["first_name"] = firstName;
    values["last_name"] = lastName;
    values["password"] = password;
    if (role == "Admin") {
      values["isAdmin"] = "1";
    } else if (role == "User") {
      values["isAdmin"] = "0";
    }

    if (checked == true) {
      values["isActive"] = "1";
    } else if (checked == false) {
      values["isActive"] = "0";
    }

    // values["phone"] = "080";
    // values["position"] = "Engineer";
    // values["company_id"] = "3";
    // values["isAdmin"] = "0";
    // values["isActive"] = "0";
    // values["isOwner"] = "1";
    //let qString = "?phone=55555555";
    // if (phone) qString = qString + "phone=" + "55555555";

    postEdituser(values, id).then((response) => {
      console.log("postAdduser: response", response);
      console.log("postid: id", id);
      console.log("postid: values", values);

      if (response && (response.status === 200 || response.status === 201)) {
        handleCloseModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update User เรียบร้อย!",
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.pathname = "/user";
      } else {
        console.log(
          "API response error1 [" + response.status + "]",
          response.data.message
        );
        handleCloseModal();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Update User ได้ !!",
        });
      }
      //setLoading(true);
      setloadingbutton(false);
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
      <Box style={{ display: "flex" }}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              to={`/user`}
              style={{ textDecoration: "none", color: "#9e9e9e" }}
            >
              <Typography
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "400",
                }}
              >
                จัดการผู้ใช้งานระบบ
              </Typography>
            </Link>

            <Typography
              style={{
                fontSize: "1.2rem",
                fontWeight: "400",
                color: "#212121",
              }}
            >
              Edit User
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>

      {/*  ////////////////////////// Main Topic Pages ////////////////////////// */}
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
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
            Edit User
          </Typography>
        </Box>
        {loadingdata ? (
          <Box>
            <Box>
              <Box>
                <Box sx={{ mt: 3, display: "flex" }}>
                  <Box sx={{ mr: 4 }}>
                    <Skeleton variant="rounded" width={400} height={45} />
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={400} height={45} />
                  </Box>
                </Box>
                <Box sx={{ mt: 3, display: "flex" }}>
                  <Box sx={{ mr: 4 }}>
                    <Skeleton variant="rounded" width={400} height={45} />
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={400} height={45} />
                  </Box>
                </Box>

                <Box sx={{ mt: 3, display: "flex" }}>
                  <Box sx={{ mr: 4 }}>
                    <Skeleton variant="rounded" width={400} height={45} />
                  </Box>
                  <Box>
                    <Skeleton variant="rounded" width={400} height={45} />
                  </Box>
                </Box>

                <Box sx={{ mt: 3, display: "flex" }}>
                  <Box sx={{ mr: 4 }}>
                    <Skeleton variant="rounded" width={400} height={45} />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  width: 400,
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
          </Box>
        ) : (
          <Box>
            <Box>
              <Box sx={{ mt: 3, display: "flex" }}>
                <Box sx={{ width: 400, mr: 4 }}>
                  <TextField
                    label="FirstName"
                    variant="outlined"
                    size="middle"
                    fullWidth
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </Box>
                <Box sx={{ width: 400 }}>
                  <TextField
                    label="LastName"
                    variant="outlined"
                    size="middle"
                    fullWidth
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 3, display: "flex" }}>
                <Box sx={{ width: 400, mr: 4 }}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="middle"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Box>
                <Box sx={{ width: 400 }}>
                  <TextField
                    label="ตำแหน่งงาน"
                    variant="outlined"
                    size="middle"
                    fullWidth
                    value={position}
                    onChange={(e) => {
                      setPosition(e.target.value);
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: "flex" }}>
                <Box sx={{ width: 400, mr: 4 }}>
                  <TextField
                    label="Phone No."
                    variant="outlined"
                    size="middle"
                    fullWidth
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </Box>
                <Box sx={{ width: 400 }}>
                  <TextField
                    label="Company Member"
                    variant="outlined"
                    size="middle"
                    fullWidth
                    select
                    value={company}
                    onChange={(event) => {
                      setCompany(event.target.value);
                      setCompanyID(event.target.id);
                      // console.log(company);
                      // console.log(companyID);
                      console.log("value", event.target.value);
                      //console.log("id", event.target.id);
                    }}
                  >
                    {datacompany.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={option.companyabb}
                        //id={option.company_id}
                      >
                        {option.companyabb}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: "flex" }}>
                <Box sx={{ width: 400, mr: 4 }}>
                  <TextField
                    size="middle"
                    fullWidth
                    select
                    label="Role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    {Roles.map((option) => (
                      <MenuItem key={option.id} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ width: 400 }}></Box>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                width: 400,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography style={{ fontSize: "16px" }}>
                  Still be our user
                </Typography>
                <Typography style={{ fontSize: "12px", color: "#9e9e9e" }}>
                  Slide button to inactive user
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
      </Box>
      <Box
        sx={{
          mt: 7,
          width: 400,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button
            variant="contained"
            size="middle"
            style={{ backgroundColor: "#32B917", marginRight: "15px" }}
            onClick={handleOpenModal}
          >
            <Typography fontSize={14}>Edit User</Typography>
          </Button>
          <Link
            underline="hover"
            to={`/user`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" size="middle" color="inherit">
              <Typography fontSize={14} style={{ color: "#212121" }}>
                Cancel
              </Typography>
            </Button>
          </Link>
        </Box>
        <Box>
          {!loading ? (
            <Box sx={{ width: "100%" }}>
              <CircularProgress disableShrink />
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>

      <Modal open={openModal}>
        <Box sx={styleModal}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h5" component="h2">
              Edit User
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
            Do you want to confirm edit User
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
              <span>Update</span>
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
