import React, { useCallback, useEffect } from "react";
import { useSocket } from "../providers/Socket";
import {usePeer} from "../providers/Peer";




const RoomPage = () => {

    
    const {socket} = useSocket();
    const {peer, createOffer} = usePeer();

    const handleNewUserJoined = useCallback(async (data) => {
        const {username} = data;
        console.log("New user joined room", username)
        const offer = await createOffer();
        socket.emit("call-user", {username, offer});
    }, [createOffer, socket]
);


    const handleIncomingCall = useCallback((data) => {
        const {from, offer} = data; 
        console.log("Incoming call from ",from, offer );
    },[])

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
        socket.on("incoming-call", handleIncomingCall);

        return () => {
            socket.off("user-joined",handleNewUserJoined);
            socket.off("incoming-call", handleIncomingCall);
        }
    }, [handleIncomingCall, handleNewUserJoined, socket])

    return (
        <div>
            Welcome to room
            </div>
    )
}


export default RoomPage;