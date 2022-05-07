import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteUser, authActions} from '../features/authSlice.js'
import {FaUserSlash, FaSignOutAlt} from 'react-icons/fa'

function Header() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const logoutFn = ( ) => {
        localStorage.removeItem("auth")
        navigate('/login')
    }

    const deleteUserFn = () => {
        dispatch(authActions.reset())
        dispatch(deleteUser())
    }

    return (
        <div className='header'>
            <h1 id='logo'>TaskTracker</h1>
            <div onClick={logoutFn} className='header-option'>
                <FaSignOutAlt/>
                <div className='option-label'>Log Out</div>
            </div>
            <div onClick={deleteUserFn} className='header-option'>
                <FaUserSlash />
                <div className='option-label'>Delete Account</div>
            </div>
        </div>
    )
}

export default Header