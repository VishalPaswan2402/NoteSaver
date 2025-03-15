import { createSlice } from '@reduxjs/toolkit'

export const SliceFunction = createSlice({
    name: 'paste',
    initialState: {
        note : "note content",
        login : false,
    },
    reducers: {
        loginLogout:(state,action)=>{
            state.login=!state.login;
            console.log(state.login);
        },
        addToPastes: (state,action) => {},
        updateToPastes: (state,action) => {},
        deletePastes: (state,action) => {},
    },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, deletePastes,loginLogout } = SliceFunction.actions

export default SliceFunction.reducer