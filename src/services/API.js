import axios from "axios";
import * as config from "./../config";

const API = "http://127.0.0.1:8000/api/"; //Local
//const API = "https://dms-api-dot-tms-project-351005.as.r.appspot.com/api/"; //UAT
export const API_URL = API;

// Todo
export function postLogin(data) {
  return axios
    .post(config.urlAPI + "/login", data)
    .then((res) => {
      console.log(`login ok`, res);
      return res;
    })
    .catch((err) => {
      console.log(`login err`, err);
      return err.response;
    });
}

// export function postLogin(data) {
//   return axios
//     .post(config.urlAPI + "/login", data, config.headerCallAPI)
//     .then((res) => {
//       console.log(`login ok`, res);
//       return res;
//     })
//     .catch((err) => {
//       console.log(`login err`, err);
//       return err.response;
//     });
// }

// Todo
export function GetUserMe() {
  return axios
    .get(config.urlAPI + "/user/me", config.headerCallAPI)
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
