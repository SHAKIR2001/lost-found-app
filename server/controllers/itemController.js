import Item from "../models/Item.js";

// CREATE ITEM
export const createItem = async (req, res) => {

  try {

    // determine uploaded image URL from multer/cloudinary file object
    const imageUrl = req.file
      ? (req.file.path || req.file.filename || req.file.secure_url || req.file.url || "")
      : "";

    const item = new Item({
      ...req.body,
      image: imageUrl
    });

    const savedItem = await item.save();

    res.status(201).json(savedItem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// GET ALL ITEMS
export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE ITEM
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE ITEM
export const updateItem = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.path || req.file.filename || req.file.secure_url || req.file.url || updates.image;
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE ITEM
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};