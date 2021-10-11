const express = require("express");
const pool = require("./db");

const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({ useTempFiles: true }));


const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const dashboardRouter = require("./routes/dashboard");
app.use("/user", dashboardRouter);

const apiRouter = require("./routes/jobApi");
app.use("/api", apiRouter);

// connect to psql
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to the Database!");
  });
});

const PORT = process.env.PORT || 2020;
app.listen(PORT, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Server is listening on port ${PORT}`);
});
