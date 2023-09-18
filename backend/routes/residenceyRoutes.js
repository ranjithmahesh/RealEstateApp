import {
  createresidencey,
  getAllResidencies,
  getResidencies,
} from "../controllers/residenceycontroller.js";
import express from "express";

const router = express.Router();
router.post("/create", createresidencey);
router.post("/residencey/:id", getResidencies);

router.get("/allResidencies", getAllResidencies);

export { router as residenceyRoutes };
