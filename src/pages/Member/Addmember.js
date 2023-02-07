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

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   //border: "1px solid #000",
//   boxShadow: 16,
//   p: 5,
// };

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

  //////////////// Add User ////////////////

  const Addmember = () => {
    setLoading(false);

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
          text: "ไม่สามารถเพิ่ม Member ได้ !!",
        });
      }
      setLoading(true);
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
              onChange={(e) => {
                setThaiName(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Insurance English Name"
              variant="outlined"
              size="middle"
              fullWidth
              value={engName}
              onChange={(e) => {
                setEngName(e.target.value);
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: "flex" }}>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Insurance Shorten Name "
              variant="outlined"
              size="middle"
              fullWidth
              value={engEtName}
              onChange={(e) => {
                setengEtName(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Insurance Code"
              variant="outlined"
              size="middle"
              fullWidth
              value={companyCode}
              onChange={(e) => {
                setCompanyCode(e.target.value);
              }}
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
          <Box sx={{ width: 400 }}>
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
          <Box sx={{ width: 400 }}>
            <TextField
              label="Phone Number"
              variant="outlined"
              size="middle"
              fullWidth
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: "flex" }}>
          <Box sx={{ width: 400, mr: 4 }}>
            <TextField
              label="Fax No."
              variant="outlined"
              size="middle"
              fullWidth
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
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button
            variant="contained"
            size="middle"
            style={{ backgroundColor: "#32B917", marginRight: "15px" }}
            onClick={Addmember}
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
    </Box>
  );
}
