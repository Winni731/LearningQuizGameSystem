import React, {useState, useRef, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { setTimeleft } from '../redux/result_reducer';


export default function Timer({ duration }) {
    const intervalRef = useRef(null);
    const [Timer, setTimer] = useState(duration)
    const [timeLeft, setTimeLeft] = useState(true)

    // const timeLeft = useSelector(state => state.result.timeLeft)

    console.log("Time left: "+Timer+timeLeft)
    // console.log(Timer)
    // console.log(typeof(Timer))
    // const dispatch = useDispatch()
    // if (Timer=="00:00:00") {
    //     dispatch(setTimeleft(false))
    // }
    // else {
    //     dispatch(setTimeleft(true))
    // }
    // console.log(Timer=="00:00:00")

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const secs = Math.floor((total/1000) % 60);
        const mins = Math.floor((total/1000/60) % 60);
        const hrs = Math.floor((total/1000*60*60) % 24);
        const days = Math.floor(total/(1000*60*60*24));
        return {
            total, days, hrs, mins, secs
        }
    }

    function startTimer(deadline) {
        let {total, days, hrs, mins, secs} = getTimeRemaining(deadline);
        if (total >=0 ) {
            setTimer(
                (hrs > 9 ? hrs : '0' + hrs) + ':' +
                (mins > 9 ? mins: '0' + mins) + ':' +
                (secs > 9 ? secs: '0' + secs)
            )
        }
        else {
            clearInterval(intervalRef.current)
        }
    }

    function clearTimer(endtime) { // 30 secs per question
        setTimer(duration);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        const id = setInterval(() => {
            startTimer(endtime);
        }, 1000)
        intervalRef.current = id;
    }

    function getDeadlineTime() {
        let deadline = new Date();
        
        deadline.setSeconds(deadline.getSeconds()+duration); // 30 secs per question
        return deadline;
    }

    useEffect(()=> {
        clearTimer(getDeadlineTime())
        return () => {
            if(intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    },[])

    // console.log(Timer)

    return (
        <div className='bold'>
            <span style={{color:`${Timer > '00:00:15' ? 'green' : 'red'}`}}>
            {Timer}
            </ span>
        </div>
    )

}
