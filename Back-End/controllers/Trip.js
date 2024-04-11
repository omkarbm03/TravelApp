const Trip = require("../models/Trip");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const pdfKit = require("pdfkit");

// Controller function to create a new trip
exports.createTrip = async (req, res, next) => {
  console.log(req.body);
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

// Controller function to get a single trip by ID
exports.getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate("placesToVisit")
      .populate("tripCreator")
      .populate("collaborators");
    if (!trip) {
      return next(new ErrorResponse("No trip found !", 404));
    }
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

// Controller function to update a trip by ID
exports.updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) {
      return next(new ErrorResponse("No trip found !", 404));
    }
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

// Controller function to delete a trip by ID
exports.deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      return next(new ErrorResponse("No trip found !", 404));
    }
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Controller function to get all trips for a current user
exports.getAllTripsForCurrentUser = async (req, res, next) => {
  const userId = req.user.id; // Assuming you have access to the user's ID through authentication

  try {
    const trips = await Trip.find({ tripCreator: userId })
      .populate("placesToVisit")
      .populate("tripCreator")
      .populate("collaborators");
    if (!trips) {
      return next(new ErrorResponse("No trips found !", 404));
    }
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};

// Controller function to find all trips where a person is added as a collaborator
exports.getTripsByCollaborator = async (req, res, next) => {
  try {
    const collaboratorId = req.user.id;

    // Find trips where any of the collaboratorIds exist in the collaborators array
    const trips = await Trip.find({ collaborators: collaboratorId })
      .populate("placesToVisit")
      .populate("tripCreator")
      .populate("collaborators");

    if (!trips || trips == []) {
      return next(new ErrorResponse("No trips found !", 404));
    }

    res.status(200).json(trips);
  } catch (error) {
    next(error);
  }
};

// Function to download trip data as PDF for a single trip
exports.downloadTripDataAsPDF = async (req, res) => {
  try {
    // Retrieve the trip ID from request parameters
    const tripId = req.params.tripId;

    // Query the database to find the trip by its ID
    const trip = await Trip.findById(tripId).populate("placesToVisit");

    // If trip is not found, return an error response
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Create a new PDF document
    const doc = new pdfKit();

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="trip_data.pdf"'
    );

    // Pipe PDF document to response stream
    doc.pipe(res);

    // Add trip data to PDF
    doc.fontSize(16).text(`Trip Information`, { underline: true });
    doc.fontSize(12).text(`Budget: ${trip.budget}`);
    doc.fontSize(12).text(`Trip Date: ${trip.tripDate}`);
    doc.moveDown();

    // Add destination data to PDF
    doc.fontSize(16).text(`Destinations`, { underline: true });
    trip.placesToVisit.forEach((destination, index) => {
      doc.fontSize(12).text(`Destination ${index + 1}`);
      doc.fontSize(12).text(`Name: ${destination.Name}`);
      doc.fontSize(12).text(`City: ${destination.City}`);
      doc
        .fontSize(12)
        .text(`Time Needed To Visit: ${destination.TimeNeededToVisit} hrs`);
      doc
        .fontSize(12)
        .text(`Google Review Rating: ${destination.GoogleReviewRating}`);
      // Add more destination data as needed
      doc.moveDown();
    });

    // Finalize PDF document
    doc.end();
  } catch (error) {
    // Handle errors
    console.error("Error downloading trip data as PDF:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to add a user as a collaborator to the current trip
exports.addUserAsCollaborator = async (req, res, next) => {
  try {
    // Retrieve the trip ID from request parameters
    const tripId = req.params.tripId;

    // Retrieve the email of the user to be added as collaborator from request parameters
    const userEmail = req.query.email;

    // Search for the user with the provided email in the database
    const user = await User.findOne({ email: userEmail });

    // If user is not found, throw an error
    if (!user) {
      return next(new ErrorResponse("User Not registered", 404));
    }

    // Find the trip by its ID
    const trip = await Trip.findById(tripId);

    // If trip is not found, throw an error
    if (!trip) {
      return next(new ErrorResponse("No Trip Found", 404));
    }

    // Add the user's ID to the trip's collaborators array if not already added
    if (!trip.collaborators.includes(user._id)) {
      trip.collaborators.push(user._id);
      await trip.save();
    }

    // Send success response
    res
      .status(200)
      .json({ message: "User added as a collaborator successfully" });
  } catch (error) {
    next(error);
  }
};
