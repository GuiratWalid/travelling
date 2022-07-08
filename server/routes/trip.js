import express from "express";

import { createTrip, getTrips } from "../controllers/trip.js";


const router = express.Router();

router.post("/", createTrip);

router.get("/", getTrips);


export default router;