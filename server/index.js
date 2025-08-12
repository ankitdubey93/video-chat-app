const express = require("express");
const bodyParser = require("body-parser");
const {Server} = require("socket.io");

const io = new Server();

const app = express();

app.use(bodyParser.json());

io.on("connection", (socket) => {

})


app.listen(8000, () => {
    console.log("HTTP server running at port 8000.")
})

io.listen(8001);