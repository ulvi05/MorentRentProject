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
  fuel: string;
  gearBox: string;
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
};
