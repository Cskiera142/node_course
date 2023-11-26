const dotenv = require("dotenv");
const index = require("./index");

dotenv.config({ path: "./config.env" });

// console.log(process.env);

const port = process.env.PORT || 3500;
index.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
