import { Application } from "express";

import UrlRoutes from "./url-routes";

export default (app: Application) => {
  app.use("/v1/urls", UrlRoutes);
};
