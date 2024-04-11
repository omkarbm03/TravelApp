const express = require('express');
const router = express.Router();

const { createTrip,
        getTripById,
        updateTrip,
        deleteTrip,
        getAllTripsForCurrentUser,
        getTripsByCollaborator,
        downloadTripDataAsPDF,
        addUserAsCollaborator
    } = require('../controllers/Trip');

const { protect } = require('../middleware/auth');

router.route('/createTrip').post(protect, createTrip);
router.route('/getTripById/:id').get(protect, getTripById);
router.route('/updateTrip/:id').put(protect, updateTrip);
router.route('/deleteTrip/:id').delete(protect, deleteTrip);
router.route('/getAllTripsForCurrentUser').get(protect, getAllTripsForCurrentUser);
router.route('/getTripsByCollaborator').get(protect, getTripsByCollaborator);
router.route('/downloadTripDataAsPDF/:tripId').get(protect, downloadTripDataAsPDF);
router.route('/addUserAsCollaborator/:tripId').post(protect, addUserAsCollaborator);
module.exports = router;

