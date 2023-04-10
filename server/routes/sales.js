const express = require("express");

const { getSales } = require("../controllers/sales");

const router = express.Router();

router.get("/sales", getSales);

module.exports = router;
