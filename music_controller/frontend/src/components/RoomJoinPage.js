import React, { Component } from "react";
import { TextField,Button,Grid,Typography } from "@material-ui/core";
import {Link} from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      roomCode:"",
      error:false
    };
    this.handleTextFieldChange=this.handleTextFieldChange.bind(this);
    this.roomButtonPressed=this.roomButtonPressed.bind(this);
  }
  handleTextFieldChange(e){
    this.setState({
      roomCode:e.target.value
    })
  }
  roomButtonPressed(){
    const requestOptions={
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        code:this.state.roomCode
      })
    };
    fetch("/api/join-room",requestOptions).then((res)=>{
      if(res.ok){
        //redirect to room, change to functional component
      }
      else{
        this.setState({error:"Room not found"})
      }
    })
  }
  render() {
    return (
      <Grid className="center" container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" component="h4">Join Room</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField error={this.state.error} label="Code" placeholder="Enter Room Code" value={this.state.roomCode} helperText={this.state.error} variant="outlined" onChange={this.handleTextFieldChange}>
          </TextField>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={this.roomButtonPressed}>Enter Room</Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
        </Grid>
      </Grid>
    );
  }
}