import express from "express";

import { createTrip, getTrips } from "../controllers/trip.js";
import auth from "../middlewares/auth.js";


const router = express.Router();

router.post("/", auth, createTrip);

router.get("/", auth, getTrips);


export default router;