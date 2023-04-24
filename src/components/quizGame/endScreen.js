import React from 'react';
import "./endScreen.css"
import { motion } from "framer-motion";
import resultIcon from "../../assets/resultIcon.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from '@mui/material';

function EndStat({label, value}) {
    return (
        <div className="endScreen__stat">
            <div className="endScreen__stat_label">
                {label}
            </div>
            <div className="endScreen__stat_value">
                {value}
            </div>
        </div>
    )
}

const EndScreen = ({ score, fullScore, onRetryClick, playTime }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const minutes = `${Math.floor(playTime / 60)}`.padStart(2, "0");
    const seconds = `${Math.floor(playTime % 60)}`.padStart(2, "0");
    const timeString = `${minutes}:${seconds}`;
    console.log("playTime: "+playTime)

    let result = score - fullScore/2;

  return (
    <div className="endScreen">
      {result>=0 ? <h1 style={{color: "green"}}>Congrats, you pass!</h1> : <h1 style={{color: "red"}}>Sorry, you fail</h1>}
      <motion.div className="endScreen__trophy"
                  initial={{rotate: 0, originX: 0.5, originY: 0.5}}
                  animate={{ rotate: 360}}
                  transition={{type: "spring", damping: 10, stiffness: 100}}>
                <img src={resultIcon} alt="resultIcon" style={{width: "150px", height: "150px"}}/>
                  </motion.div>
      <EndStat label="Score" value={`${score} / ${fullScore}`} />
      <EndStat label="Complete Time" value={timeString} />
      {/* <EndStat label="Best Score" value={bestScore} /> */}
      <Button className="endScreen__button" variant="outlined" onClick={onRetryClick}>Retry ?</Button>
      <Button className="endScreen__button" 
              variant="outlined" 
              onClick={() => navigate("/user/dashboard")}
              style={{marginLeft: "20px"}}>Home➡</Button>
    </div>
  )
}

export default EndScreen
