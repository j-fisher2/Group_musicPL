import React, { useEffect, useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function HomePage() {

  function checkExistingRoom(){
    const code=localStorage.getItem("code");
    if(code){
      
    }
  }
  useEffect(()=>{
    checkExistingRoom();
  })

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Grid container spacing={3}>
              <Grid item xs={12} align="center">
                <Typography variant="h3" compact="h3">House Party</Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                  <Button color="primary" to="/join" component={Link}>Join a Room</Button>
                  <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          }
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}
