import settings from "./src/settings.js";
import express from "express";
import router from "./src/routers/index.js";
import morgan from "morgan";

const app = express();

app.use(express.json()); // parse JSON bodies
app.use(morgan(settings.MORGAN_LOGGING_FORMAT)); // log requests

// main router
app.use("/api", router);

// start server
app.listen(settings.PORT, () => {
    console.log(`Server running on port ${settings.PORT}`);
});