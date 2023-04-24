import React, { useEffect, useState } from 'react'
import Questions from './_old_Questions'
import { useSelector, useDispatch } from 'react-redux'
import { moveNextQuestion, movePrevQuestion } from '../../hooks/FetchQuestion';
import { PushAnswer } from '../../hooks/setResult';
import { Navigate } from 'react-router-dom';

function Game() {

    const [check, setChecked] = useState(undefined)
    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(result)
    })

    function onPrev() {
        if ( trace > 0 ) {
            console.log('On prev click')
            dispatch(movePrevQuestion())
        }
    }

    function onNext() {
        if ( trace < queue.length ) {
            console.log('On next click')
            dispatch(moveNextQuestion())

            if (result.length <= trace ) {
                dispatch(PushAnswer(check))
            }
        }

        setChecked(undefined)
    }

    function onChecked(check) {
        console.log(check)
        setChecked(check)
    }

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>Game / Quiz</h1>

        <Questions onChecked={onChecked}/>

        <div className='grid'>
            { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> : <div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>
    </div>
  )
}
