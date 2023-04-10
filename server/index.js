const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const clientRoutes = require("./routes/client");
const generalRoutes = require("./routes/general");
const managementRoutes = require("./routes/management");
const salesRoutes = require("./routes/sales");

// data imports
const User = require("./models/user");
const Product = require("./models/product");
const ProductStat = require("./models/productState");
const Transactions = require("./models/transactions");
const OverallStat = require("./models/overallStat");
const AffiliateStat = require("./models/affiliateStat");
const {
  dataUser,
  dataProduct,
  dataProductState,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} = require("./data");

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* Only add data one time */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // Transactions.insertMany(dataTransaction);
    // ProductStat.insertMany(dataProductState);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((err) => console.error(`${err} did not connect`));
