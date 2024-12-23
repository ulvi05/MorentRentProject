import axiosInstance from "../axiosInstance";
import { GetAllRentResponse } from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllRentResponse>("/rent");
};

const rentService = { getAll };
export default rentService;
