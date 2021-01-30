import JwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth/login`;
const tokenKey = "token";

http.setJwt(getToken());

export async function login(username, password) {
  const { headers } = await http.post(apiEndpoint, {
    username: username,
    password: password,
  });
  const jwt = headers.authorization.split(" ")[1];
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

// export function loginWithJwt(jwt) {
//   localStorage.setItem(tokenKey, jwt);
// }

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return JwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

function getToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getToken
};
