import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number
}, {timestamps: true})

const Products = mongoose.model("Products", productSchema)
export default Products