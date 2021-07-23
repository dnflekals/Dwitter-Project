import express from "express";
import tweetRouter from "./router/tweet.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://192.168.110.1:3000"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const options = {
  dotfiles: "ignore",
  etag: false,
  index: false,
  maxAge: "1d",
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set("x-timestamp", Date.now());
  },
};
app.use(express.static("public", options));

app.use("/tweets", tweetRouter);

app.listen(8080);
