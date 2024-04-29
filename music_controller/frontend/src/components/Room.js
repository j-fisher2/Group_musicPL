import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const { roomCode } = useParams();
  const [roomData, setRoomData] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    roomCode: roomCode,
  });

  useEffect(() => {

  }, [roomCode]);

  return <h1>{roomCode}</h1>;
}
