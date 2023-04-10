const mongoose = require("mongoose");
const User = require("../models/user");
const Transactions = require("../models/transactions");

exports.getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    /* aggregate in mongoose such like joins in SQL Databases => we need to grabbed the id information about the user in the user model,
       and we want a lookup in the affiliateStats information, so we want to grab from the affiliateStats data and we are going to use
       the localField of "_id", and we are going to compare it to foreign fields "userId", and we want to display this information
       as: "affiliateStats", look to the following code.
    */
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // here we are making sure to convert the id to the right format, and matching it and finding the user how has this particular _id
      {
        $lookup: {
          // lookup will allow us to grab information from the affiliateStats model or table
          from: "affiliatestats",
          localField: "_id", // current user id => because that where we running our aggregate function call
          foreignField: "userId", // userId in the affiliateStats table or model
          as: "affiliateStats", // save the information in a property called affiliateStats
        },
      },
      { $unwind: "$affiliateStats" }, // basically it's just flatten the information
    ]);

    /* userWithStats => going to get current user normally information, but also affiliateStats information,
       so we are combining those two into one using an aggregate call => this practice is petter and faster than
       previous one that we used before to get the user product.
       it's very similar to how SQL joins 
    */

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transactions.findById(id);
      })
    );

    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
