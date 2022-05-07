import React, {useEffect} from 'react'
import LoginForm from '../components/LoginForm.jsx'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function Login() {
  const navigate = useNavigate()

  const authState = useSelector(state => state.auth)
  useEffect(()=> {
    if(localStorage.getItem("auth")){
      navigate("/")
    }

  },[navigate, authState.isSuccess])
  
  return (
        <LoginForm/>
  )
}

export default Login