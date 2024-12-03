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

  const filter: Record<string, any> = {};

  if (type === "recommendation") {
    filter.showInRecommendation = true;
  }

  if (category) {
    const categoryList = typeof category === "string" ? [category] : category;
  }

  const items = await Rent.find({}).skip(skip).limit(take);

  //   res.json({
  //     data,
  //   });
};

export default {
  getAll,
};
