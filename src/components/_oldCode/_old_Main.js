import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'
import { useDispatch,  useSelector } from 'react-redux'
import { setUserId } from '../../redux/result_reducer'

function Main() {

    const inputNameRef = useRef(null)
    const inputPassRef = useRef(null)
    const dispatch = useDispatch()

    const auth = useSelector(state => state.result.userId)
    const authPass = useSelector(state => state.result.password)

    const Validate = () => {
        const valid = inputNameRef.current?.value == auth && inputPassRef.current?.value == authPass
        console.log(valid)
        return valid
    }

    return (
        <div className='container'>
            <div className='top'>
            <Link className='btn' to={'register'}>Register</Link>
            <Link className='btn' to={'Game_Quiz'}>Admin</Link>
            </div>
            <h1 className='title text-light'>Learning Game Application</h1>

            <div className='login'>
                <form id="form">
                    <input ref={inputNameRef} className="userid" type="text" placeholder='UserName*' />
                </form>

                <form id="form">
                    <input ref={inputPassRef} className="password" type="text" placeholder='PassWord*' />
                </form>
            </div>

            <div className='start'>
                {/* <Link className='btn' to={'Game_Quiz'} onClick={startGame}>Start Game</Link> */}
                <Link className='btn' to={'Game_Quiz'} onClick={Validate}>Start Game</Link>
            </div>
        </div>
    )
}