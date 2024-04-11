const mongoose = require('mongoose');

// Define schema for trips
const tripSchema = new mongoose.Schema({
    placesToVisit: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    }],
    budget: {
        type: Number,
        required: true
    },
    tripCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tripDate: {
        type: Date,
        required: true
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

// Create model from schema
const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
