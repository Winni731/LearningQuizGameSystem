import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mui/material';
// import RobotAnimated from "../animation/robot_animated";
import background from "../assets/question1.avif";
// import "./animation.css";
// import ParticlesBackground from './ParticlesBackground';
import { useCallback } from 'react';
import Particles from "react-tsparticles";
// import {loadFull} from "https://cdn.jsdelivr.net/npm/tsparticles/+esm";
import {loadFull} from "tsparticles";
import ParticlesConfig from './config/particleConfig';
import "./textAnimation.css";
import { Contrast } from '@mui/icons-material';

const Home = () => {
    const navigate = useNavigate();
    const particlesInit = useCallback(async engine => {
      console.log(engine);
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log(container);
  }, []);

  return (

    <div>
    <Particles id="tsparticles" params={ParticlesConfig} init={particlesInit} loaded={particlesLoaded} />
    {/* <h1 style={{color: "red", textAlign:"center"}}>Quiz Time</h1> */}
  <div className="container">
  <h1 className="text">Quiz Time</h1>
  </div>
  <div className="button">
     <Button variant="contained" onClick={()=> navigate("/login")}>Login</Button>
       <Button variant="contained" style={{marginLeft: "10px"}} onClick={()=> navigate("/register")}>Register</Button>
     </div> 
    </div>
  )
}

export default Home
