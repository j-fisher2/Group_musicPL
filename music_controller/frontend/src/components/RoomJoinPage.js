import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

export default function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };

    fetch("/api/join-room", requestOptions)
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("code",roomCode);
          navigate("/room/" + roomCode);
        } else {
          setError("Room not found");
        }
      })
      .catch((error) => {
        console.error("Error joining room:", error);
        setError("An error occurred while joining the room");
      });
  };

  return (
    <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">Join Room</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField error={error} label="Code" placeholder="Enter Room Code" value={roomCode} helperText={error} variant="outlined" onChange={handleTextFieldChange}>
          </TextField>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={roomButtonPressed}>Enter Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
  );
}