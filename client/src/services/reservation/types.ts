import { Reservation } from "@/types";

export type CreateReservationRequestPayload = {
  billingName: string;
  billingPhoneNumber: string;
  billingAddress: string;
  billingTownCity: string;
  startDate: string;
  endDate: string;
  pickUpLocation: string;
  dropOffLocation: string;
  rentId: string;
};

export type CreateReservationResponseType = {
  item?: Reservation;
  message: string;
};
