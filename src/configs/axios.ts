import { HOST_API } from "./secrets";
import axios from "axios";

const instance = axios.create({
  baseURL: HOST_API,
});

export default instance;
