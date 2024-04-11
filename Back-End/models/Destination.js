const mongoose = require('mongoose');

// Define schema for travel destinations
const destinationSchema = new mongoose.Schema({
    Zone: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    EstablishmentYear: {
        type: String,
        required: true
    },
    TimeNeededToVisit: {
        type: Number,
        required: true
    },
    GoogleReviewRating: {
        type: Number,
        required: true
    },
    EntranceFeeINR: {
        type: Number,
        required: true
    },
    AirportWith50kmRadius: {
        type: String,
        required: true
    },
    WeeklyOff: {
        type: String,
        required: true
    },
    Significance: {
        type: String,
        required: true
    },
    DSLRAllowed: {
        type: String,
        required: true
    },
    NumberOfGoogleReviewsInLakhs: {
        type: Number,
        required: true
    },
    BestTimeToVisit: {
        type: String,
        required: true
    }
});

// Create model from schema
const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
