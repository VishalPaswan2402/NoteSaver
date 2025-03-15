import { configureStore } from '@reduxjs/toolkit'
import  SliceFunction  from '../ReduxSlice/SliceFunction'

export const store = configureStore({
    reducer: {
        paste:SliceFunction,
    },
})