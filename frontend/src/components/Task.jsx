import {useDispatch, useSelector} from 'react-redux'
import {deleteTask} from '../features/taskSlice.js'
import {useState} from 'react'
import {updateTask} from '../features/taskSlice.js'

function Task({discription, title, _id}) {

    const [state, setState] =useState({
        isUpdate: false,
        title: "",
        discription: "",
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

    const toggleTask = () => {
        setState({
            ...state, 
            title: title,
            discription: discription,
            isUpdate: !state.isUpdate,
            isHover: false,
        })
    }

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const updateTaskFn = () => {
        const payload = {
            title: state.title,
            discription: state.discription,
            _id: _id
        }
        dispatch(updateTask({payload}))
        setState({
            ...state,
            isUpdate: false,
        })
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
        <div onMouseOver={toggleOnHover} onMouseOut={toggleOnHover} className='task' onDoubleClick={toggleTask}>
            { 
                state.isUpdate ? 
                    <>
                        <button onClick={toggleTask} style={taskClsBtn}>X</button>
                        <input className='task-input' type='text' onChange={onChange} value={state.title} name="title" placeholder='input title'/> 
                        <input className='task-input' type='text' onChange={onChange} value={state.discription} name="discription" placeholder='input discription'/>
                        <button style={btnStyle} onClick={updateTaskFn}> update </button>
                    </>
                    : 
                    <>
                        <h2 className="task-title">{title}</h2>
                        {state.isHover && <small className="task-discription">{discription}</small>}
                        {state.isHover && <button className="task-cls-btn" onClick={deleteTaskFn}>X</button>}
                    </>
            }
        </div>
    )
}

const btnStyle ={
    color: "#fff",
    backgroundColor: '#00f',
    border: 'none',
    height: '35px',
    borderRadius: '3px',
    cursor: 'pointer',
}

const taskClsBtn = {
    height: '35px',
    backgroundColor: '#f00',
    color: '#fff',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '5px',
}
export default Task