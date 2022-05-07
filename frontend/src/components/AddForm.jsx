import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {addTask} from '../features/taskSlice.js'

function AddForm() {
    const [formInput, setFormInput] = useState({
        title: "",
        discription: "",
        message: "",
        isError: false,
        isInput: false,
    })

    useEffect(()=>{
        if(formInput.title === ""){
            setFormInput( initialState => {
                return {...initialState, isInput: false}
            })
        }else{
            setFormInput( initialState => {
                return {...initialState, isInput: true}
            })
        }
    },[formInput.title])

    const dispatch = useDispatch()

    const onChange = (e) => {

        setFormInput({
            ...formInput, 
            [e.target.name] : e.target.value,
        })
    }

    const addTaskFn = () => {
        const payload = {
            title: formInput.title,
            discription: formInput.discription
        }

        if(formInput.title === ""){
            setFormInput({
                ...formInput,
                message: "title is require",
                isError: true
            })
        }else{
            dispatch(addTask({payload}))
            setFormInput({
                ...formInput,
                title: "",
                discription: "",
            })
        }
    }

    return (
        <div id='add-task-container'>
            <h2>Add task</h2>
            <input className='task-input' type="text" onChange={onChange} value={formInput.title} name="title" placeholder='Input task title' />
            <input className='task-input' type="text" onChange={onChange} value={formInput.discription} name="discription" placeholder='Input task discription' />
            {formInput.isInput && <button id='add-task-submit' onClick={addTaskFn}>submit</button>}
        </div> 
    )
}

export default AddForm