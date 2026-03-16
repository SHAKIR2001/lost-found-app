import express from "express";
import {createItem, getItems, getItemById, updateItem, deleteItem} from "../controllers/itemController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create item with optional image upload (form-data key: 'image')
router.post("/", upload.single("image"), createItem);

router.get("/", getItems);

router.get("/:id", getItemById);

// Allow updating item and optionally replacing image
router.put("/:id", upload.single("image"), updateItem);

router.delete("/:id", deleteItem);

export default router;