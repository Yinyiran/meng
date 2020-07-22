import Axios from "axios"
import { GetCookie } from "./util"
const Host = process.env.NODE_ENV === "production" ? "api.yunyiran.com" : ""
const Data = {
  get(url, params, config) {
    return Axios.get(`${Host}/api${url}`, { params }, config)
  },
  post(url, body, config = {}) {
    const headers = {
      "x-csrf-token": GetCookie("csrfToken")
    }
    if (config.headers) Object.assign(config.headers, headers);
    else config.headers = headers;
    return Axios.post(`${Host}/api${url}`, body, config)
  }
}
export default Data;