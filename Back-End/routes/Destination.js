const express = require('express');
const router = express.Router();

const { createDestination, 
        getAllDestinations, 
        getDestinationById, 
        updateDestination, 
        deleteDestination, 
        getDestinationsByParams
    } = require('../controllers/Destination');

const { protect } = require('../middleware/auth');

router.route('/createDestination').post(protect, createDestination);
router.route('/getAllDestinations').get(getAllDestinations);
router.route('/getDestinationById/:id').get(getDestinationById);
router.route('/updateDestination/:id').put(protect, updateDestination);
router.route('/deleteDestination/:id').delete(protect, deleteDestination);
router.route('/getDestinationsByParams').get(getDestinationsByParams);

module.exports = router;

