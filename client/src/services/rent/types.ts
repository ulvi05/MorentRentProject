import { Rent } from "@/types";

export type GetAllRentResponse = {
  items: Rent[];
  message: string;
  total: number;
  skip: number;
  take: number;
};
export type GetByIdRentResponse = {
  item: Rent;
  message: string;
};

export type RentRequestPayload = {
  name: string;
  description: string;
  price: number;
  discount: number;
  capacity: number;
  fuel: number;
  gearBox: string;
  categoryId: string;
  pickUpLocation: string;
  dropOffLocation: string[];
  images?: File[];
  showInRecommendation: boolean;
};
