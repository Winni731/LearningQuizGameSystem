import React, { useEffect } from 'react'
import '../styles/Result.css'
import { Link } from 'react-router-dom'
import ResultTable from './_old_ResultTable'
import { useDispatch, useSelector } from 'react-redux'
import { resetResultAction } from '../../redux/result_reducer'
import { resetAllAction } from '../../redux/question_reducer'
import { attemptsNum, earnPointsNum, flagResult} from '../../helper/helper'


function Result() {

    const dispatch = useDispatch()
    const { questions : {queue, answers}, result : {result, userId} } = useSelector(state => state)
    
    useEffect(() => {
        console.log(flag)
    })
    
    const totalPoints = queue.length * 10;
    const attempts = attemptsNum(result);
    const earnPoints = earnPointsNum(result, answers, 10) // 10 points for each correct answer
    const flag = flagResult(totalPoints, earnPoints)
    
    function onRestart() {
       dispatch(resetAllAction())
       dispatch(resetResultAction())
    }
    
  return (
    <div className='container'>
        <h1 className='title text-light'>Game / Quiz</h1>

        <div className='result flex-center'>
            <div className='flex'>
                <span>Username</span>
                <span className='bold'>Daily Tuition</span>
            </div>
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>{attempts || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Earn Points : </span>
                <span className='bold'>{earnPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                <span className='bold' style={{color: `${flag ? "green" : "red"}`}}>{flag ? "Passed" : "Failed"}</span>
            </div>
        </div>

        <div className='start'>
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        {/* <div className='container'>
            <ResultTable></ResultTable>
        </div> */}
    </div>
  )
}
