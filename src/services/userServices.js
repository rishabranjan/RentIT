import http from "./httpServices";
import config from "../config.json";

const url = config.apiEndPoint + "/users";

export function register(user) {
  return http.post(url, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
