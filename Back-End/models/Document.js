const mongoose = require('mongoose');

// Define schema for documents
const documentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    systemFilename: {
        type: String,
        unique: true,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model's ObjectId
        required: true
    },

});

// Create model from schema
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
