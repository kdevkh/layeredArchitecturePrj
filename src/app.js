import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import LogMiddleware from "./middlewares/log.middleware.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";

const app = express();
const port = 3000;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(ErrorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
