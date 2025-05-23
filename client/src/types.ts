export type User = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  isBlocked: boolean;
  role: UserRole;
};

export type Location = {
  _id: string;
  createdAt: string;
  name: string;
};

export type Category = {
  _id: string;
  createdAt: string;
  name: string;
  count: number;
};

export type Rent = {
  _id: string;
  name: string;
  fuel: number;
  gearBox: string;
  price: number;
  description: string;
  capacity: number;
  createdAt: string;
  currency: string;
  discount: number;
  category: Category;
  dropOffLocation: Location[];
  images: string[];
  pickUpLocation: Location;
  showInRecommendation: boolean;
  reviews: Review[];
};

export type Reservation = {
  billing: {
    name: string;
    phoneNumber: string;
    address: string;
    townCity: string;
  };
  createdAt: string;
  dropOffLocation: string;
  endDate: string;
  id: string;
  pickUpLocation: string;
  rent: Rent | string;
  startDate: string;
  status: ReservationStatus;
  total: number;
  updatedAt: string;
  user: string;
  _id: string;
  hasReview: boolean;
};

export type Review = {
  author: User;
  createdAt: string;
  content: string;
  id: string;
  rating: number;
  rent: Rent;
  status: ReviewStatus;
  _id: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export enum ReservationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  Cancelled = "cancelled",
}

export enum ReviewStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}
