const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const router = express.Router();

router.get('/fetch/all-list', getAllUsers);
router.get("/fetch",getUserById);

module.exports = router;
