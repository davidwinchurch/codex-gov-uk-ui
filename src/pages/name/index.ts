import { Router } from "express";
import { nameSchema } from "./schema.js";

const router = Router();

router.get("/", (_req, res) => {
  res.render("name/view", { values: {}, errors: [] });
});

router.post("/", (req, res) => {
  const result = nameSchema.safeParse({
    fullName: req.body?.fullName
  });

  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "Enter a full name";

    return res.render("name/view", {
      values: { fullName: req.body?.fullName ?? "" },
      errors: [
        {
          text: message,
          href: "#fullName"
        }
      ]
    });
  }

  const redirectName = encodeURIComponent(result.data.fullName);
  return res.redirect(`/name/success?name=${redirectName}`);
});

export default router;
