const Destination = require('../models/Destination');
const ErrorResponse = require("../utils/errorResponse");

// Controller function to create a new destination
exports.createDestination = async (req, res, next) => {
    try {
        const destination = new Destination(req.body);
        await destination.save();
        res.status(201).json(destination);
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

// Controller function to get all destinations
exports.getAllDestinations = async (req, res, next) => {
    try {
        const destinations = await Destination.find();
        
        if(!destinations){
            return next(new ErrorResponse("No destination data found", 404));
        }

        res.status(200).json(destinations);
    } catch (error) {
        next(error);
    }
};

// Controller function to get a single destination by ID
exports.getDestinationById = async (req, res, next) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return next(new ErrorResponse("No destination data found", 404));
        }
        res.status(200).json(destination);
    } catch (error) {
        next(error);
    }
};

// Controller function to update a destination by ID
exports.updateDestination = async (req, res, next) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!destination) {
            return next(new ErrorResponse("No destination data found", 404));
        }
        res.status(201).json(destination);
    } catch (error) {
        next(error);
    }
};

// Controller function to delete a destination by ID
exports.deleteDestination = async (req, res, next) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) {
            return next(new ErrorResponse("No destination data found", 404));
        }
        res.json({ message: 'Destination deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Controller function to get destinations based on parameters
exports.getDestinationsByParams = async (req, res, next) => {
    try {
        // Extract parameters from the request query
        const { city, type, zone, state } = req.query;

        // Build query object based on provided parameters
        const query = {};
        if (city) query.City = city;
        if (type) query.Type = type;
        if (zone) query.Zone = zone;
        if (state) query.State = state;

        // Find destinations based on the query
        const destinations = await Destination.find(query);
        if (!destinations) {
            return next(new ErrorResponse("No destination data found", 404));
        }

        res.status(200).json(destinations);
    } catch (error) {
        next(error);
    }
};

