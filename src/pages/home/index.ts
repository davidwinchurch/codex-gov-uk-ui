import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.render("home/view");
});

export default router;
