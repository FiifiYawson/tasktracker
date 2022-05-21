import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const addTask = createAsyncThunk("api/addtask", async(action, thunkAPI) => {
    const response = await fetch('tasks/', {
        method: "POST",
        headers: {
            authorization: localStorage.getItem('auth'),
            "content-type": "application/json",
        },
        body: JSON.stringify({
            title: action.payload.title,
            discription: action.payload.discription,
        })
    })

    const data = await response.json()

    return data
})

export const getTasks = createAsyncThunk('api/gettask', async(thunkAPI) => {
    const response = await fetch('tasks/', {
        headers: {
            authorization: localStorage.getItem("auth")
        }
    })

    const data = await response.json()

    return data
})

export const deleteTask = createAsyncThunk('api/deletetask', async(action, thunkAPI) => {
    const response = await fetch(`tasks/${action.payload._id}`, {
        method: "DELETE",
        headers: {
            authorization: localStorage.getItem("auth"),
        }
    })

    const data = await response.json()

    data.tasks = action.payload.tasks

    return data
})

export const clearTasks = createAsyncThunk('api/clearTasks', async(action, thunkAPI) => {
    const response = await fetch('tasks', {
        method: 'DELETE',
        headers: {
            authorization: localStorage.getItem('auth')
        }
    })

    const data = response.json()

    return data
})

export const updateTask = createAsyncThunk('api/updateTask', async(action, thunkAPI) => {
    const response = await fetch(`tasks/${action.payload._id}`, {
        method: "PUT",
        headers: {
            authorization: localStorage.getItem("auth"),
            "content-type": "application/json",
        },
        body: JSON.stringify({
            title: action.payload.title,
            discription: action.payload.discription
        })
    })

    const data = await response.json()

    data.title = action.payload.title
    data.discription = action.payload.discription
    data._id = action.payload._id

    return data
})

const initialState = {
    isLoading: false,
    isSuccess: false,
    tasks: [],
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.tasks = []
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload.tasks
            })
            .addCase(addTask.rejected, (state) => {
                state.isLoading = false
                state.isSuccess = false
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload.tasks
            })
            .addCase(getTasks.rejected, (state) => {
                state.isLoading = false
                state.isSuccess = false
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tasks = action.payload.tasks
            })
            .addCase(deleteTask.rejected, (state) => {
                state.isLoading = false
                state.isSuccess = false
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

                const task = state.tasks.find(task => task._id === action.payload._id)

                task.title = action.payload.title
                task.discription = action.payload.discription
            })
            .addCase(updateTask.rejected, (state) => {
                state.isLoading = false
                state.isSuccess = false
            })
            .addCase(clearTasks.pending, state => {
                state.isLoading = true
            })
            .addCase(clearTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = action.payload.isSuccess
                state.tasks = []
            })
    }
})

export const taskActions = taskSlice.actions
export default taskSlice.reducer