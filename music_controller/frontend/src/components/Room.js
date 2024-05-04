import React, { useEffect, useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import {Grid,Button,Typography} from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import UpdateRoomPage from "./UpdateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default function Room() {
  const { roomCode } = useParams();
  const navigate=useNavigate();
  const [roomData, setRoomData] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    roomCode: roomCode,
    showSettings:false,
    spotifyAuthenticated:false,
    song:{},
  });

  function authenticateSpotify(){
    if(!roomData.isHost||roomData.spotifyAuthenticated){
      alert("Spotify Already Connected")
      return;
    }
    fetch('/spotify/is-authenticated').then((res)=>res.json()).then((data)=>{setRoomData(prevRoomData => ({
      ...prevRoomData,
      spotifyAuthenticated: data.status,
    }));
    if(!data.status){
      fetch('/spotify/get-auth-url').then((res)=>res.json()).then((data)=>{
        console.log(data.url);
        window.location.replace(data.url);
      })
    }
  });
  }

  function getRoomDetails() {
    fetch('/api/get-room'+'?code='+roomCode)
      .then((res) => {
        if(!res.ok){
          navigate("/");
        }
        return res.json();})
      .then((data) => {
        setRoomData(prevRoomData => ({
          ...prevRoomData,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        }));
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
  const updateShowSettings = (value) => {
    setRoomData(prevRoomData => ({
      ...prevRoomData,
      showSettings: value,
    }));
  };
  
  const getCurrentSong=()=> {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setRoomData(prevRoomData => ({
          ...prevRoomData,
          song: data
        }));
      });
  }

  const renderSettingsButton=()=>{
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={()=>updateShowSettings(true)}>Settings</Button>
      </Grid>
    );

  }
  const renderSpotify=()=>{
    return (
      <Grid item xs={12} align="center">
        <Button variant="contained" onClick={authenticateSpotify}>Connect Spotify</Button>
      </Grid>
    );
  }
  const renderSettings=()=>{
    return (<Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <UpdateRoomPage />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={()=>updateShowSettings(false)}>Close</Button>
      </Grid>
    </Grid>);
  }

  useEffect(() => {
    getRoomDetails();
    const interval=setInterval(getCurrentSong,1000);

    return () => clearInterval(interval);
  }, [roomData.showSettings]); 
  
  if(roomData.showSettings){
    return renderSettings();
  }
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
      <MusicPlayer {...roomData.song}/>
      {roomData.isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
      </Grid>
      {roomData.isHost ? renderSpotify() : null}
    </Grid>
  );
}

