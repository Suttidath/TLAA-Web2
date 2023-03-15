import React, { useState } from "react";
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
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FiEdit } from "react-icons/fi";
import { getUserAll } from "../service";
import LinearProgress from "@mui/material/LinearProgress";
import { Empty } from "antd";
import { set } from "date-fns";
import LoadingButton from "@mui/lab/LoadingButton";

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
  // {
  //   id: "ลำดับ",
  //   label: "ลำดับ",
  //   align: "center",
  // },
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
    id: "2",
    value: "All",
    label: "-- All Status --",
  },
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
    id: "2",
    value: "All",
    label: "-- All Role --",
  },
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = React.useState(0);
  const [loadingBT, setLoadingBT] = useState(false);

  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [role, setRole] = React.useState("");
  const [statusCode, setStatusCode] = React.useState("");
  const [roleCode, setRoleCode] = React.useState("");

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

  React.useEffect(() => {
    GetUser();
  }, []);

  //////////////// setting RowsPerPage ////////////////
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataUser.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
    if (e.target.value == "Active") {
      setStatusCode("1");
    } else if (e.target.value == "Inactive") {
      setStatusCode("0");
    } else if (e.target.value == "All") {
      setStatusCode("");
    }
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
    console.log(e.target.value);
    if (e.target.value == "Admin") {
      setRoleCode("1");
    } else if (e.target.value == "User") {
      setRoleCode("0");
    } else if (e.target.value == "All") {
      setRoleCode("");
    }
  };

  const handleClickSearch = () => {
    setLoading(true);
    setLoadingBT(true);
    GetUser();
  };

  //////////////// Get User List ////////////////

  const GetUser = () => {
    let qString = "?";
    if (name) qString = qString + "&name=" + name;
    if (statusCode) qString = qString + "&status=" + statusCode;
    if (roleCode) qString = qString + "&role=" + roleCode;

    getUserAll(qString).then((res) => {
      console.log("Datauser", res.data);
      console.log("name", name);
      console.log("roleCode", roleCode);
      console.log("statusCode", statusCode);

      if (res && res.status === 200) {
        setDataUser(res.data);
      }
      setLoading(false);
      setLoadingBT(false);
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

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          style={{
            fontWeight: "400",
            color: "#1565c0",
            fontSize: "1.9rem",
          }}
        >
          จัดการผู้ใช้งานระบบ
        </Typography>
        <Link
          to={`/user/adduser`}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Button
            variant="contained"
            size="middle"
            style={{ backgroundColor: "#32B917", height: "40px" }}
          >
            <Typography fontSize={12}>+Add User</Typography>
          </Button>
        </Link>
      </Box>

      {/*  ////////////////////////// Search Box ////////////////////////// */}

      <Box
        sx={{
          display: "flex",
          paddingBottom: "20px",
          margin: "35px 0px 0px 0px",
        }}
      >
        <Box sx={{ width: 500, display: "flex", mr: 2 }}>
          <TextField
            placeholder="ชื่อผู้ใช้งานระบบ"
            //size="middle"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(e.target.value);
            }}
          />
        </Box>
        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="middle"
            fullWidth
            select
            label="Role"
            value={role}
            onChange={handleChangeRole}
          >
            {Roles.map((option) => (
              <MenuItem
                key={option.id}
                value={option.value}
                sx={{ height: "30px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="middle"
            fullWidth
            select
            label="Status"
            value={status}
            onChange={handleChangeStatus}
          >
            {statuses.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <LoadingButton
          onClick={handleClickSearch}
          loading={loadingBT}
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
                <TableCell colSpan={5}>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : dataUser.length > 0 ? (
              (rowsPerPage > 0
                ? dataUser.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dataUser
              ).map((row, index) => (
                <TableRow key={row.id}>
                  {/* <TableCell
                    style={{ width: 80, padding: "10px" }}
                    align="center"
                  >
                    <Typography
                      style={{ fontSize: "1.12rem", fontWeight: "400" }}
                    >
                      {index + 1}
                    </Typography>
                  </TableCell> */}
                  <TableCell
                    style={{ width: 500, padding: "10px" }}
                    align="left"
                  >
                    <Typography
                      style={{ fontSize: "1.12rem", fontWeight: "400" }}
                    >
                      {row.first_name} &nbsp; {row.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={{ width: 150, padding: "10px" }}
                    align="left"
                  >
                    <Typography
                      style={{ fontSize: "1.12rem", fontWeight: "400" }}
                    >
                      {row.companyshorten}
                    </Typography>
                  </TableCell>
                  <TableCell
                    style={{ width: 150, padding: "10px" }}
                    align="left"
                  >
                    {row.isAdmin == "1" ? (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                        }}
                      >
                        Admin
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                        }}
                      >
                        User
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell
                    style={{ width: 150, padding: "10px" }}
                    align="left"
                  >
                    {row.isActive == "1" ? (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                          color: "#43a047",
                        }}
                      >
                        Active
                      </Typography>
                    ) : (
                      <Typography
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: "450",
                          color: "#f44336",
                        }}
                      >
                        Inactive
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    style={{ width: 150, padding: "10px" }}
                    align="left"
                  >
                    <Link
                      to={`/user/edituser/${row.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: "450",
                        }}
                      >
                        <FiEdit
                          style={{ color: "#4fc3f7", cursor: "pointer" }}
                        />
                      </Typography>
                    </Link>
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
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={dataUser.length}
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
    </Box>
  );
}
