import { createSlice } from '@reduxjs/toolkit'

export const SliceFunction = createSlice({
    name: 'notesaver',
    initialState: {
        isAuthenticate: false,
        currentUserId: null,
        isNewNote: true
    },
    reducers: {
        setIsAuthenticate: (state, action) => {
            state.isAuthenticate = action.payload;
        },
        setCurrentUserId: (state, action) => {
            state.currentUserId = action.payload;
        },
    },
})


// Action creators are generated for each case reducer function
export const { setIsAuthenticate, setCurrentUserId } = SliceFunction.actions

export default SliceFunction.reducer