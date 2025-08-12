import React, { useEffect } from "react";
import { useSocket } from "../providers/Socket";



const RoomPage = () => {

    const {socket} = useSocket();

    const handleNewUserJoined = (data) => {
        const {username} = data;
        console.log("New user joined room", username)
    }

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined)
    })

    return (
        <div>
            <h1>Room Page</h1>
        </div>
    )
}


export default RoomPage;