import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import data from '../database/data'
import { useFetchQuestion } from '../../hooks/FetchQuestion'
import { updateResultAction } from '../../redux/result_reducer'
import { updateResult } from '../../hooks/setResult'
import Timer from '../Timer'


function Questions({ onChecked }) {

        const [checked, setChecked] = useState(undefined)
        const [{ isLoading, apiData, serverError }, setGetData] = useFetchQuestion()
        // const question = data[0]

        const questions = useSelector(state => state.questions.queue[state.questions.trace])
        const { trace } = useSelector(state => state.questions)
        const result = useSelector(state => state.result.result)
        const timeLeft = useSelector(state => state.result.timeLeft)
        const dispatch = useDispatch()

        const exportTimer  = Timer
    
        console.log(timeLeft)
        console.log(exportTimer)

    useEffect(() => {
        console.log(isLoading)
        dispatch(updateResult({ trace, checked }))
    }, [checked])

    function onSelect(i) {
        // setChecked(true)
        console.log(i)
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked }))
    }

    if (isLoading) {
        return <h3 className='text-light'>isLoading</h3>
    }
    if (serverError) {
        return <h3 className='text-light'>serverError</h3>
    }


  return (
    <div className='questions'>
        <Timer />
        <h2 className='text-light'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={ () => onSelect(i)}
                        />
                    
                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                    </li>
                
                ))
            }
        </ul>

    </div>
  )
}
