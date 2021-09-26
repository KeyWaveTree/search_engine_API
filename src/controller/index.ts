import express from "express";
import schoolController from "./school.controller";

const router = express.Router();

//처리는 use가 한다.
router.use("/schools", schoolController);

export default router;
