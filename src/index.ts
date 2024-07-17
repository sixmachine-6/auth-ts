import express from "express";
import cookieSession from "cookie-session";
import { router as appRouter } from "./AppRouter";
import "./controllers/AuthController";
import "./controllers/RootController";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["kfe"] }));
app.use(appRouter);

app.listen(2000, () => {
  console.log("the server is running at port 2000");
});
