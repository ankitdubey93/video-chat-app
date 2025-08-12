import React, { useState, useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

    const {socket} = useSocket();

    const [username, setUsername] = useState();
    const [roomId, setRoomId] = useState();

    const navigate = useNavigate();

    const handleRoomJoined = ({roomId}) => {
        navigate(`/room/${roomId}`)
    }



    useEffect(() => {
        socket.on("joined-room",handleRoomJoined)
    },[socket])

    const handleJoinRoom = () => {
        socket.emit('join-room',{username: username, roomId});
    }

    return (
        <div className="homepage-container">
            <div className="input-container">
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username here" />
                <input value={roomId} onChange={(e) => setRoomId(e.target.value)} type="text" placeholder="Enter room code" />
                <button onClick={handleJoinRoom}>Enter Room</button>
            </div>
        </div>
    )
}


export default Homepage;