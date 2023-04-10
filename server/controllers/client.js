const Product = require("../models/product");
const User = require("../models/user");
const ProductStat = require("../models/productState");
const Transactions = require("../models/transactions");

const getCountryIso3 = require("country-iso-2-to-3");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        return {
          ...product._doc, // because the behavior of mongodb we add ._doc to get the product information
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  // we will apply server side pagination on transactions documents

  try {
    // sort should look like this: { "field": "userId", "sort": "desc" }
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort look like this: { userId: -1 }
    const sortGenerator = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? sortGenerator() : {};

    const transactions = await Transactions.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transactions.countDocuments();

    // const total = await Transactions.countDocuments(
    //   {
    //     name: { $regex: search, $options: "i" },
    //   }
    // );

    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getGeography = async (req, res) => {
  try {
    const users = await User.find();

    // we need to convert the country ID from 2 chars. to three chars.
    const mappedLocation = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc; // return the object
    }, {});

    const formattedLocation = Object.entries(mappedLocation).map(
      ([country, count]) => ({ id: country, value: count })
    );

    res.status(200).json(formattedLocation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
