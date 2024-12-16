import axiosInstance from "../axiosInstance";
import { GetAllLocationResponse } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllLocationResponse>("/location");
};

const locationService = { getAll };
export default locationService;
