import express from "express";
<<<<<<< HEAD
import schoolController from "./school.controller";
import searchController from "./search.controller";
=======
import SchoolController from "./school.controller"
import SearchController from "./search.controller"
>>>>>>> 04f39d3e4f883754d1f6b23479a519b80b6de6d5

const router = express.Router();

//처리는 use가 한다.
<<<<<<< HEAD
//매칭된 부분은 삭제가 된다.
router.use("/search", searchController);
router.use("/schools", schoolController);
=======
router.use("/school", SchoolController);
router.use("/search", SearchController);
>>>>>>> 04f39d3e4f883754d1f6b23479a519b80b6de6d5

export default router;
