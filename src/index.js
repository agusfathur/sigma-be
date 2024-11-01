// @ts-nocheck
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { configDotenv } from "dotenv";
import { logger } from "./utils/logger.js";
import routes from "./routes.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.static("public"));

// Routes
app.use(routes);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
