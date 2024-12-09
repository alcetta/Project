require("dotenv").config();
const bodyParser = require("body-parser");
const Express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require("./routes");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API Documentation",
      version: "1.0.0",
      description:
        "A simle application to serve a blog where user add article and other comments",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = Express();

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.send("Application Started");
});

app.use(router);

app.listen(process.env.PORT || 3000, function () {
  console.log("App Started");
});

module.exports = app;
