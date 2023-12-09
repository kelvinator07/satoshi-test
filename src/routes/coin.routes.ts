import { Router } from "express";
import CoinController from "../controllers/coin.controller";

class CoinRoutes {
  router = Router();
  controller = new CoinController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Retrieve all Coins
    this.router.get("/", this.controller.findAll);

    // Retrieve a single Coin by id
    this.router.get("/:id", this.controller.findOne);
  }
}

export default new CoinRoutes().router;
