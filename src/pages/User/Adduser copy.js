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
  FormControlLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  Grid,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { postAdduser, getCompanyShort } from "../service";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import PhoneInput from "react-phone-input-2";
import MuiPhoneNumber from "material-ui-phone-number";
import PropTypes from "prop-types";
import { IMaskInput } from "react-imask";
import { NumericFormat } from "react-number-format";
import Input from "@mui/material/Input";
import MaskedInput from "react-text-mask";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  inputField: {
    width: "100%",
    margin: theme.spacing(1, 0),
  },
}));

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
  const [role, setRole] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [phone2, setPhone2] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [datacompany, setDataCompany] = React.useState([]);

  const [progress, setProgress] = React.useState(0);
  const [values, setValues] = useState({});
  // const [value, setValue] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const [loadingbutton, setloadingbutton] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickModal = () => {
    setloadingbutton(true);
    Adduser();
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

  ////////// for get DataUser //////////
  React.useEffect(() => {
    getCompany();
  }, []);

  //////////////// Text field for hidden password ////////////////

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  //////////////// Add User ////////////////

  const Adduser = () => {
    values["phone"] = phone;
    values["position"] = position;
    values["email"] = email;
    values["isActive"] = "1";
    values["company_id"] = company;
    values["first_name"] = firstName;
    values["last_name"] = lastName;
    values["password"] = password;
    if (role == "Admin") {
      values["isAdmin"] = "1";
    } else {
      values["isAdmin"] = "0";
    }

    postAdduser(values).then((response) => {
      console.log("postAdduser: response", response);
      console.log("postAdduser: values", values);

      if (response && (response.status === 200 || response.status === 201)) {
        handleCloseModal();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "เพิ่ม User เรียบร้อย!",
          showConfirmButton: false,
          timer: 5000,
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
          text: "ไม่สามารถเพิ่ม User ได้ !!",
        });
      }
      setloadingbutton(false);
    });
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    // .min(6, "Username must be at least 6 characters")
    // .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    position: Yup.string().required("Position is required"),
    phone: Yup.string().required("Phone is required"),

    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
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
              Add User
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
            Add User
          </Typography>
        </Box>

        <Box px={3} py={2}>
          <Typography variant="h6" align="center" margin="dense">
            React Hook Form - Material UI - Validation
          </Typography>

          <Grid container spacing={1}>
            {/* <Grid item xs={12} sm={12}>
              <TextField
                required
                id="firstname"
                name="firstname"
                label="First Name"
                fullWidth
                margin="dense"
                {...register("firstname")}
                error={errors.firstname ? true : false}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.firstname?.message}
              </Typography>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                fullWidth
                margin="dense"
                {...register("username")}
                error={errors.username ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register("email")}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                {...register("password")}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                margin="dense"
                {...register("confirmPassword")}
                error={errors.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
            </Grid> */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Controller
                    control={control}
                    name="acceptTerms"
                    defaultValue="false"
                    inputRef={register()}
                    render={({ field: { onChange } }) => (
                      <Checkbox
                        color="primary"
                        onChange={(e) => onChange(e.target.checked)}
                      />
                    )}
                  />
                }
                label={
                  <Typography color={errors.acceptTerms ? "error" : "inherit"}>
                    I have read and agree to the Terms *
                  </Typography>
                }
              />
              <br />
              <Typography variant="inherit" color="textSecondary">
                {errors.acceptTerms
                  ? "(" + errors.acceptTerms.message + ")"
                  : ""}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </Box>
        </Box>

        <Box component="form" noValidate autoComplete="off">
          <Box sx={{ mt: 2, display: "flex" }}>
            <Box sx={{ width: 450, mr: 3 }}>
              <TextField
                required
                id="firstname"
                name="firstname"
                label="First name"
                fullWidth
                margin="dense"
                {...register("firstname")}
                error={errors.firstname ? true : false}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.firstname?.message}
              </Typography>
            </Box>
            <Box sx={{ width: 450 }}>
              <TextField
                required
                id="lastname"
                name="lastname"
                label="Last name"
                fullWidth
                margin="dense"
                {...register("lastname")}
                error={errors.lastname ? true : false}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.lastname?.message}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 2, display: "flex" }}>
            <Box sx={{ width: 450, mr: 3 }}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register("email")}
                error={errors.email ? true : false}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Box>
            <Box sx={{ width: 450 }}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="dense"
                {...register("password")}
                error={errors.password ? true : false}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Box>

            {/* <Box sx={{ width: 400 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  required
                  id="password"
                  name="password"
                  label="password"
                  fullWidth
                  margin="dense"
                  {...register("password")}
                  error={errors.password ? true : false}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  //label="Password"
                  //value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
            </Box> */}
          </Box>

          <Box sx={{ mt: 2, display: "flex" }}>
            <Box sx={{ width: 450, mr: 3 }}>
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
                    required
                    id="phone"
                    name="phone"
                    fullWidth
                    inputMode="numeric"
                    inputProps={{ inputMode: "numeric" }}
                    inputRef={ref}
                    label="Phone No."
                    placeholder="0XX-XXX-XXXX"
                    margin="dense"
                    {...register("phone")}
                    error={errors.phone ? true : false}
                    {...props}
                    // helperText={
                    //   <Typography variant="subtitle1" color="textSecondary">
                    //     {errors.phone?.message}
                    //   </Typography>
                    // }
                  />
                  //   <Typography variant="inherit" color="textSecondary">
                  //   {errors.password?.message}
                  //   </Typography>
                )}
                showMask={false}
                value={phone}
              />
            </Box>

            <Box sx={{ width: 450, mr: 3 }}>
              <TextField
                required
                id="position"
                name="position"
                label="Position"
                fullWidth
                margin="dense"
                {...register("position")}
                error={errors.position ? true : false}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.position?.message}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: "flex" }}>
            <Box sx={{ width: 400, mr: 4 }}>
              <TextField
                label="Company Member"
                variant="outlined"
                size="middle"
                fullWidth
                select
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {datacompany.map((option, index) => (
                  <MenuItem key={index} value={option.company_id}>
                    {option.companyabb}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ width: 400 }}>
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
            onClick={handleOpenModal}
          >
            <Typography fontSize={14}>Add User</Typography>
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
      </Box>

      <Modal open={openModal}>
        <Box sx={styleModal}>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginTop={1} variant="h5" component="h2">
              Add User
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
            Do you want to confirm Add User
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
              <span>Add User</span>
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
