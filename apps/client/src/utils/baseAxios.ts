import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.api,
  withCredentials: true,
});
