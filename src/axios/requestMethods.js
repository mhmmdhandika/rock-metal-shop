import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${token}` },
  });
