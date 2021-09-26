import express from "express";
import { createServer, Server } from "http";
import controller from "./controller";
import { initialize } from "koalanlp/Util";
import Database from "./config/database";

(async () => {
  Database.sync();

  await initialize({
    packages: { KMR: "2.0.4", KKMA: "2.0.4" },
    verbose: true,
  });
  const app = express();

  app.use(controller);
  const server = createServer(app);
  server.listen(process.env.PORT || 5000);
})();
