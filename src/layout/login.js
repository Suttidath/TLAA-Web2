import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../img/logo2.png";
import { postLogin, GetUserMe } from "../services/API"; //Todo
import RouteService from "../services/routeService";
import Swal from "sweetalert2";

import axios from "axios";
import * as config from "../config";
import { border } from "@chakra-ui/react";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingIcon from "../components/loadingIcon";
import LinearProgress from "@mui/material/LinearProgress";

const dataconfig = {};
dataconfig.RealData = true; // true: call api, false: mockup data

export default function LoginForm() {
  // const [loginInput, setLogin] = useState({
  //   email: "",
  //   password: "",
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = React.useState(0);

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

  // const handleInput = (e) => {
  //   e.persist();
  //   setLogin({ ...loginInput, [e.target.name]: e.target.value });
  // };

  // Call API Check User Password
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
    // const data = {
    //   email: loginInput.email,
    //   password: loginInput.password,
    // };
    const data = {
      email: email,
      password: password,
    };
    console.log(`login data`, data.email);

    postLogin(data).then((res) => {
      console.log(`login response`, res.data.message);

      if (res && res.status === 200 && res.data && res.data.user.id) {
        sessionStorage.setItem("tlaa_access_token", res.data.access_token);

        sessionStorage.setItem(
          "tlaaUserData",
          JSON.stringify({
            userID: res.data.id,
            firstname: res.data.first_name,
            lastname: res.data.last_name,
          })
        );

        sessionStorage.setItem("login", "Y");
        console.log(`login`, res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Complete",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.pathname = "/dashboard";
      } else {
        console.log(`login-error`, res);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or Password wrong!",
        });
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#82b1ff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          height: "100%",
          // margin: "120px",
        }}
      >
        <img
          alt="logo"
          src={Logo}
          style={{
            width: "500px",
            height: "150px",
            margin: "120px",
          }}
        />
      </Box>

      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "120px",
        }}
      >
        <Typography fontSize={30} sx={{ color: "#0d47a1" }}>
          Welcome
        </Typography>
        <Typography fontSize={28} sx={{ mb: 3, color: "#f5f5f5" }}>
          Login to TLAA
        </Typography>
        <form>
          <div>
            <label style={{ fontSize: "14px", color: "#f5f5f5" }}>
              Email :
            </label>
            <input
              type="text"
              name="username"
              // onChange={handleInput}
              // value={loginInput.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              style={{
                display: "flex",
                padding: 10,
                marginTop: 10,
                marginBottom: 10,
                textDecoration: "center",
                width: "350px",
                fontSize: "16px",
                backgroundColor: "#f5f5f5",
              }}
            ></input>
          </div>
          <div>
            <label style={{ fontSize: "14px", color: "#f5f5f5" }}>
              Password :
            </label>
            <input
              type="password"
              name="password"
              // onChange={handleInput}
              // value={loginInput.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              style={{
                display: "flex",
                padding: 10,
                marginTop: 10,
                textDecoration: "center",
                width: "350px",
                fontSize: "16px",
                backgroundColor: "#f5f5f5",
              }}
            ></input>
          </div>

          <Box
            style={{
              marginTop: 35,
              width: "370px",
            }}
          >
            {!loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            ) : (
              ""
            )}
          </Box>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              onClick={loginSubmit}
              style={{
                padding: 10,
                marginTop: 5,
                textDecoration: "center",
                width: "370px",
                backgroundColor: "#0d47a1",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Typography fontSize={16}>Login </Typography>
              </Box>
            </button>
          </div>
        </form>
      </Box>
    </Box>
  );
}
