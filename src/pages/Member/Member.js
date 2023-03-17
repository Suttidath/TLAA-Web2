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
import { Typography, TextField, Button, MenuItem, Modal } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FiEdit } from "react-icons/fi";
import Switch from "@mui/material/Switch";
import { BsFillXCircleFill } from "react-icons/bs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoadingButton from "@mui/lab/LoadingButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LinearProgress from "@mui/material/LinearProgress";
import { Empty } from "antd";
import Swal from "sweetalert2";
import { getCompanyAll } from "../service";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const styleModaldelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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
    id: "ชื่อบริษัทประกัน",
    label: "ชื่อบริษัทประกัน",
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

const datachangecomp = [
  {
    id: "1",
    compname: "บริษัทประกัน A",
    datechange: "10-02-2022",
  },

  {
    id: "2",
    compname: "บริษัทประกัน B",
    datechange: "16-06-2022",
  },
  {
    id: "3",
    compname: "บริษัทประกัน C",
    datechange: "01-12-2022",
  },
];

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

const statuses = [
  {
    id: "2",
    value: "All",
    label: "-- All Status --",
  },
  {
    id: "0",
    value: "Active",
    label: "Active",
  },
  {
    id: "1",
    value: "Inactive",
    label: "Inactive",
  },
];

export default function Member() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [dataMember, setDataMember] = useState([]);
  const [loadingBT, setLoadingBT] = useState(false);

  const [membername, setMembername] = useState("");
  const [status, setStatus] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const [openedit, setOpenedit] = useState(false);
  const handleOpenedit = () => setOpenedit(true);
  const handleCloseedit = () => setOpenedit(false);

  const [openeditcompany, setOpeneditcompany] = useState(false);
  const handleOpeneditcompany = () => setOpeneditcompany(true);
  const handleCloseeditcompany = () => setOpeneditcompany(false);

  const [checked, setChecked] = useState(true);
  const [progress, setProgress] = useState(0);
  const [values, setValues] = useState({});

  const [memberValue, setMemberValue] = useState({});
  const [openModaldelete, setOpenModaldelete] = useState(false);
  const [loadingbuttondelete, setloadingbuttondelete] = useState(false);
  const handleOpenModaldelete = () => {
    setOpenModaldelete(true);
  };
  const handleCloseModaldelete = () => setOpenModaldelete(false);

  const handleClickModaldelete = () => {
    setloadingbuttondelete(true);
    //  deleteMonthlyData();
  };

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
    GetMember();
  }, []);

  //////////////// setting RowsPerPage ////////////////
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataMember.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //////////////// DropDown Box ////////////////

  const handleChangemembername = (e) => {
    setMembername(e.target.value);
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
  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const handleClickSearch = () => {
    setLoading(true);
    setLoadingBT(true);
    GetMember();
  };

  //////////////// Get User List ////////////////

  const GetMember = () => {
    let qString = "?";
    if (membername) qString = qString + "&name=" + membername;
    if (statusCode) qString = qString + "&status=" + statusCode;

    getCompanyAll(qString).then((res) => {
      console.log("Datamember", res.data);
      console.log(res.data.message);
      if (res && res.status === 200) {
        setDataMember(res.data);
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
          สมาชิกในระบบ
        </Typography>
        <Link
          to={`/member/addmember`}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Button
            variant="contained"
            size="middle"
            style={{ backgroundColor: "#32B917", height: "40px" }}
          >
            <Typography fontSize={12}>+Add Member</Typography>
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
        <Box sx={{ width: 500, mr: 2 }}>
          <TextField
            placeholder="ชื่อบริษัทประกัน"
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
            value={membername}
            onChange={handleChangemembername}
          />
        </Box>

        <Box sx={{ width: 200, mr: 2 }}>
          <TextField
            size="middle"
            variant="outlined"
            fullWidth
            select
            label="Status"
            value={status}
            onChange={handleChangeStatus}
          >
            {statuses.map((option, index) => (
              <MenuItem key={index} value={option.value}>
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
              {columns.map((column, index) => (
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
          <TableBody sx={{ width: "100%", height: "100%" }}>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box sx={{ width: "100%" }}>
                    <LinearProgress variant="determinate" value={progress} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : dataMember.length > 0 ? (
              (rowsPerPage > 0
                ? dataMember.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dataMember
              ).map((row, index) => (
                <TableRow key={index}>
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
                      {row.company_name}
                    </Typography>
                  </TableCell>

                  <TableCell
                    style={{ width: 200, padding: "10px" }}
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
                    style={{ width: 120, padding: "10px" }}
                    align="left"
                  >
                    <Typography
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: "450",
                      }}
                    >
                      <Link
                        to={`/member/editmember/${row.company_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <FiEdit
                          style={{ color: "#4fc3f7", cursor: "pointer" }}
                        />
                      </Link>
                      &nbsp;&nbsp;&nbsp;
                      <BsFillXCircleFill
                        style={{ color: "#f44336", cursor: "pointer" }}
                        onClick={() => {
                          setMemberValue(row);
                          console.log(row);
                          handleOpenModaldelete();
                        }}
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
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={dataMember.length}
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

      {/* /////////// Modal confirm Delete form /////////// */}

      <Modal open={openModaldelete}>
        <Box sx={styleModaldelete}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h5" component="h2">
              Delete Member
            </Typography>
            <IconButton size="large">
              <CloseIcon fontSize="inherit" onClick={handleCloseModaldelete} />
            </IconButton>
          </Box>
          <Typography sx={{ mt: 3 }} fontSize={16} fontWeight={300}>
            Do you want to confirm Delete ?
          </Typography>
          <Typography fontSize={14} fontWeight={400}>
            Company Name: {memberValue.company_name}
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
