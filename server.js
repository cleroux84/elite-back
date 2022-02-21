const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use("./uploads", express.static(__dirname + './uploads'));

const db = require("./app/models");
//drop the table if already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to cleroux84 application." });
});
require("./app/routes/tutorial.routes")(app);
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))