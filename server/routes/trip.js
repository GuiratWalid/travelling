import express from "express";
import {
    createTrip,
    deleteTrip,
    getRelatedTrips,
    getTrip,
    getTrips,
    getTripsBySearch,
    getTripsByTag,
    getTripsByUser,
    likeTrip,
    updateTrip
} from "../controllers/trip.js";
import auth from "../middlewares/auth.js";


const router = express.Router();

router.post("/", auth, createTrip);

router.post("/relatedTrips", getRelatedTrips);

router.get("/", getTrips);

router.get("/search", getTripsBySearch);

router.get("/tag/:tag", getTripsByTag);

router.get("/:id", getTrip);

router.get("/userTrips/:id", auth, getTripsByUser);

router.delete("/:id", auth, deleteTrip);

router.patch("/:id", auth, updateTrip);

router.patch("/like/:id", auth, likeTrip);


export default router;