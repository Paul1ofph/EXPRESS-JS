import Products from "../../model/products/product.js";

export const addProducts = async (req, res) => {
  try {
    //  Ensure only Admin or SuperAdmin can create products
    if (!req.admin && !req.superAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can add products." });
    }

    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

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
      createdBy: {
        id: req.admin?._id || req.superAdmin?._id, // who created it
        role: req.admin ? "Admin" : "SuperAdmin", // their role
      },
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
export const editProducts = async (req, res) => {
  try {
    // Ensure only Admin or SuperAdmin can edit products
    if (!req.admin && !req.superAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins can edit products." });
    }

    const { id } = req.params;
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    if (!title || !price || !totalStock) {
      return res
        .status(400)
        .json({ message: "Title, price, and stock are required." });
    }

    const product = await Products.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        // track who last edited it
        lastEditedBy: {
          id: req.admin?._id || req.superAdmin?._id,
          role: req.admin ? "Admin" : "SuperAdmin",
        },
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allproducts = await Products.find({})
      .populate("createdBy.id", "userName email")
      .populate("lastEditedBy.id", "userName email");

    res.status(200).json({
      message: "Products retrieved successfully",
      products: allproducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({
      success: false,
      message: "Error getting products",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    // Ensure only Admin or SuperAdmin can delete products
    if (!req.admin && !req.superAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Only admins and superAdmins can delete products." });
    }

    const { id } = req.params;

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Restrict admins to only delete their own products
    if (req.admin && product.createdBy.id.toString() !== req.admin._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete products you created." });
    }

    await product.deleteOne();

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
