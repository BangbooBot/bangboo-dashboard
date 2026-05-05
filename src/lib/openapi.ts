import createClient from "openapi-fetch";
import type { paths } from "@/types/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.protocol}//${window.location.hostname}:3001/`;
  }
  return "http://localhost:3001/";
};
/*
const getCorsHeaders = () => {
  if (typeof window !== "undefined") {
    return {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    };
  }
  return {};
};
*/

const client = createClient<paths>({
  baseUrl: getBaseUrl(),
  headers: {
    "user_agent": typeof navigator !== "undefined" ? navigator.userAgent : "",
    "accept_language": typeof navigator !== "undefined" ? navigator.language : ""
  },
  credentials: "include"
});

export const useApi = () => client;