const app = require("./app");

const PORT = process.env.PORT || 3333;

app.listen(+PORT, function () {
  console.log("Started http://localhost:3333/");
});
