const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const env = {
  MONGO_URI: process.env.MONGO_URI,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
};

export default env;
