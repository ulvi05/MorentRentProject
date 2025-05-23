import { Request, Response } from "express";
import Review from "../mongoose/schemas/review";
import Reservation from "../mongoose/schemas/reservation";
import Rent from "../mongoose/schemas/rent";

const getAll = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().populate("author").populate("rent");

    res.status(200).json({
      message: "Reviews fetched successfully",
      items: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { reservationId, rentId, content, rating } = req.matchedData;
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    if (reservation.hasReview) {
      res.status(400).json({ message: "Reservation already has a review" });
      return;
    }

    const rent = await Rent.findById(rentId);

    if (!rent) {
      res.status(404).json({ message: "Rent not found" });
      return;
    }
    const review = await Review.create({
      author: user!._id,
      rent: rentId,
      content,
      rating,
    });

    reservation.hasReview = true;
    await reservation.save();

    rent.reviews.push(review._id);
    await rent.save();

    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.matchedData;
    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ message: "Review Not Found" });
      return;
    }
    review.status = status;
    await review.save();
    res.json({
      message: "Review status updated successfully",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getByRentId = async (req: Request, res: Response) => {
  try {
    const { rentId } = req.params;

    const reviews = await Review.find({
      rent: rentId,
      status: "approved",
    }).populate("author");

    res.status(200).json({
      message: "Reviews fetched successfully",
      items: reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  getAll,
  create,
  changeStatus,
  getByRentId,
};
