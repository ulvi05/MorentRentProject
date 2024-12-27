import { Request, Response } from "express";
import Rent from "../mongoose/schemas/rent";
import Category from "../mongoose/schemas/category";

const getAll = async (req: Request, res: Response) => {
  try {
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

    if (type === "recommended") {
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

    const items = await Rent.find(filter)
      .skip(+skip)
      .limit(+take)
      .populate(["category", "pickUpLocation", "dropOffLocation"]);

    const total = await Rent.countDocuments(filter);

    items.forEach((item) => {
      item.images = item.images.map(
        (image) => `${process.env.BASE_URL}/public/rent/${image}`
      );
    });
    res.json({
      message: "Success",
      items,
      total,
      take: +take,
      skip: +skip,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rent = await Rent.findById(id).populate([
      "category",
      "pickUpLocation",
      "dropOffLocation",
    ]);

    if (!rent) {
      res.status(404).json({
        message: "Not Found",
      });
      return;
    }

    rent.images = rent.images.map(
      (image) => `${process.env.BASE_URL}/public/rent/${image}`
    );

    res.json({
      message: "Success",
      item: rent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      categoryId,
      pickUpLocation,
      dropOffLocation,
      fuel,
      gearBox,
      capacity,
      price,
      currency,
      discount,
      showInRecommendation = false,
    } = req.matchedData;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        message: "Category Not Found",
      });
      return;
    }

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
      showInRecommendation,
    });
    await rent.save();

    category.rents.push(rent._id);
    await category.save();

    res.status(201).json({
      message: "Success",
      item: rent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = {
      ...req.matchedData,
    };

    const { categoryId } = data;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        message: "Category Not Found",
      });
      return;
    }

    if (req.files && (req.files as any).length > 0) {
      data.images = (req.files as any).map((file: any) => file.filename);
    }

    const rent = await Rent.findById(id);

    if (!rent) {
      res.status(400).json({
        message: "Not Found",
      });
      return;
    }

    const oldCategoryId = rent.category;

    await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: {
        rents: id,
      },
    });
    category.rents.push(rent._id);
    await category.save();

    rent.name = data.name;
    rent.description = data.description;
    rent.category = data.categoryId;
    rent.pickUpLocation = data.pickUpLocation;
    rent.dropOffLocation = data.dropOffLocation;
    rent.fuel = data.fuel;
    rent.gearBox = data.gearBox;
    rent.capacity = data.capacity;
    rent.price = data.price;
    rent.discount = data.discount;
    if (data.images) rent.images = data.images;
    if (data.showInRecommendation !== undefined)
      rent.showInRecommendation = data.showInRecommendation;

    await rent.save();

    res.json({
      message: "Success",
      item: rent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const rent = await Rent.findByIdAndDelete(id);

    if (!rent) {
      res.status(404).json({
        message: "Not Found",
      });
      return;
    }

    if (rent.category) {
      await Category.findByIdAndUpdate(rent.category, {
        $pull: { rents: id },
      });
    }

    res.json({
      message: "Success",
      item: rent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

export default {
  getAll,
  getById,
  create,
  edit,
  remove,
};
