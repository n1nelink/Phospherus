import axios, { AxiosError, AxiosResponse } from "axios";
import { message } from "antd";

const request = axios.create({
  baseURL: "http://localhost:8989/api/console",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },

  (error: AxiosError) => {
    const { response } = error;
    if (JSON.stringify(error).includes("Network Error")) {
      message.error("网络超时", 3);
    }

    if (response) {
      if (response.status === 400) {
        message.error("400 error");
      } else if (response.status === 401) {
        message.error("401 error");
      } else {
        message.error("other error");
      }
    }

    return Promise.reject(new Error(error.message));
  },
);

export default request;
