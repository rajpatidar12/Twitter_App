import express from "express";
import v1Router from "../routes/v1/v1Routes.js";
import v2Router from "../routes/v2/v2Routes.js";
const router = express.Router();
router.use("/v1", v1Router);
router.use("/v2", v2Router);
export default router;
