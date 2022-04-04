const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000
const database = process.env.MONGO_URI || "mongodb://user31:nFOnlCJc58ozLVRE@cluster0-shard-00-00.rujyh.mongodb.net:27017,cluster0-shard-00-01.rujyh.mongodb.net:27017,cluster0-shard-00-02.rujyh.mongodb.net:27017/blogDb?ssl=true&replicaSet=atlas-wm4uqb-shard-0&authSource=admin&retryWrites=true&w=majority"


const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const produkRoutes = require('./src/routes/products');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true);
    } else{
        cb(null, false);
    }
}

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //agar semua website bisa akses API kita
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

//note: default browser hanya menerima get & use aja. yg laen kgk bisa



app.use('/v1/auth', authRoutes);

app.use('/v1/blog', blogRoutes);

app.use('/v1/produks', produkRoutes);

app.use((error, req, res, next) => {
    const statusnya = error.errorStatus || 500;
    const messagenya = error.message;
    const datanya = error.data
    res.status(statusnya).json({message: messagenya, data: datanya})
});

//db password : nFOnlCJc58ozLVRE
mongoose.connect(database)
.then(() => {
    app.listen(port, () => console.log("Connection Success"));
})
.catch(err => console.log(err));