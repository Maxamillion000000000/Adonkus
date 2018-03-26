const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "app.js"),
  mode: 'development',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  }
}