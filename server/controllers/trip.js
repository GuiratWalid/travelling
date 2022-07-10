import express from 'express';
import TripModel from '../models/trip.js';


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
    try {
        const trips = await TripModel.find();
        res.status(201).json(trips);
    }
    catch (err) {
        res.status(404).json({ message: 'Something went wrong' });
    }
};