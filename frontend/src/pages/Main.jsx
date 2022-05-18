import {useSelector, useDispatch} from 'react-redux'
import { useEffect} from 'react'
import AddForm from '../components/AddForm'
import {getTasks} from '../features/taskSlice'
import Task from '../components/Task.jsx'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import BackToTop from '../components/BackToTop'

function Main() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const state = useSelector((state) => {return state})

    useEffect(()=>{
            if(localStorage.getItem("auth")){
                dispatch(getTasks())
            }else{
                navigate('/login')
            }
    },[dispatch,navigate,state.auth.isDelete])

    return (
        <>
            <Header/>
            <AddForm/>
            { state.task.tasks.length !== 0 &&
            <div id='tasks-container'>
                {
                    state.task.tasks.map(task => {
                        return(
                            <Task key={task._id} _id={task._id} title={task.title} discription={task.discription}/>
                        )
                    })
                }
            </div>
            }
            <BackToTop/>
        </>
    )
}

export default Main