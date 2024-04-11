const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth');
const {uploadMiddleware} = require('../middleware/fileHandler')

const {uploadDocument, getDocumentBySystemFilename, getDocumentNamesForCurrentUser} = require('../controllers/Document');

router.route('/uploadDocument').post(protect, uploadMiddleware, uploadDocument);
router.route('/fetchDocument/:systemFilename').get(protect, getDocumentBySystemFilename);
router.route('/getDocsNamesForUser').get(protect, getDocumentNamesForCurrentUser);

module.exports = router;