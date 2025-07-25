const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("../Routers/user.router.cjs");
const productRouter = require("../Routers/product.router.cjs");

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));  // for cross origin conflict resolution

app.use(express.json({
    limit: "16kb",
}));  // to access json data

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
})); // for encoded url for example %suketu%op like this or suketu+op like this in url

app.use(express.static("public"));
// for accessing the cookie from the client browser and performing crud operation on it  

app.use("/api/v1/users", authRouter);
app.use("/api/v1/products", productRouter);
// For handling that is not belong to any rout that we have defined for our application.
app.all("*", (req, res, next) => {
    res.status(404).send("Page not found.");
});

// for handlong the global error
process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled rejection occurred! shutting down in 2 seconds...');
    app.close(() => {
        setTimeout(() => {
            process.exit(1);
        }, 2000);
    })
});

module.exports = app;