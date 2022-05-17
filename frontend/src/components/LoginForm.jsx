import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {postForm} from '../features/authSlice.js'
import Message from './Message.jsx'
import {FaUser} from 'react-icons/fa'

function LoginForm() {
    const [formState, setFormState] = useState({
        name: "",
        password: "",
        status: "Login",
        isError:false,
        message: "",
    })

    const dispatch = useDispatch()

    const authState = useSelector(state => state.auth)

    useEffect(()=>{
        if(authState.isError){
            setFormState(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    message: authState.message,
                }
            })
        }
    },[authState.isError, authState.message])

    const toggleFormState = () => {
        formState.status === "Login" ? setFormState({...formState, status: "Register"}) : setFormState({...formState, status: "Login"})
    }

    const onChange = (e) => {
        setFormState({
            ...formState, [e.target.name] : e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        if(formState.name === "" || formState.password === ""){
            setFormState({
                ...formState,
                isError: true, 
                message: "fill all forms",
            })

        }else{
            const payload = {
                name: formState.name,
                password: formState.password,
                status: formState.status.toLowerCase(),
            }
    
            dispatch(postForm({payload}))
        }
    }

    return (
        <>
            <div id='login-container'>
                <FaUser style={singLogoStyle}/>
                
                <form>
                    <input className="login-input" type="text" name="name" onChange={onChange} placeholder='Insert name' />
                    <input className="login-input" type="password" name="password" onChange={onChange} placeholder='Insert password' />
                    <button id='login-submit' type='submit' onClick={submitForm}>{authState.isLoading ? <div className='spinner'></div> : formState.status}</button>
                </form>
                {formState.isError && <Message isError={true} message={formState.message}/>}
            </div>
            {
                formState.status === 'Login' ? <div id='login-register' style={linkStyle} onClick={()=>{toggleFormState()}}>create an account</div>:<div id='login-register' onClick={()=>{toggleFormState()}} style={linkStyle}>click here to login</div>
            }
        </>
    )
}

const linkStyle = {
    color: "#00f",
    cursor: "pointer",
    textAlign: "center",
}

const singLogoStyle ={
    color: "#00f",
    fontSize: "100px",
}

export default LoginForm