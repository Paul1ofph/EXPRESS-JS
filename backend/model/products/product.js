import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    brand: String,
    price: { type: Number, required: true },
    salePrice: Number,
    totalStock: { type: Number, required: true },

    //  Track who created it
    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "createdBy.role", // points to Admin or SuperAdmin
        required: true,
      },
      role: {
        type: String,
        enum: ["Admin", "SuperAdmin"],
        required: true,
      },
    },

    //  Track who last edited it
    lastEditedBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "lastEditedBy.role", // points to Admin or SuperAdmin
      },
      role: {
        type: String,
        enum: ["Admin", "SuperAdmin"],
      },
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productSchema);
export default Products;
