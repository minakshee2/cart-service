const express = require("express");
const env = require("./config/config.js");
const cartRouter = require("./src/routes/cartroute.js");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200", // <- allow Angular dev server
  })
);

app.get("/health", (req, res) => {
  console.log("Health check");

  res.send("Healthy");
});

app.use("/api/v1/", cartRouter);

//export default app;

app.listen(env.PORT, () =>
  console.log(`Server connection successful on port ${env.PORT}`)
);

module.exports = app;
