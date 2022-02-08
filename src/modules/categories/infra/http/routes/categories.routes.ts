import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController";
import ProductsByCategoryController from "../controllers/ProductsByCategoryController";

const routes = Router();

routes.post("/", CategoriesController.create);

routes.get("/", CategoriesController.list);

routes.get("/:id", CategoriesController.findById);

routes.get("/:id/produtos", ProductsByCategoryController.findById);

routes.put("/:id", CategoriesController.update);

routes.delete("/:id", CategoriesController.delete);

export default routes;
