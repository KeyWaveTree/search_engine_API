import Express from "express";

const router = Express.Router();

const data = [
  {
    id: 3,
    name: "동북고",
  },
];
// req는 요청, res는 응답
router.get("/", (req, res) => res.status(200).json(data));

// :는 schoolId 변수라고 인식
router.get("/:schoolId", (req, res) => {
  // 디스트럭 처리
  const { schoolId } = req.params;
  if (!schoolId) {
    return res.status(400).json();
  }

  const schoolIdNumber = parseInt(schoolId, 10);
  //some은 하나라도 true면 true
  if (!data.some(({ id }) => id === schoolIdNumber)) {
    return res.status(404).json();
  }
  const filtered = data.filter((item) => item.id === schoolIdNumber);
  return res.status(200).json(filtered[0]);
});

export default router;
