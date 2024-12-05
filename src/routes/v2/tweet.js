import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    message: "welcome to the tweet v2/route",
  });
});

router.get("/:id", (req, res) => {
  return res.json({
    message: "welcome to the tweet route",
    id: req.params.id,
  });
});
export default router;
