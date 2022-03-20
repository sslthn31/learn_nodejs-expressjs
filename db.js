const mongoose = require('mongoose');
const database = process.env.MONGO_URI || 'mongodb://user31:nFOnlCJc58ozLVRE@cluster0-shard-00-00.rujyh.mongodb.net:27017,cluster0-shard-00-01.rujyh.mongodb.net:27017,cluster0-shard-00-02.rujyh.mongodb.net:27017/blogDb?ssl=true&replicaSet=atlas-wm4uqb-shard-0&authSource=admin&retryWrites=true&w=majority'
//db password : nFOnlCJc58ozLVRE
mongoose.connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

