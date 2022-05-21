import { useRef} from 'react'
import { FaUserSlash, FaSignOutAlt } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { deleteUser, authActions} from '../features/authSlice.js'
import { clearTasks } from '../features/taskSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'

function Options() {

    const options = useRef()

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const deleteUserFn = () => {
        dispatch(authActions.reset())
        dispatch(deleteUser())
    }

    const clearTasksFn = () => {
        dispatch(clearTasks())
    }

    const logoutFn = () => {
        localStorage.removeItem("auth")
        navigate('/login')
    }

    const openOption = () => {
        options.current.classList.add('active')
    }

    const closeOption = () => {
        options.current.classList.remove('active')
    }

    return (
        <>
            <div id='header-option' onClick={openOption}>
                <FaBars/>
            </div>

            <div id='options' autoFocus ref={options} >
                <div onClick={logoutFn} className='option'>
                    <FaSignOutAlt/>
                    <div className='option-label'>Log Out</div>
                </div>
                <div onClick={clearTasksFn} className='option'>
                    <GiCancel />
                    <div className='option-label'>Clear Tasks</div>
                </div>
                <div onClick={deleteUserFn} className='option'>
                    <FaUserSlash />
                    <div className='option-label'>Delete Account</div>
                </div>
                <div onClick={closeOption} className='option'>
                    <div className='option-label' >x</div>
                </div>
            </div>
        </>
    )
}

export default Options