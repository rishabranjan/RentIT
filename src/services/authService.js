import http from "./httpServices";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const url = config.apiEndPoint + "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(url, { email, password });
  localStorage.setItem("token", jwt);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    return user;
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt
};
