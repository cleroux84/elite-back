const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const Process = require("process");
require('dotenv').config();
const corsOptions = {
    origin: Process.env.CORS_OPTIONS
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("./uploads", express.static(__dirname + './uploads'));

const db = require("./app/models");
//drop the table if already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to cleroux84 application." });
});

require("./app/routes/routes")(app);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))