import express from "express";
import {createItem, getItems, getItemById, updateItem, deleteItem} from "../controllers/itemController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", createItem);

router.get("/", getItems);

router.get("/:id", getItemById);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

router.post("/", upload.single("image"), createItem);

export default router;