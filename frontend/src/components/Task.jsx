import {useDispatch, useSelector} from 'react-redux'
import {deleteTask} from '../features/taskSlice.js'
import {useState} from 'react'

function Task({discription, title, _id}) {

    const [state, setState] =useState({
        isUpdate: false,
    })

    const taskState = useSelector((state)=>{ return state.task})

    const dispatch = useDispatch()

    const deleteTaskFn = (e) => {
        const tasks = taskState.tasks.filter(task => task._id !== _id)

        const payload = {
            _id,
            tasks,
        }
        
        dispatch(deleteTask({payload}))
    }

    const toggleOnHover = () => {
        setState((prevState) => {
            return {
                ...prevState,
                isHover: !prevState.isHover,
            }
        })
    }

    return (
        <div onMouseOver={toggleOnHover} onMouseOut={toggleOnHover} className='task'>
            <>
                <h2 className="task-title">{title}</h2>
                <small className="task-discription">{discription}</small>
                {state.isHover && <button className="task-cls-btn" onClick={deleteTaskFn}>X</button>}
            </>
        </div>
    )
}

export default Task