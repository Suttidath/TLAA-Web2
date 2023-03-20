import * as React from "react";
import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Logo from "../img/logo2.png";
import { postLogin } from "../services/API"; //Todo
import Swal from "sweetalert2";
import LinearProgress from "@mui/material/LinearProgress";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const dataconfig = {};
dataconfig.RealData = true; // true: call api, false: mockup data

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errTextEmail, setErrTextEmail] = useState("");
  //const [errEmail, setErrEmail] = useState(false);
  const [errTextPassword, setErrTextPassword] = useState("");
  //const [errPassword, setErrPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const loginSubmit = (e) => {
    e.preventDefault();
    setLoading(false);
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
            userID: res.data.user.id,
            firstname: res.data.user.first_name,
            lastname: res.data.user.last_name,
            email: res.data.user.email,
            isAdmin: res.data.user.isAdmin,
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
        width: "100vw",
        backgroundColor: "#82b1ff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50vw",
          height: "100vh",
        }}
      >
        <img
          alt="logo"
          src={Logo}
          style={{
            width: "500px",
            height: "150px",
            marginLeft: "100px",
          }}
        />
      </Box>

      <Box
        component="form"
        noValidate
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50vw",
          height: "100vh",
        }}
      >
        <Box>
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
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                placeholder="Email is required"
                style={{
                  display: "flex",
                  padding: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  textDecoration: "center",
                  width: "350px",
                  height: "25px",
                  fontSize: "12px",
                  backgroundColor: "#f5f5f5",
                  border: "solid 0.5px #424242 ",
                }}
              ></input>
            </div>
            <div>
              <label style={{ fontSize: "14px", color: "#f5f5f5" }}>
                Password :
              </label>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  placeholder="Password is required"
                  style={{
                    display: "flex",
                    padding: 10,
                    marginTop: 10,
                    textDecoration: "center",
                    width: "308px",
                    height: "25px",
                    fontSize: "12px",
                    backgroundColor: "#f5f5f5",
                    border: "solid 0.5px #424242 ",
                  }}
                />
                <div
                  onClick={handleClickShowPassword}
                  style={{
                    display: "flex",
                    marginTop: 10,
                    width: "40px",
                    fontSize: "16px",
                    backgroundColor: "#f5f5f5",
                    border: "solid 0.5px #424242 ",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </div>
              </div>
              {errTextPassword}
            </div>

            {/* {errText} */}

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
    </Box>
  );
}
