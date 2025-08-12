const express = require("express");

const app = express();

const cors = require("cors");

const http = require("http");

const socket = require("socket.io");

const server = http.createServer(app);


const io = socket(server, {
    cors: {
        origin: "*",
        method: ["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server is running.")
});


io.on('connection', (socket) => {
    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callended");
    })

    socket.on("calluser", ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("calluser",{signal: signalData, from, name})
    })

    socket.on("answercall", () => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})


server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});








