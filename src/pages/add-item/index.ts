import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.render("add-item/view", { values: {} });
});

router.post("/", (req, res) => {
  const values = {
    title: typeof req.body.title === "string" ? req.body.title : "",
    details: typeof req.body.details === "string" ? req.body.details : ""
  };

  res.render("add-item/view", { values });
});

export default router;
