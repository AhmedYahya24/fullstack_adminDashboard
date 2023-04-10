const express = require("express");

const {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} = require("../controllers/client");

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

module.exports = router;
