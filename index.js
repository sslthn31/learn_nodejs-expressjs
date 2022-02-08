const express = require('express');

const app = express();

app.use(() => {
    console.log("server sukses");
    console.log("server sukses dengan nodemon");
    console.log("test lagi deh");
})

app.listen(4000);