import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice.js';
import taskSlice from '../features/taskSlice.js'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        task: taskSlice,
    },
});