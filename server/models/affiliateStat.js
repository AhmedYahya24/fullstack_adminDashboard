const mongoose = require("mongoose");

const affiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transactions", // ref is representing which data model it's referring to
    },
  },
  { timestamps: true }
);

/* userId is referring to User (this is what's call one to one relationship because there's only one userId per affiliateStat),
   and affiliateSales is referring to Transactions (this is what's call one to many because affiliateSales has an array so from
   one to many Transactions).  => take a look at the data model to understand
*/

const AffiliateStat = mongoose.model("affiliateStat", affiliateStatSchema);
module.exports = AffiliateStat;
