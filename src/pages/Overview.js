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
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { FiEdit } from "react-icons/fi";
import { BsFillXCircleFill } from "react-icons/bs";

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
        // "& .MuiTablePagination-selectLabel": {
        //   fontSize: "1.15 rem",
        // },
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

export default function Overview() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [companyname, setCompanyname] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [form, setForm] = React.useState("");
  const [status, setStatus] = React.useState("");

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
      </Box>
    </Box>
  );
}
