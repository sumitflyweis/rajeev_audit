const Category = require("../model/category");

exports.getCategory = async (req, res) => {
  try {
    // Retrieve all categories from the database
    const categories = await Category.find();

    // Send the categories as a response
    res.json(categories);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while retrieving categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to create a new category
exports.createCategory = async (req, res) => {
  try {
    // Create a new category document using the request body
    const newCategory = await Category.create(req.body);

    // Send the newly created category as a response
    res.status(201).json(newCategory);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Other controller functions for updating and deleting categories can be implemented similarly


// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    // Retrieve the category by ID from the database
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Send the category as a response
    res.json(category);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while retrieving category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    // Find the category by ID and update it with the request body
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Send the updated category as a response
    res.json(updatedCategory);
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while updating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    // Find the category by ID and delete it
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Send a success message as a response
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the execution
    console.error("Error occurred while deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
