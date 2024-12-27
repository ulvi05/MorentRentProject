import axiosInstance from "../axiosInstance";
import {
  RentRequestPayload,
  GetAllRentResponse,
  GetByIdRentResponse,
  GetAllRequestQueryData,
} from "./types";

const getAll = async (queryData: GetAllRequestQueryData) => {
  const searchParams = new URLSearchParams();
  const keys = Object.keys(queryData);

  keys.forEach((key) => {
    if (queryData[key as keyof GetAllRequestQueryData]) {
      searchParams.append(
        key,
        String(queryData[key as keyof GetAllRequestQueryData])
      );
    }
  });

  return await axiosInstance.get<GetAllRentResponse>(
    `/rent?${searchParams.toString()}`
  );
};

const getById = async (id: string) => {
  return await axiosInstance.get<GetByIdRentResponse>(`/rent/${id}`);
};

const create = async (data: RentRequestPayload) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("fuel", data.fuel.toString());
  formData.append("gearBox", data.gearBox);
  formData.append("price", data.price.toString());
  formData.append("description", data.description);
  formData.append("capacity", data.capacity.toString());
  formData.append("discount", data.discount.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("pickUpLocation", data.pickUpLocation);
  data.dropOffLocation.forEach((location) => {
    formData.append("dropOffLocation", location);
  });

  data.images?.forEach((image) => {
    formData.append("images", image);
  });
  formData.append("showInRecommendation", data.showInRecommendation.toString());

  return await axiosInstance.post("/rent", formData);
};
const edit = async (data: RentRequestPayload & { id?: string }) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("fuel", data.fuel.toString());
  formData.append("gearBox", data.gearBox);
  formData.append("price", data.price.toString());
  formData.append("description", data.description);
  formData.append("capacity", data.capacity.toString());
  formData.append("discount", data.discount.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("pickUpLocation", data.pickUpLocation);
  data.dropOffLocation.forEach((location, index) => {
    formData.append(`dropOffLocation[${index}]`, location);
  });
  if (data.images)
    Array.from(data.images).forEach((image) => {
      formData.append(`images`, image);
    });
  formData.append("showInRecommendation", data.showInRecommendation.toString());

  return await axiosInstance.put(`/rent/${data.id}`, formData);
};

const rentService = { getAll, create, edit, getById };
export default rentService;
