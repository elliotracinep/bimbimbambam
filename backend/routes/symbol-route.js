import express from "express";
import { check } from "express-validator";
import symbolController from "../controllers/symbol-controller.js";
import checkAuth from "../middleware/check-auth.js";

const symbolRoutes = express.Router();

symbolRoutes.get("/", symbolController.getSymbols);
symbolRoutes.get("/:symbolID", symbolController.getSymbolById);
symbolRoutes.patch(
  "/:symbolID",
  checkAuth,
  [
    check("name").not().isEmpty(),
    check("image").not().isEmpty(),
  ],
  symbolController.updateSymbol,
);
symbolRoutes.delete("/:symbolID", checkAuth, symbolController.deleteSymbol);
symbolRoutes.post(
  "/",
  checkAuth,
  symbolController.createSymbol,
);

export default symbolRoutes;
