import Products from "../../model/products/product.js";

export const inputProducts = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Basic validation
    if (!title || !price || !totalStock) {
      return res
        .status(400)
        .json({ message: "Title, price, and stock are required." });
    }

    const product = new Products({
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
