const express = require("express");
const env = require("./config/config.js");

const app = express();

app.listen(env.PORT, () =>
  console.log(`Server connection successful on port ${env.PORT}`)
);
