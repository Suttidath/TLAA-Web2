import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, TextField, MenuItem } from "@mui/material";
import ContentEditable from "react-contenteditable";
import { getEditform, postEditform } from "../service";
import Swal from "sweetalert2";
import { InputNumber, Select, Button } from "antd";
import ButtonMui from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import "./edit.css";

const FormA_One = [
  {
    id: "ชื่อบริษัท",
    label: "ชื่อบริษัท",
    align: "center",
    width: "30rem",
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

export default function MonthlyEdit() {
  const [loadingdata, setLoadingdata] = useState(true);
  const [loadingbutton, setloadingbutton] = useState(false);
  const [status, setStatus] = useState(true);
  const [dataform, setDataform] = useState([{}]);
  const [formvalue, setFormvalue] = useState([]);
  const [values, setValues] = useState({});

  ////////// Modal //////////
  const [open, setOpen] = useState(false);
  //const [confirmLoading, setConfirmLoading] = useState(false);
  //const [modalText, setModalText] = useState("Content of the modal");

  const [company, setCompany] = useState("0");
  const [template, setTemplate] = useState("0");
  const [memberNo, setMemberNo] = useState("0");
  const [yearly, setYearly] = useState("0");
  const [monthy, setMonthy] = useState("0");
  const [dataType, setDataType] = useState("0");
  const [order, setOrder] = useState("0");

  //////////////// Variable of Form A,B ////////////////
  const [ord1, setOrd1] = useState(0);
  const [ord2, setOrd2] = useState(0);
  const [ord3, setOrd3] = useState(0);
  //const sumOrd = parseFloat(ord1) + parseFloat(ord2) + parseFloat(ord3);
  const sumOrd = ord1 + ord2 + ord3;

  const [ind1, setInd1] = useState(0);
  const [ind2, setInd2] = useState(0);
  const [ind3, setInd3] = useState(0);
  const sumInd = ind1 + ind2 + ind3;

  const [term1, setTerm1] = useState(0);
  const [term2, setTerm2] = useState(0);
  const [term3, setTerm3] = useState(0);
  const sumTerm = term1 + term2 + term3;

  const [endo1, setEndo1] = useState(0);
  const [endo2, setEndo2] = useState(0);
  const [endo3, setEndo3] = useState(0);
  const sumEndo = endo1 + endo2 + endo3;

  const [mor1, setMor1] = useState(0);
  const [mor2, setMor2] = useState(0);
  const [mor3, setMor3] = useState(0);
  const sumMor = mor1 + mor2 + mor3;

  const [oth1, setOth1] = useState(0);
  const [oth2, setOth2] = useState(0);
  const [oth3, setOth3] = useState(0);
  const sumOth = oth1 + oth2 + oth3;

  const [PAind1, setPAind1] = useState(0);
  const [PAind2, setPAind2] = useState(0);
  const [PAind3, setPAind3] = useState(0);
  const sumPAind = PAind1 + PAind2 + PAind3;

  const [PAgro1, setPAgro1] = useState(0);
  const [PAgro2, setPAgro2] = useState(0);
  const [PAgro3, setPAgro3] = useState(0);
  const sumPAgro = PAgro1 + PAgro2 + PAgro3;

  const [PAstu1, setPAstu1] = useState(0);
  const [PAstu2, setPAstu2] = useState(0);
  const [PAstu3, setPAstu3] = useState(0);
  const sumPAstu = PAstu1 + PAstu2 + PAstu3;

  const summary1 =
    ord1 + ind1 + term1 + endo1 + mor1 + oth1 + PAind1 + PAgro1 + PAstu1;
  const summary2 =
    ord2 + ind2 + term2 + endo2 + mor2 + oth2 + PAind2 + PAgro2 + PAstu2;
  const summary3 =
    ord3 + ind3 + term3 + endo3 + mor3 + oth3 + PAind3 + PAgro3 + PAstu3;
  const summary4 =
    sumOrd +
    sumInd +
    sumTerm +
    sumEndo +
    sumMor +
    sumOth +
    sumPAind +
    sumPAgro +
    sumPAstu;

  const { id } = useParams();

  let temptrim = template.substring(7, 16);
  //const demo = (7285141.123456).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  //const ord1_new = ord1.toLocaleString

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    setloadingbutton(true);
    Editdataform();
  }

  ////////// for get DataUser //////////
  React.useEffect(() => {
    getdataform();
  }, []);

  //const number = 10002320;

  //const numbernew = new Intl.NumberFormat().format(number);
  // const numbernew = parseFloat(number);
  // const numbernewformate = new Intl.NumberFormat().format(ord1);
  ////////////// Get form by id ////////////////

  function getdataform() {
    getEditform(id).then((res) => {
      console.log(`getDataform`, res.data);

      if (res && res.status === 200) {
        setDataform(res.data[0]);
        setCompany(res.data[0].company_name);
        setTemplate(res.data[0].template);
        setMemberNo(res.data[0].company_code);
        setYearly(res.data[0].tag_money_year);
        setMonthy(res.data[0].tag_money_month);
        setDataType(res.data[0].data_type);
        setOrder(res.data[0].item_qty);

        res.data[0].value_moneys.map((row, index) => {
          if (row.ord1) {
            //console.log(`มีค่า ord1`);
            //setOrd1(row.ord1.toString());
            //setOrd1(new Intl.NumberFormat().format(row.ord1));
            //setOrd1(row.ord1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
            setOrd1(row.ord1);
          } else if (row.ord2) {
            setOrd2(row.ord2);
          } else if (row.ord3) {
            setOrd3(row.ord3);
          } else if (row.ind1) {
            setInd1(row.ind1);
          } else if (row.ind2) {
            setInd2(row.ind2);
          } else if (row.ind3) {
            setInd3(row.ind3);
          } else if (row.term1) {
            setTerm1(row.term1);
          } else if (row.term2) {
            setTerm2(row.term2);
          } else if (row.term3) {
            setTerm3(row.term3);
          } else if (row.endo1) {
            setEndo1(row.endo1);
          } else if (row.endo2) {
            setEndo2(row.endo2);
          } else if (row.endo3) {
            setEndo3(row.endo3);
          } else if (row.mor1) {
            setMor1(row.mor1);
          } else if (row.mor2) {
            setMor2(row.mor2);
          } else if (row.mor3) {
            setMor3(row.mor3);
          } else if (row.oth1) {
            setOth1(row.oth1);
          } else if (row.oth2) {
            setOth2(row.oth2);
          } else if (row.oth3) {
            setOth3(row.oth3);
          } else if (row.PAind1) {
            setPAind1(row.PAind1);
          } else if (row.PAind2) {
            setPAind2(row.PAind2);
          } else if (row.PAind3) {
            setPAind3(row.PAind3);
          } else if (row.PAgro1) {
            setPAgro1(row.PAgro1);
          } else if (row.PAgro2) {
            setPAgro2(row.PAgro2);
          } else if (row.PAgro3) {
            setPAgro3(row.PAgro3);
          } else if (row.PAstu1) {
            setPAstu1(row.PAstu1);
          } else if (row.PAstu2) {
            setPAstu2(row.PAstu2);
          } else if (row.PAstu3) {
            setPAstu3(row.PAstu3);
          }
        });
      }

      setLoadingdata(false);
    });
  }

  //////////////// Edit form ////////////////

  const Editdataform = () => {
    //setloadingbutton(true);
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

    postEditform(values, id).then((response) => {
      console.log("postEdit: id", id);
      console.log("postEdit: values", values);

      if (response && (response.status === 200 || response.status === 201)) {
        setOpen(false);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Update data form เรียบร้อย!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.pathname = "/monthly";
      } else {
        console.log(
          "API response error1 [" + response.status + "]",
          response.data.message
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถ Update data form ได้ !!",
        });
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
      <Box style={{ display: "flex" }}>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              to={`/monthly`}
              style={{ textDecoration: "none", color: "#9e9e9e" }}
            >
              <Typography
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "400",
                }}
              >
                ตรวจสอบข้อมูลรายเดือน
              </Typography>
            </Link>

            <Typography
              style={{
                fontSize: "1.3rem",
                fontWeight: "400",
                color: "#212121",
              }}
            >
              Edit Data
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>

      {/*  ////////////////////////// Main Topic Pages ////////////////////////// */}

      <Box
        style={{
          display: "flex",
          marginTop: "35px",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{
            fontWeight: "400",
            color: "#1565c0",
            fontSize: "2rem",
          }}
        >
          Edit Data
        </Typography>

        <Box sx={{ mt: 1 }}>
          {loadingdata ? (
            <Box>
              <Stack spacing={0.3}>
                <Skeleton variant="rounded" height={50} />
                <Skeleton variant="rounded" height={40} />
              </Stack>
            </Box>
          ) : (
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                  <TableHead
                    sx={{
                      "& .MuiTableCell-root": {
                        padding: "12px",
                        fontSize: "1.3rem",
                        backgroundColor: "#e0e0e0",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell
                        style={{
                          width: "30rem",
                        }}
                        align="center"
                      >
                        ชื่อบริษัท
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        Template
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        รหัสสมาชิก
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        ค.ศ.
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        ประจำเดือน
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        ประเภทข้อมูล
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        จำนวนรายการ
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody
                    sx={{
                      "& .MuiTableCell-root": {
                        padding: "0px",
                        fontSize: "1.1rem",
                      },
                    }}
                  >
                    <TableRow>
                      <TableCell
                        style={{ width: "30rem", padding: "10px" }}
                        align="left"
                      >
                        {company}
                      </TableCell>
                      <TableCell
                        style={{ width: "10rem", padding: "10px" }}
                        align="center"
                      >
                        {temptrim}
                      </TableCell>
                      <TableCell
                        style={{ width: "10rem", padding: "10px" }}
                        align="center"
                      >
                        {memberNo}
                      </TableCell>
                      <TableCell
                        style={{ width: "10rem", padding: "10px" }}
                        align="center"
                      >
                        {yearly}
                      </TableCell>
                      <TableCell
                        style={{ width: "10rem", padding: "10px" }}
                        align="center"
                      >
                        {monthy}
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        {!status ? (
                          <Select
                            style={{
                              width: "95%",
                              backgroundColor: "pink",
                              borderRadius: "8px",
                            }}
                            defaultValue={dataType}
                            bordered={false}
                            disabled={status}
                            options={[
                              { value: "E", label: "E" },
                              { value: "F", label: "F" },
                              { value: "R", label: "R" },
                            ]}
                            onChange={(value) => {
                              setDataType(value);
                              console.log(value);
                            }}
                          />
                        ) : (
                          <Select
                            style={{
                              width: "95%",
                              borderRadius: "8px",
                            }}
                            defaultValue={dataType}
                            bordered={false}
                            disabled={status}
                            options={[
                              { value: "E", label: "E" },
                              { value: "F", label: "F" },
                              { value: "R", label: "R" },
                            ]}
                            onChange={(value) => {
                              setDataType(value);
                              console.log(value);
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell style={{ width: "10rem" }} align="center">
                        <InputNumber
                          id="input"
                          style={{
                            width: "95%",
                          }}
                          min={0}
                          defaultValue={order}
                          value={order}
                          bordered={false}
                          disabled={status}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          onChange={(value) => {
                            setOrder(value);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>

        <Box style={{ display: "flex" }}>
          <Box sx={{ mt: 2, width: "100%" }}>
            {loadingdata ? (
              <Box
                style={{
                  width: "100%",
                  marginTop: 9,
                }}
              >
                <Box
                  style={{
                    marginBottom: 9,
                  }}
                >
                  <Skeleton variant="rounded" height={25} />{" "}
                </Box>
                <Stack spacing={0.3}>
                  <Skeleton variant="rounded" height={60} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                  <Skeleton variant="rounded" height={40} />
                </Stack>
              </Box>
            ) : (
              <div>
                {temptrim == "tplPC1T2A" ? (
                  <div>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                      }}
                    >
                      <Typography color="primary" variant="h6">
                        1. การรับประกันภัยรายใหม่
                      </Typography>
                      <Typography color="error" variant="h6">
                        หน่วย : พันบาท
                      </Typography>
                    </Box>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead
                          sx={{
                            "& .MuiTableCell-root": {
                              padding: "12px",
                              fontSize: "1.3rem",
                              backgroundColor: "#e0e0e0",
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell align="center" sx={{ width: "50rem" }}>
                              ประเภท
                            </TableCell>
                            <TableCell align="center" sx={{ width: "20rem" }}>
                              จำนวนกรมธรรม์
                            </TableCell>

                            <TableCell align="center" sx={{ width: "20rem" }}>
                              จำนวนคน
                            </TableCell>
                            <TableCell align="center" sx={{ width: "20rem" }}>
                              จำนวนเงินเอาประกันภัย {<br></br>} (ของสัญญาหลัก)
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody
                          sx={{
                            "& .MuiTableCell-root": {
                              //
                              padding: "0px",
                              fontSize: "1.2rem",
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สามัญ
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={ord1}
                                value={ord1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setOrd1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={ord2}
                                value={ord2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setOrd2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={ord3}
                                value={ord3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setOrd3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              อุตสาหกรรม
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={ind1}
                                value={ind1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setInd1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={ind2}
                                value={ind2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setInd2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={ind3}
                                value={ind3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setInd3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              กลุ่ม
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            ></TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            ></TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            ></TableCell>
                            {/* <TableCell
                          style={{ padding: "10px" }}
                          align="right"
                        ></TableCell> */}
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบชั่วระยะเวลา (Yearly Renewable
                              Term Insurance)
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={term1}
                                value={term1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setTerm1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={term2}
                                value={term2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setTerm2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={term3}
                                value={term3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setTerm3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบสะสมทรัพย์ (Endowment
                              Insurance)
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={endo1}
                                value={endo1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setEndo1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={endo2}
                                value={endo2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setEndo2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={endo3}
                                value={endo3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setEndo3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบคุ้มครองเงินกู้จำนอง (Mortgage
                              Insurance)
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={mor1}
                                value={mor1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setMor1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={mor2}
                                value={mor2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setMor2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={mor3}
                                value={mor3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setMor3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบอื่น ๆ
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={oth1}
                                value={oth1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setOth1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={oth2}
                                value={oth2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setOth2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={oth3}
                                value={oth3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setOth3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สัญญาหลักประกันภัยอุบัติเหตุส่วนบุคคล
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={PAind1}
                                value={PAind1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAind1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={PAind2}
                                value={PAind2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAind2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={PAind3}
                                value={PAind3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAind3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สัญญาหลักประกันภัยอุบัติเหตุกลุ่ม
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={PAgro1}
                                value={PAgro1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAgro1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={PAgro2}
                                value={PAgro2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAgro2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={PAgro3}
                                value={PAgro3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAgro3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สัญญาหลักประกันภัยอุบัติเหตุสำหรับนักเรียน นิสิต
                              และนักศึกษา
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{
                                  width: "95%",
                                }}
                                min={0}
                                defaultValue={PAstu1}
                                value={PAstu1}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAstu1(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={PAstu2}
                                value={PAstu2}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAstu2(value);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <InputNumber
                                id="input"
                                style={{ width: "95%" }}
                                min={0}
                                defaultValue={PAstu3}
                                value={PAstu3}
                                bordered={false}
                                disabled={status}
                                formatter={(value) =>
                                  `${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                  )
                                }
                                onChange={(value) => {
                                  setPAstu3(value);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            >
                              รวม
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            >
                              {new Intl.NumberFormat().format(summary1)}
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            >
                              {new Intl.NumberFormat().format(summary2)}
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            >
                              {new Intl.NumberFormat().format(summary3)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : (
                  <div>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                      }}
                    >
                      <Typography color="primary" variant="h6">
                        1. การรับประกันภัยรายใหม่
                      </Typography>
                      <Typography color="error" variant="h6">
                        หน่วย : พันบาท
                      </Typography>
                    </Box>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead
                          sx={{
                            "& .MuiTableCell-root": {
                              padding: "12px",
                              fontSize: "1.3rem",
                              backgroundColor: "#e0e0e0",
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell
                              rowSpan={2}
                              align="center"
                              sx={{ width: "40rem" }}
                            >
                              ประเภท
                            </TableCell>
                            <TableCell
                              rowSpan={2}
                              align="center"
                              sx={{ width: "30rem" }}
                            >
                              แบบเบี้ยประกันภัย {<br></br>} จ่ายครั้งเดียว
                            </TableCell>

                            <TableCell
                              colSpan={2}
                              align="center"
                              sx={{ width: "20rem" }}
                            >
                              แบบเบี้ยประกันภัยรายปี
                            </TableCell>
                            <TableCell
                              rowSpan={2}
                              align="center"
                              sx={{ width: "20rem" }}
                            >
                              รวม
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="center" sx={{ width: "20rem" }}>
                              ปีแรก
                            </TableCell>
                            <TableCell align="center" sx={{ width: "20rem" }}>
                              ปีต่ออายุ
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody
                          sx={{
                            "& .MuiTableCell-root": {
                              //
                              padding: "0px",
                              fontSize: "1.2rem",
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สามัญ
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={ord1.toString()}
                                // .toFixed(2)
                                // .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                                //html={new Intl.NumberFormat().format(ord1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setOrd1(parseFloat(0));
                                  } else {
                                    setOrd1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={ord2.toString()}
                                //html={new Intl.NumberFormat().format(ord2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setOrd2(parseFloat(0));
                                  } else {
                                    setOrd2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={ord3.toString()}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setOrd3(parseFloat(0));
                                  } else {
                                    setOrd3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumOrd)}
                              {/* {sumOrd.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, "$&,")} */}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              อุตสาหกรรม
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={ind1.toString()}
                                //html={new Intl.NumberFormat().format(ind1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setInd1(parseFloat(0));
                                  } else {
                                    setInd1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={ind2.toString()}
                                //html={new Intl.NumberFormat().format(ind2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setInd2(parseFloat(0));
                                  } else {
                                    setInd2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={ind3.toString()}
                                //html={new Intl.NumberFormat().format(ind3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setInd3(parseFloat(0));
                                  } else {
                                    setInd3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumInd)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              กลุ่ม
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            ></TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            ></TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            ></TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            ></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบชั่วระยะเวลา (Yearly Renewable
                              Term Insurance)
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={term1.toString()}
                                //html={new Intl.NumberFormat().format(term1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setTerm1(parseFloat(0));
                                  } else {
                                    setTerm1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={term2.toString()}
                                //html={new Intl.NumberFormat().format(term2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setTerm2(parseFloat(0));
                                  } else {
                                    setTerm2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={term3.toString()}
                                //html={new Intl.NumberFormat().format(term3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setTerm3(parseFloat(0));
                                  } else {
                                    setTerm3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumTerm)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบสะสมทรัพย์ (Endowment
                              Insurance)
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={endo1.toString()}
                                //html={new Intl.NumberFormat().format(endo1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setEndo1(parseFloat(0));
                                  } else {
                                    setEndo1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={endo2.toString()}
                                //html={new Intl.NumberFormat().format(endo2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setEndo2(parseFloat(0));
                                  } else {
                                    setEndo2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={endo3.toString()}
                                //html={new Intl.NumberFormat().format(endo3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setEndo3(parseFloat(0));
                                  } else {
                                    setEndo3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumEndo)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบคุ้มครองเงินกู้จำนอง (Mortgage
                              Insurance)
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={mor1.toString()}
                                //html={new Intl.NumberFormat().format(mor1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setMor1(parseFloat(0));
                                  } else {
                                    setMor1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={mor2.toString()}
                                //html={new Intl.NumberFormat().format(mor2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setMor2(parseFloat(0));
                                  } else {
                                    setMor2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={mor3.toString()}
                                //html={new Intl.NumberFormat().format(mor3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setMor3(parseFloat(0));
                                  } else {
                                    setMor3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumMor)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              &nbsp; &nbsp; - แบบอื่น ๆ
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={oth1.toString()}
                                //html={new Intl.NumberFormat().format(oth1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setOth1(parseFloat(0));
                                  } else {
                                    setOth1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={oth2.toString()}
                                //html={new Intl.NumberFormat().format(oth2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setOth2(parseFloat(0));
                                  } else {
                                    setOth2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={oth3.toString()}
                                //html={new Intl.NumberFormat().format(oth3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setOth3(parseFloat(0));
                                  } else {
                                    setOth3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumOth)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สัญญาหลักประกันภัยอุบัติเหตุส่วนบุคคล
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAind1.toString()}
                                //html={new Intl.NumberFormat().format(PAind1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAind1(parseFloat(0));
                                  } else {
                                    setPAind1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAind2.toString()}
                                //html={new Intl.NumberFormat().format(PAind2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAind2(parseFloat(0));
                                  } else {
                                    setPAind2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAind3.toString()}
                                //html={new Intl.NumberFormat().format(PAind3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAind3(parseFloat(0));
                                  } else {
                                    setPAind3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumPAind)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สัญญาหลักประกันภัยอุบัติเหตุกลุ่ม
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAgro1.toString()}
                                //html={new Intl.NumberFormat().format(PAgro1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAgro1(parseFloat(0));
                                  } else {
                                    setPAgro1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAgro2.toString()}
                                //html={new Intl.NumberFormat().format(PAgro2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAgro2(parseFloat(0));
                                  } else {
                                    setPAgro2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAgro3.toString()}
                                //html={new Intl.NumberFormat().format(PAgro3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAgro3(parseFloat(0));
                                  } else {
                                    setPAgro3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumPAgro)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell style={{ padding: "10px" }} align="left">
                              สัญญาหลักประกันภัยอุบัติเหตุสำหรับนักเรียน นิสิต
                              และนักศึกษา
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAstu1.toString()}
                                //html={new Intl.NumberFormat().format(PAstu1)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAstu1(parseFloat(0));
                                  } else {
                                    setPAstu1(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAstu2.toString()}
                                //html={new Intl.NumberFormat().format(PAstu2)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAstu2(parseFloat(0));
                                  } else {
                                    setPAstu2(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <ContentEditable
                                style={{ padding: "10px" }}
                                id="test"
                                html={PAstu3.toString()}
                                //html={new Intl.NumberFormat().format(PAstu3)}
                                disabled={status}
                                onChange={(e) => {
                                  if (e.target.value == "") {
                                    setPAstu3(parseFloat(0));
                                  } else {
                                    setPAstu3(parseFloat(e.target.value));
                                  }
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(sumPAstu)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="center"
                            >
                              รวม
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(summary1)}
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(summary2)}
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(summary3)}
                            </TableCell>
                            <TableCell
                              style={{ padding: "10px" }}
                              align="right"
                            >
                              {new Intl.NumberFormat().format(summary4)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                )}
              </div>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "end" }}>
          {!status && (
            <Box>
              <ButtonMui
                variant="outlined"
                size="middle"
                style={{ marginRight: "15px" }}
                onClick={() => {
                  setStatus(true);
                  handleOpen();
                }}
              >
                <Typography fontSize={14}>Save Edit Data</Typography>
              </ButtonMui>
              <ButtonMui
                variant="outlined"
                size="middle"
                color="inherit"
                onClick={() => {
                  setStatus(true);
                }}
              >
                <Typography fontSize={14}>cancel</Typography>
              </ButtonMui>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "end" }}>
          {status && (
            <ButtonMui
              variant="outlined"
              size="middle"
              color="success"
              style={{ marginRight: "15px" }}
              onClick={() => {
                setStatus(false);
              }}
            >
              <Typography fontSize={14}>Edit Data</Typography>
            </ButtonMui>
          )}
          <ButtonMui
            variant="contained"
            size="middle"
            style={{ backgroundColor: "#32B917", marginRight: "15px" }}
            //onClick={Editdataform}
          >
            <Typography fontSize={14}>Confirm</Typography>
          </ButtonMui>
          <Link
            underline="hover"
            to={`/monthly`}
            style={{ textDecoration: "none", color: "#212121" }}
          >
            <ButtonMui variant="contained" size="middle" color="inherit">
              <Typography fontSize={14}>Back</Typography>
            </ButtonMui>
          </Link>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h4" component="h2">
              Save Edit data
            </Typography>
            <IconButton size="large">
              <CloseIcon fontSize="inherit" onClick={handleClose} />
            </IconButton>
          </Box>
          <Typography
            sx={{ mt: 3, color: "#616161" }}
            fontSize={16}
            fontWeight={300}
          >
            Do you want to save edit data form
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
              onClick={handleClick}
              loading={loadingbutton}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              size="large"
            >
              <span>Save</span>
            </LoadingButton>
            <ButtonMui
              style={{ marginLeft: 12 }}
              variant="outlined"
              size="middle"
              color="inherit"
              onClick={handleClose}
            >
              <Typography fontSize={14}>cancel</Typography>
            </ButtonMui>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
