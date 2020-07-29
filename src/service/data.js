import Axios from "axios"
import { UtilService } from "./index"
const Data = {
  get(url, params, config) {
    return Axios.get(`/api${url}`, { params }, config)
  },
  post(url, body, config = {}) {
    const headers = {
      "x-csrf-token": UtilService.GetCookie("csrfToken")
    }
    if (config.headers) Object.assign(config.headers, headers);
    else config.headers = headers;
    return Axios.post(`/api${url}`, body, config)
  }
}
export default Data;