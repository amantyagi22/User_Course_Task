require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//Routes
const userRoute = require("./routes/user");
const courseRouter = require("./routes/course");
const app = express();
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log(`Connected to MONGODB`);
  })
  .catch((e) => {
    console.log(e);
  });

//Middlewares
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/course", courseRouter);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log(`Backend Server is running at ${port}`);
});
