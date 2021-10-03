import express from "express";
import SchoolController from "./school.controller"
import SearchController from "./search.controller"

const router = express.Router();

//처리는 use가 한다.
router.use("/school", SchoolController);
router.use("/search", SearchController);

export default router;
