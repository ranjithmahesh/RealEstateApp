import {
  bookVisit,
  createUser,
  allBookings,
  cancleBooking,
  toFav,
  getAllFavorites,
} from "../controllers/userControler.js";
import express from "express";

const router = express.Router()
router.post("/bookVisit/:id", bookVisit);
router.post("/create", createUser);

router.post("/toFav/:rid", toFav);
router.post("/AllFav", getAllFavorites);

router.post("/allbookings", allBookings);
router.post("/removeBooking/:id", cancleBooking);

 

export { router as userRoutes}