const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const app = express();

const corsOptions = {
    // origin: "http://localhost:8081"
    origin: "https://preprodelitecoaching42.herokuapp.com"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("./uploads", express.static(__dirname + './uploads'));

require('dotenv').config();
cloudinary.config({
    cloud_name: process.env.CLOUDINADRY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    // params: {
    //     destination: function (req, file, cb) {
    //         cb(null, './uploads/')
    //     },
    //     filename: function(req, file, cb) {
    //         cb(null, file.originalname)
    //     }
    // }
})
const parser = multer({storage})
app.post("/upload", parser.single('file'), async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'dev_setups'
        }).then(response => {
            res.send({
                message: response.secure_url
            })
        })
    } catch (err) {
        console.log(err)
    }
})

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
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`))