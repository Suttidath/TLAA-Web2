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
    .get(config.urlAPI + "/form/a/" + qString, config.headerCallAPI)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}

export function postEditform(qString, id) {
  return axios
    .put(config.urlAPI + "/updateform/a/" + id, qString, config.headerCallAPI)
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
