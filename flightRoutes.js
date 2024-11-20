const express = require('express');
const Flight = require('../models/Flight');
const router = express.Router();

// Create a new flight
router.post('/flights', async (req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.status(201).send(flight);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all flights
router.get('/flights', async (req, res) => {
    try {
        const flights = await Flight.find({});
        res.status(200).send(flights);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a flight
router.patch('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!flight) {
            return res.status(404).send();
        }
        res.status(200).send(flight);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a flight
router.delete('/flights/:id', async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send();
        }
        await flight.remove();
        res.status(200).send(flight);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
