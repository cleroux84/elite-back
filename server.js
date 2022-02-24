const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const corsOptions = {
    // origin: "http://localhost:8081"
    origin: "https://preprodelitecoaching42.herokuapp.com"
};

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
// app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
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

const { cloudinary } = require('utils/cloudinary.js');
app.post('/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.json({ msg: 'yaya' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

require("./app/routes/tutorial.routes")(app);
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))