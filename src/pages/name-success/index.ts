import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name : "";
  res.render("name-success/view", { name });
});

export default router;
