const express = require("express");

const { getAdmins, getUserPerformance } = require("../controllers/management");

const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

module.exports = router;
