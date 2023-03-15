import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Typography, TextField, Button, MenuItem, Modal } from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import excel from "../../img/excel.png";
// import pdf from "../../img/PDF_file_icon.svg.webp";
import word from "../../img/word.png";
import {
  getReport,
  exportWordReport,
  exportT1Report,
  exportT2Report,
  exportT3Report,
  exportT4Report,
  exportT5Report,
  exportT6Report,
  exportT7Report,
  exportT8Report,
  exportT9Report,
  exportT10Report,
  exportT11Report,
  exportT12Report,
  exportT13Report,
  exportT14Report,
  exportT15Report,
  exportT16Report,
} from "../service";
import moment from "moment/moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import { Empty } from "antd";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: 2,
  border: "1px solid #ffff",
  boxShadow: 24,
  p: 3,
};

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

export default function Issuereport() {
  const [reportname, setReportname] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [loadingSh, setLoadingSh] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [DataReport, setDataReport] = React.useState([]);
  const [selectReport, setSelectReport] = React.useState({});
  const [monthName, setMonthName] = React.useState("");
  const [selectmonth, setSelectmonth] = React.useState(
    moment().format("YYYY-MM")
  );
  const [selectmonthtext, setSelectmonthtext] = React.useState(
    moment().format("MMM")
  );
  const [selectmonthtextfull, setSelectmonthtextfull] = React.useState(
    moment().format("MMMM")
  );

  const [report, setReport] = useState("");

  let monthtrim = selectmonth.substring(5, 7);
  let yeartrim = selectmonth.substring(0, 4);
  let monthtext = selectmonthtext.toUpperCase();

  //console.log("month", monthtext);
  // console.log("year", yeartrim);

  const [openModal, setOpenModal] = useState(false);
  const [loadingbutton, setloadingbutton] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickModal = () => {
    setloadingbutton(true);
    if (selectReport.report_id == "1") {
      onClickExportWord();
    } else if (selectReport.report_id == "2") {
      onClickExportT1();
    } else if (selectReport.report_id == "3") {
      onClickExportT2();
    } else if (selectReport.report_id == "4") {
      onClickExportT3();
    } else if (selectReport.report_id == "5") {
      onClickExportT4();
    } else if (selectReport.report_id == "6") {
      onClickExportT5();
    } else if (selectReport.report_id == "7") {
      onClickExportT6();
    } else if (selectReport.report_id == "8") {
      onClickExportT7();
    } else if (selectReport.report_id == "9") {
      onClickExportT8();
    } else if (selectReport.report_id == "10") {
      onClickExportT9();
    } else if (selectReport.report_id == "11") {
      onClickExportT10();
    } else if (selectReport.report_id == "12") {
      onClickExportT11();
    } else if (selectReport.report_id == "13") {
      onClickExportT12();
    } else if (selectReport.report_id == "14") {
      onClickExportT13();
    } else if (selectReport.report_id == "15") {
      onClickExportT14();
    } else if (selectReport.report_id == "16") {
      onClickExportT15();
    } else if (selectReport.report_id == "17") {
      onClickExportT16();
    }

    //onClickExportT1();
  };

  React.useEffect(() => {
    GetDataReport();
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

  const handleClickSearch = () => {
    setLoading(true);
    setLoadingSh(true);
    GetSearchReport();
  };

  //////////////// Search Box ////////////////

  const handleChange = (newValue) => {
    setSelectmonth(newValue.format("YYYY-MM"));
    setSelectmonthtext(newValue.format("MMM"));
    setSelectmonthtextfull(newValue.format("MMMM"));

    console.log(newValue.format("YYYY-MM"));
    console.log(newValue.format("MMM"));
  };

  //////////////// Get Report List ////////////////

  const GetDataReport = () => {
    let qString = "?year=" + yeartrim + "&month=" + monthtrim;

    getReport(qString).then((res) => {
      console.log("DataReport", res.data);
      if (res && res.status === 200) {
        setDataReport(res.data);
      }
      setLoading(false);
    });
  };

  //////////////// Search Report ////////////////

  const GetSearchReport = () => {
    let qString = "?";
    if (reportname) qString = qString + "&report_name=" + reportname;
    if (yeartrim) qString = qString + "&year=" + yeartrim;
    if (monthtrim) qString = qString + "&month=" + monthtrim;

    getReport(qString).then((res) => {
      console.log("DataReport", res.data);
      if (res && res.status === 200) {
        setDataReport(res.data);
      }
      setLoading(false);
      setLoadingSh(false);
    });
  };

  const onClickExportWord = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    console.log(`onClickExport`, qString);

    exportWordReport(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `New_Business_Monthly_Report_on ${selectmonthtextfull} ${yeartrim}.docx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `New_Business_Monthly_Report_on ${selectmonthtextfull} ${yeartrim}.docx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download New Business Monthly Report เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download New Business Monthly Repor ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT1 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT1Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T1.Premium ${selectmonthtextfull} ${yeartrim}(MTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T1.Premium ${selectmonthtextfull} ${yeartrim}(MTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T1 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        // setErrormsg("The request is taking too long. Please try again");
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T1 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT2 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT2Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T2.Premium ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;

        link.download = `T2.Premium ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T2 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T2 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT3 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT3Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T3.Ordinary,Industrial Group,Group & PA Premium ${selectmonthtextfull} ${
              yeartrim - 1
            }-${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T3.Ordinary,Industrial Group,Group & PA Premium ${selectmonthtextfull} ${
          yeartrim - 1
        }-${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T3 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T3 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT4 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT4Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T4.Ordinary Premium ${selectmonthtextfull} ${
              yeartrim - 1
            }-${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T4.Ordinary Premium ${selectmonthtextfull} ${
          yeartrim - 1
        }-${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T4 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T4 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT5 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT5Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T5.Industrial Premium ${selectmonthtextfull} ${
              yeartrim - 1
            }-${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T5.Industrial Premium ${selectmonthtextfull} ${
          yeartrim - 1
        }-${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T5 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T5 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT6 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT6Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T6.Group Premium ${selectmonthtextfull} ${
              yeartrim - 1
            }-${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T6.Group Premium ${selectmonthtextfull} ${
          yeartrim - 1
        }-${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T6 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T6 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT7 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT7Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T7.Group Premium ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T7.Group Premium ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T7 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T7 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT8 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT8Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T8.PA Premium ${selectmonthtextfull} ${
              yeartrim - 1
            }-${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T8.PA Premium ${selectmonthtextfull} ${
          yeartrim - 1
        }-${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T8 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T8 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT9 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT9Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T9.PA Premium ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T9.PA Premium ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T9 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T9 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT10 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT10Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T10.Policy,Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(MTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T10.Policy,Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(MTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T10 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T10 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT11 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT11Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T11.Policy,Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T11.Policy,Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T11 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T11 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT12 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT12Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T12.Ordinary Policy & Sum Insured ${selectmonthtextfull} ${
              yeartrim - 1
            }-${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T12.Ordinary Policy & Sum Insured ${selectmonthtextfull} ${
          yeartrim - 1
        }-${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T12 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T12 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT13 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT13Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T13. Industrail Policy & Sum Insured ${selectmonthtextfull} ${
              yeartrim - 1
            }-${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T13. Industrail Policy & Sum Insured ${selectmonthtextfull} ${
          yeartrim - 1
        }-${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T13 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T13 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT14 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT14Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T14.Group Policy, Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T14.Group Policy, Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T14 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T14 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT15 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT15Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE,
            `T15.PA Policy, Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `T15.PA Policy, Members & Sum Insured ${selectmonthtextfull} ${yeartrim}(YTD).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T15 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T15 ได้ !!",
        });
        handleCloseModal();
      }
      setloadingbutton(false);
    });
  };

  const onClickExportT16 = () => {
    let qString =
      "?report_id=" +
      selectReport.report_id +
      "&year=" +
      yeartrim +
      "&month=" +
      monthtrim;
    //let qString = "?report_id=2&year=2565&month=2";
    console.log(`onClickExport`, qString);

    exportT16Report(qString).then((res) => {
      if (res && res.status === 200) {
        var newBlob = new Blob([res.data]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          var newBlobIE = new Blob([res.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          return navigator.msSaveOrOpenBlob(
            newBlobIE`Premium ${monthtext} ${yeartrim}(Ranking).xlsx`
          );
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = `Premium ${monthtext} ${yeartrim}(Ranking).xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Download Report T16 เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      } else {
        console.log(`err: The request is taking too long. Please try again`);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Download Report T16 ได้ !!",
        });
        handleCloseModal();
      }
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
        {/* <FileUploadOutlinedIcon style={{ fontSize: "2.2rem" }} /> &nbsp;&nbsp;
        <Typography
          style={{
            color: "#1565c0",
            fontWeight: "400",
            fontSize: "1.4rem",
          }}
        >
          Export All Reports
        </Typography> */}
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
              value={selectmonth}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
                      onClick={() => {
                        setSelectReport(row);
                        handleOpenModal();
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
                          alt="wordLogo"
                          src={word}
                          style={{
                            display: "flex",
                            width: "24px",
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

      <Modal open={openModal}>
        <Box sx={styleModal}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              marginTop={1}
              component="h2"
              fontSize={22}
              fontWeight={700}
            >
              Confirm IssueReport
            </Typography>
            <IconButton size="large">
              <CloseIcon fontSize="inherit" onClick={handleCloseModal} />
            </IconButton>
          </Box>
          <Typography sx={{ mt: 2 }} fontSize={15} fontWeight={500}>
            Do you want to IssueReport ?
            <br />
            Report Name :
            <Typography display="inline" color="primary" fontSize={15}>
              {selectReport.report_name}
            </Typography>
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "50px",
            }}
          >
            <LoadingButton
              color="primary"
              onClick={handleClickModal}
              loading={loadingbutton}
              loadingPosition="start"
              startIcon={<FileDownloadOutlinedIcon />}
              variant="contained"
              size="large"
            >
              <span>Issue</span>
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
