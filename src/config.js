// localhost (2022.08.18)
export const urlAPI = "http://127.0.0.1:8000/api";
//export const urlAPI = "https://api-tlaa-dot-ttla-dev.as.r.appspot.com/api";

// export const urlDataAPI = "https://acp.isurvey.mobi/isurvey_V4/service/API";
// export const urlDataAPI =
//   "https://api-mobile-azay-dot-isurvey-azay.as.r.appspot.com/api/v1";
// export const urlAPIMobile =
//   "https://api-mobile-azay-dot-isurvey-azay.as.r.appspot.com/api/v1";

export const headerCallAPI = {
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("tlaa_access_token"),
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};
