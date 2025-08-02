import axios from "axios"

import { ENV } from "../constants"

// Axios instance
export const api = axios.create({
  baseURL: ENV.BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  }
})