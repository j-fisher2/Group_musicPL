import React, { useEffect, useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import {Grid,Button,Typography} from "@material-ui/core";


export default function Room() {
  const { roomCode } = useParams();
  const navigate=useNavigate();
  const [roomData, setRoomData] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    roomCode: roomCode,
    showSettings:false,
  });

  function getRoomDetails() {
    fetch('/api/get-room'+'?code='+roomCode)
      .then((res) => {
        if(!res.ok){
          navigate("/");
        }
        return res.json();})
      .then((data) => {
        setRoomData({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
          roomCode: roomCode,
        });
      });
  }
  
  function leaveButtonPressed(){
    const request={
      method:"POST",
      headers:{"Content-Type":"application/json"},
    }
    fetch('/api/leave-room',request).then((res)=>{
      localStorage.removeItem("code");
      navigate("/");
    })
  }
  const updateShowSettings=(value)=>{
    setRoomData({
      votesToSkip:roomData.votesToSkip,
      guestCanPause:roomData.guestCanPause,
      isHost:roomData.isHost,
      roomCode:roomData.roomCode,
      showSettings:value,
    })
  }

  const renderSettingsButton=()=>{
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={()=>updateShowSettings(true)}>Settings</Button>
      </Grid>
    );

  }

  useEffect(() => {
    getRoomDetails();
  }, [roomCode]); 

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h4">
          Votes: {roomData.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h4">
          Guest Can Pause: {roomData.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h4">
          Host: {roomData.isHost.toString()}
        </Typography>
      </Grid>
      {roomData.isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
      </Grid>
    </Grid>
  );
}

