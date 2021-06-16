const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const HttpError = require("./models/Http-Error");

const app = express();

/** Connect DB */
connectDB();

/** Middleware */
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/images", express.static(path.join("uploads", "images")));

/** Define routes */
app.use("/api/accounts", require("./routes/accounts"));
app.use("/api/income", require("./routes/income"));
app.use("/api/token", require("./routes/token"));
app.use("/api/users", require("./routes/users"));

/** Error Handling */
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res._headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

/** File error handling - deletes the file on error */
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

/** Serve static assets in production */
if(process.env.NODE_ENV === 'production') {
  /** Set static folder */
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
