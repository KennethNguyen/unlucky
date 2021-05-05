import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";

const app = express();
// dotenv.config();

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Unlucky API",
      version: "1.0.0",
      description: "A simple API that takes care of users, posts, and comments",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true })); // explorer: true will add search bar to UI
app.use(morgan("dev"));

mongoose.connect(process.env.MONGO_DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on("error", (err) => {
  console.log("Error connection to MongoDB", err);
});

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/", commentsRouter);

app.listen(process.env.PORT || 8000);
