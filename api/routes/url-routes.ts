import { Router } from "express";

const router = Router();

import { UrlController } from "../controllers";
import { isAuthorized } from "../middlewares";

router.get("/", UrlController.findAll);
router.get("/:slug", UrlController.findOneBySlug);
router.post("/", isAuthorized, UrlController.createOne);
router.put("/:slug", isAuthorized, UrlController.updateOne);
router.delete("/:slug", isAuthorized, UrlController.deleteOne);

export default router;
