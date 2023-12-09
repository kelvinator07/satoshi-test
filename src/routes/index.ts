import { Application } from "express";
import coinsRoutes from "./coin.routes";
import homeRoutes from "./home.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/v1", homeRoutes);
    app.use("/api/v1/coins", coinsRoutes);
  }
}
