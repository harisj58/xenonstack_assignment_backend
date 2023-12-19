import express from "express";
import { createConnect } from "../controllers/connectController.js";

const router = express.Router();

// create routes to handle posting connect
router.post("/create", createConnect);

export default router;
