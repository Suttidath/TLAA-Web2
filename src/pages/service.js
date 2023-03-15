import axios from "axios";
import * as config from "../config";

////////////// User Menu //////////////

export function getUserAll(qString) {
  return axios
    .get(config.urlAPI + "/userall" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getCompanyShort(qString) {
  return axios
    .get(config.urlAPI + "/companyshorten" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postAdduser(data) {
  return axios
    .post(config.urlAPI + "/adduser", data, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postEdituser(qString, id) {
  return axios
    .put(config.urlAPI + "/user/" + id, qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getUser(qString) {
  return axios
    .get(config.urlAPI + "/user/" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

////////////// Member Menu //////////////

export function getCompanyAll(qString) {
  return axios
    .get(config.urlAPI + "/companyall" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getCompany(qString) {
  return axios
    .get(config.urlAPI + "/company/" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postAddmember(data) {
  return axios
    .post(config.urlAPI + "/addmember", data, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postEditmember(qString, id) {
  return axios
    .put(config.urlAPI + "/company/" + id, qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getCompanyRecord(qString, id) {
  return axios
    .get(config.urlAPI + "/companyrecord" + qString + id, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postChangecom(data) {
  return axios
    .post(config.urlAPI + "/changecompanyname", data, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

////////////// Monthly Menu //////////////

export function getMonthly(qString) {
  return axios
    .get(config.urlAPI + "/monthlydata" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postAddformA(data) {
  return axios
    .post(config.urlAPI + "/addform/a", data, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function getEditform(qString) {
  return axios
    .get(config.urlAPI + "/form/" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postEditformA(qString, id) {
  return axios
    .put(config.urlAPI + "/updateform/a/" + id, qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postAddformB(data) {
  return axios
    .post(config.urlAPI + "/addform/b", data, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postEditformB(qString, id) {
  return axios
    .put(config.urlAPI + "/updateform/b/" + id, qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function deleteMonthly(id) {
  return axios
    .delete(config.urlAPI + "/monthlydata/" + id, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

// export function postConfirm(id) {
//   console.log(id);
//   return axios
//     .post(config.urlAPI + "/confirm/11149", config.headerCallAPI)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {ต้อง
//       return err.response;
//     });
// }

export function postConfirm(qString, id) {
  return axios
    .put(config.urlAPI + "/confirm/" + qString, id, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

////////////// Issue Report Menu //////////////

export function getReport(qString) {
  return axios
    .get(config.urlAPI + "/report" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportWordReport(qString) {
  return axios
    .get(config.urlAPI + "/export/word" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT1Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t1" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT2Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t2" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT3Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t3" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT4Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t4" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT5Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t5" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT6Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t6" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT7Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t7" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT8Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t8" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT9Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t9" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT10Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t10" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT11Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t11" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT12Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t12" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT13Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t13" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT14Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t14" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT15Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t15" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function exportT16Report(qString) {
  return axios
    .get(config.urlAPI + "/export/t16" + qString, {
      responseType: "arraybuffer",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
        Accept: "application/json",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
