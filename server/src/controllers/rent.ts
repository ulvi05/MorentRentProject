import { Request, Response } from "express";
import Rent from "../mongoose/schemas/rent";

const getAll = async (req: Request, res: Response) => {
  const {
    type,
    take = 10,
    skip = 0,
    search,
    category,
    capacity,
    min_price,
    max_price,
    pickup_location,
    dropoff_location,
  } = req.matchedData;

  const filter: Record<string, any> = {
    $and: [],
  };

  if (type === "recommendation") {
    filter.showInRecommendation = true;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: new RegExp(search, "i") } },
      { description: { $regex: new RegExp(search, "i") } },
    ];
  }

  if (capacity) {
    const capacityList = typeof capacity === "string" ? [capacity] : capacity;
    filter.capacity = { $in: capacityList };
  }

  if (category) {
    const categoryList = typeof category === "string" ? [category] : category;
    filter.category = { $in: categoryList };
  }

  if (min_price) {
    filter.$and.push({ price: { $gte: +min_price } });
  }

  if (max_price) {
    filter.$and.push({ price: { $lte: +max_price } });
  }

  if (pickup_location) {
    filter.pickUpLocation = pickup_location;
  }

  if (dropoff_location) {
    filter.dropOffLocation = dropoff_location;
  }

  const items = await Rent.find(filter).skip(skip).limit(take);

  res.json({
    message: "Success",
    items,
  });
};

const create = async (req: Request, res: Response) => {
  const {
    name,
    description,
    category,
    pickUpLocation,
    dropOffLocation,
    fuel,
    gearBox,
    capacity,
    price,
    currency,
    discount,
  } = req.matchedData;

  const images = (req.files as any)?.map((file: any) => file.filename) || [];

  const rent = new Rent({
    name,
    description,
    category,
    pickUpLocation,
    dropOffLocation,
    fuel,
    gearBox,
    capacity,
    price,
    currency,
    discount,
    images,
  });

  await rent.save();
  res.status(201).json({
    message: "Success",
    item: rent,
  });
};

export default {
  getAll,
  create,
};
