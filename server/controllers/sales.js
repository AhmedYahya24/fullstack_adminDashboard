const OverallStat = require("../models/overallStat");

exports.getSales = async (req, res) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]); // sending data in array to frontend
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
