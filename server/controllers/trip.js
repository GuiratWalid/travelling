import TripModel from '../models/trip.js';
import mongoose from 'mongoose';


export const createTrip = async (req, res) => {
    const trip = req.body;
    const newTrip = new TripModel({
        ...trip,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });
    try {
        await newTrip.save();
        res.status(201).json(newTrip);
    }
    catch (err) {
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const getTrips = async (req, res) => {
    const { page } = req.query;
    try {
        // const trips = await TripModel.find();
        // res.status(201).json(trips);
        const limit = 6;
        const startIndex = (Number(page) - 1) * limit;
        const total = await TripModel.countDocuments({});
        const trips = await TripModel.find().limit(limit).skip(startIndex);
        res.status(201).json({
            data: trips,
            currentPage: Number(page),
            totalTrips: total,
            numberOfPages: Math.ceil(total / limit),
        });
    }
    catch (err) {
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const getTrip = async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await TripModel.findById(id);
        res.status(201).json(trip);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const getTripsByUser = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "User doesn't exist" });
        const userTrips = await TripModel.find({ creator: id });
        res.status(201).json(userTrips);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const deleteTrip = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: `No trip exist with id: ${id}` });
        await TripModel.findByIdAndRemove(id);
        res.status(201).json({ message: 'Trip deleted successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: `No trip exist with id: ${id}` });
        const updatedTrip = {
            title,
            description,
            creator,
            imageFile,
            tags,
            _id: id,
        };
        await TripModel.findByIdAndUpdate(id, updatedTrip, { new: true });
        res.status(201).json(updatedTrip);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const getTripsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const title = new RegExp(searchQuery, "i");
        const trips = await TripModel.find({ title });
        res.status(201).json(trips);
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Something went wrong' });
    }
};

export const getTripsByTag = async (req, res) => {
    const { tag } = req.params;
    try {
        const trips = await TripModel.find({ tags: { $in: tag } });
        res.status(201).json(trips);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const getRelatedTrips = async (req, res) => {
    const { tags } = req.body;
    try {
        const trips = await TripModel.find({ tags: { $in: tags } });
        res.status(201).json(trips);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Something went wrong' });
    }
};

export const likeTrip = async (req, res) => {
    const { id } = req.params;
    try {
        if (!req.userId)
            return res.status(400).json({ message: 'User is not authenticated' })
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: `No trip exist with id: ${id}` });
        const trip = await TripModel.findById(id);
        const index = trip.likes.findIndex(id => id === String(req.userId));
        if (index === -1)
            trip.likes.push(req.userId);
        else
            trip.likes = trip.likes.filter(id => id !== String(req.userId));
        const updatedTrip = await TripModel.findByIdAndUpdate(id, trip, { new: true });
        return res.status(201).json(updatedTrip);
    }
    catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Something went wrong' });
    }
};