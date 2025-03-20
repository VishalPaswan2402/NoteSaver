import { createSlice } from '@reduxjs/toolkit'

export const SliceFunction = createSlice({
    name: 'paste',
    initialState: {
        note: "note content",
        login: false,
        loadNotes: false,
        currentUserId:null
    },
    reducers: {
        loginLogout: (state, action) => {
            state.login = !state.login;
            // console.log(state.login);
        },
        setCurrentUserId:(state,action)=>{
            console.log("current loged user", state,action);
            state.currentUserId=action.payload;
        },
        addToPastes: (state, action) => { },
        updateToPastes: (state, action) => { },
        deletePastes: (state, action) => { },
        loadAllNotes: (state, action) => {
            state.loadNotes = !state.loadNotes;
            // console.log("Slice",state.loadNotes);
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, deletePastes, loginLogout, loadAllNotes,setCurrentUserId } = SliceFunction.actions

export default SliceFunction.reducer