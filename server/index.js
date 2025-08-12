const express = require("express");
const bodyParser = require("body-parser");
const {Server} = require("socket.io");

const io = new Server(
    {
        cors: true,
    }
);

const app = express();

app.use(bodyParser.json());

const usernameToSocketMapping = new Map();
const socketToUsernameMapping = new Map();

io.on("connection", (socket) => {
    console.log("New Connection")
    socket.on("join-room", (data) => {
        const {roomId, username} = data;
        console.log("User", username, "Joined room", roomId)
        usernameToSocketMapping.set(username,socket.id);
        socketToUsernameMapping.set(socket.id, username);
        socket.join(roomId);
        socket.emit("joined-room", {roomId});
        socket.broadcast.to(roomId).emit("user-joined",{username});
    });

    socket.on("call-user", (data) => {
        const {username, offer} = data;
        const fromUsername = socketToUsernameMapping.get(socket.id);
        const socketId = usernameToSocketMapping.get(username);
        socket.to(socketId).emit("incoming-call",{from: fromUsername, offer});
    })

})


app.listen(8000, () => {
    console.log("HTTP server running at port 8000.")
})

io.listen(8001);