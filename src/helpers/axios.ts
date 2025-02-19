import { DOMAIN_API } from "@/constants/api.endpoint";
import axios from "axios";

export const ApiAxios = axios.create({
  baseURL: DOMAIN_API.domain,
});
