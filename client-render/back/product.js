const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    companyContractAddress: { type: String, required: true },
    productId: { type: Number, required: true, unique: true },
    manufactureId: { type: String, required: true },
    productName: { type: String, required: true },
    productBrand: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);
