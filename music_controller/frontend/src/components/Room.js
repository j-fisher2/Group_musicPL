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

  function getRoomDetails() {
    fetch('/api/get-room'+'?code='+roomCode)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRoomData({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
          roomCode: roomCode,
        });
      });
  }

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]); 

  return (
    <div className="center">
      <h1>{roomCode}</h1>
      <h1>{roomData.votesToSkip}</h1>
      <h1>{roomData.isHost.toString()}</h1>
    </div>
  );
}

