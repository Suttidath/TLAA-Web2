import React, { useState } from "react";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";

import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { postAddmember } from "../service";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import MaskedInput from "react-text-mask";

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

export default function User() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  const [thaiName, setThaiName] = React.useState("");
  const [engName, setEngName] = React.useState("");
  const [engEtName, setengEtName] = React.useState("");
  const [companyCode, setCompanyCode] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [fax, setFax] = React.useState("");
  const [tax, setTax] = React.useState("");

  const [errTextTname, setErrTextTname] = React.useState("");
  const [errTname, setErrTname] = React.useState(false);
  const [errTextEname, setErrTextEname] = React.useState("");
  const [errEname, setErrEname] = React.useState(false);
  const [errTextEetname, setErrTextEetname] = React.useState("");
  const [errEetname, setErrEetname] = React.useState(false);
  const [errTextComcode, setErrTextComcode] = React.useState("");
  const [errComcode, setErrComcode] = React.useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [loadingbutton, setloadingbutton] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickModal = () => {
    setloadingbutton(true);
    Addmember();
  };

  //////////////// Add User ////////////////

  const Addmember = () => {
    //setLoading(false);

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
    values["isActive"] = "1";

    postAddmember(values).then((response) => {
      console.log("postAdduser: response", response);
      console.log("postAdduser: values", values);

      if (response && (response.status === 200 || response.status === 201)) {
        handleCloseModal();
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
        handleCloseModal();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "ไม่สามารถเพิ่ม Member ได้ !!",
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
              Add Member
            </Typography>
          </Breadcrumbs>
        </div>
      </Box>

      {/*  ////////////////////////// Form Add User ////////////////////////// */}

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
          <GroupAddIcon
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
            Add Member
          </Typography>
        </Box>
        <Box sx={{ mt: 3, display: "flex" }}>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Insurance Thai Name"
              variant="outlined"
              size="middle"
              fullWidth
              value={thaiName}
              error={errTname}
              onChange={(e) => {
                setThaiName(e.target.value);
                if (e.target.value) {
                  setErrTextTname("");
                  setErrTname(false);
                } else {
                  setErrTextTname("Insurance Thai Name is required");
                  setErrTname(true);
                }
              }}
              helperText={<Typography color="error">{errTextTname}</Typography>}
            />
          </Box>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Insurance English Name"
              variant="outlined"
              size="middle"
              fullWidth
              value={engName}
              error={errEname}
              onChange={(e) => {
                setEngName(e.target.value);
                if (e.target.value) {
                  setErrTextEname("");
                  setErrEname(false);
                } else {
                  setErrTextEname("Insurance English Name is required");
                  setErrEname(true);
                }
              }}
              helperText={<Typography color="error">{errTextEname}</Typography>}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: "flex" }}>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Insurance Shorten Name"
              variant="outlined"
              size="middle"
              fullWidth
              value={engEtName}
              error={errEetname}
              onChange={(e) => {
                setengEtName(e.target.value);
                if (e.target.value) {
                  setErrTextEetname("");
                  setErrEetname(false);
                } else {
                  setErrTextEetname("Insurance Shorten Name is required");
                  setErrEetname(true);
                }
              }}
              helperText={
                <Typography color="error">{errTextEetname}</Typography>
              }
            />
          </Box>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Insurance Code"
              variant="outlined"
              size="middle"
              fullWidth
              value={companyCode}
              error={errComcode}
              onChange={(e) => {
                setCompanyCode(e.target.value);
                if (e.target.value) {
                  setErrTextComcode("");
                  setErrComcode(false);
                } else {
                  setErrTextComcode("Insurance Code is required");
                  setErrComcode(true);
                }
              }}
              helperText={
                <Typography color="error">{errTextComcode}</Typography>
              }
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: "flex" }}>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Address1"
              variant="outlined"
              size="middle"
              fullWidth
              value={address1}
              onChange={(e) => {
                setAddress1(e.target.value);
              }}
            />
          </Box>
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
        </Box>

        <Box sx={{ mt: 3, display: "flex" }}>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Address2"
              variant="outlined"
              size="middle"
              fullWidth
              value={address2}
              onChange={(e) => {
                setAddress2(e.target.value);
              }}
            />
          </Box>

          <Box sx={{ width: 400, mr: 4 }}>
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

        <Box sx={{ mt: 3, display: "flex" }}>
          <Box sx={{ width: 400, mr: 4 }}>
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
              value={fax}
              onChange={(e) => {
                setFax(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Tax No."
              variant="outlined"
              size="middle"
              fullWidth
              type="number"
              value={tax}
              onChange={(e) => {
                setTax(e.target.value);
              }}
            />
          </Box>
        </Box>
      </Box>

      {/*  ////////////////////////// Action Button ////////////////////////// */}

      <Box
        sx={{
          mt: 9,
          width: 400,
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Box>
          <Button
            variant="contained"
            size="middle"
            style={{ backgroundColor: "#32B917", marginRight: "15px" }}
            //onClick={handleOpenModal}
            onClick={() => {
              if (thaiName.length === 0) {
                setErrTname(true);
                setErrTextTname("Insurance Thai Name is required");
              }
              if (companyCode.length === 0) {
                setErrComcode(true);
                setErrTextComcode("Insurance Code is required");
              }

              if (engName.length === 0) {
                setErrEname(true);
                setErrTextEname("Insurance English Name is required");
              }
              if (engEtName.length === 0) {
                setErrEetname(true);
                setErrTextEetname("Insurance Shorten Name is required");
              }

              if (
                thaiName.length > 0 &&
                companyCode.length > 0 &&
                engName.length > 0 &&
                engEtName.length > 0
              ) {
                handleOpenModal();
              }
            }}
          >
            <Typography fontSize={14}>Add Member</Typography>
          </Button>
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

      <Modal open={openModal}>
        <Box sx={styleModal}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h5" component="h2">
              Add Member
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
            Do you want to confirm add Member
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
    </Box>
  );
}
