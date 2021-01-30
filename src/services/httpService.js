import Axios from "axios";
import logger from "./logService";

// Axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

Axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
  }
  return Promise.reject(error);
});

function setContentType(type = 'application/json') {
  Axios.defaults.headers.post['Content-Type'] = type;
}

function setJwt(jwt) {
  Axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
  setJwt,
  setContentType,
};
