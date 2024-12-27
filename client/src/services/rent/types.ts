import { Rent } from "@/types";

export type GetAllRequestQueryData = {
  type?: "recommended" | "popular";
  take?: number;
  skip?: number;
  search?: string;
  categoryId?: string;
  capacity?: string;
  min_price?: number;
  max_price?: number;
  pickup_location?: string;
  pickup_date?: string;
  pickup_time?: string;
  dropoff_location?: string;
  dropoff_date?: string;
};

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
