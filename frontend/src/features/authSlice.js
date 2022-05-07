import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    isDelete: false,
}

export const postForm = createAsyncThunk('api/login', async(action, thunkAPI) => {
    const response = await fetch(`http://localhost:5000/users/${action.payload.status}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            name: action.payload.name,
            password: action.payload.password,
        }),
    })

    const data = await response.json()

    if (data.isSuccess) {
        localStorage.setItem("auth", data.auth)
    } else {
        data.isError = true
    }

    return data
})

export const deleteUser = createAsyncThunk("api/deleteUser", async(thunkAPI) => {
    const response = await fetch('http://localhost:5000/users/delete', {
        method: "DELETE",
        headers: {
            authorization: localStorage.getItem("auth")
        }
    })

    const data = await response.json()

    if (data.isSuccess) {
        localStorage.removeItem("auth")
    }

    return data
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isDelete = false
            state.isLoading = false
            state.message = ""
            state.isSuccess = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postForm.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
            })
            .addCase(postForm.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = action.payload.isSuccess
                state.isError = action.payload.isError
                state.message = action.payload.message
            })
            .addCase(postForm.rejected, (state) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = 'error'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isDelete = true
                state.message = action.payload.message
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isError = true
            })
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer