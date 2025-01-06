require('dotenv').config(); // load env variable
require('./db'); //db connect
require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("./cors");
const routesConfig= require("./routes.config");
const helmet  = require("helmet")
const morgan = require("morgan");
const rateLimit = require('express-rate-limit');
const swagger = require("./swaggerConfig");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger, {
    swaggerOptions: {
        operationsSorter: (a, b) => {
          const order = { post: 0, get: 1, put: 2, patch: 3, delete: 4 };
          return order[a.get("method")] - order[b.get("method")];
        },
      },
    })
);

//cors
app.use(cors);
app.use((err, req, res, next) => {
    if (err instanceof Error && err.message.includes("CORS")) {
        return res.status(403).json({
            message: err.message || "CORS error occurred",
        });
    }
    next(err);
});

//rate limiter
app.set('trust proxy', true);
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 5 minutes',
    headers: true,
});
app.use(limiter);

routesConfig(app); //initialize routes;




module.exports = app;