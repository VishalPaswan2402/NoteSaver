import { createSlice } from '@reduxjs/toolkit'

export const SliceFunction = createSlice({
    name: 'notesaver',
    initialState: {
        isAuthenticate: false,
        currentUserId: null,
        isNewNote: true,
        showAlertBox: false,
        currentNoteId: null,
        allNotes: [],
        filterOption: "Newest First"
    },
    reducers: {
        setAllNotes: (state, action) => {
            state.allNotes = action.payload;
        },
        setIsAuthenticate: (state, action) => {
            state.isAuthenticate = action.payload;
        },
        setCurrentUserId: (state, action) => {
            state.currentUserId = action.payload;
        },
        setAlertBox: (state, action) => {
            state.currentNoteId = action.payload;
            state.showAlertBox = !state.showAlertBox;
        },
        handleOnDeleteNote: (state, action) => {
            state.allNotes = state.allNotes.filter(note => note._id !== action.payload);
        },
        handleMarkNote: (state, action) => {
            state.allNotes = state.allNotes.map(note =>
                note._id === action.payload ? { ...note, isImportant: !note.isImportant } : note
            );
        },
        setFilterOption: (state, action) => {
            state.filterOption = action.payload;
        }
    },
})


// Action creators are generated for each case reducer function
export const {
    setIsAuthenticate,
    setCurrentUserId,
    setAlertBox,
    setAllNotes,
    handleOnDeleteNote,
    handleMarkNote,
    setFilterOption
} = SliceFunction.actions

export default SliceFunction.reducer