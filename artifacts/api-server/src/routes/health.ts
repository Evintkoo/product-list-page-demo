import { Router, type IRouter } from "express";
import {
  HealthCheckLegacyResponse,
  HealthCheckResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/health", (_req, res) => {
  const data = HealthCheckLegacyResponse.parse({ status: "ok" });
  res.json(data);
});

export default router;
