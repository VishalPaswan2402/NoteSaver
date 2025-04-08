import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

export const SliceFunction = createSlice({
    name: 'notesaver',
    initialState: {
        isAuthenticate: false,
        currentUserId: null,
        isNewNote: true,
        showAlertBox: false,
        currentNoteId: null,
        allNotes: [],
        filterNoteType: "Non-Archieve",
        filterNoteTypeIcon: "file-lines",
        filterOptionType: "Newest First",
        filterOptionTypeIcon: "clock",
        searchQuerys: "",
        isArc: true,
        currNoteArchive: false,
        isViewPage: false,
        filteredCount: 0,
        openTypeOption: false,
        openFilterOption: false,
        viewPageChange: false,
        displayShareOption: false,
        sharedNoteId: null,
        displayCodeBox: false,
        displayLinkBox: false,
        shareEditCodeBox: false,
        noteToVerify: null,
        editNoteData: [],
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
        setFilterNoteType: (state, action) => {
            state.filterNoteType = action.payload;
        },
        setFilterNoteTypeIcon: (state, action) => {
            state.filterNoteTypeIcon = action.payload;
        },
        setFilterOptionType: (state, action) => {
            state.filterOptionType = action.payload;
        },
        setFilterOptionTypeIcon: (state, action) => {
            state.filterOptionTypeIcon = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuerys = action.payload;
        },
        handleOnArchiveNote: (state, action) => {
            state.isArc = !state.isArc;
        },
        setCurrentNoteArchive: (state, action) => {
            state.currNoteArchive = action.payload;
        },
        setViewPageDelete: (state, action) => {
            state.isViewPage = action.payload;
        },
        setFilterNoteCount: (state, action) => {
            state.filteredCount = action.payload;
        },
        setOpenTypeOption: (state, action) => {
            state.openTypeOption = !state.openTypeOption;
            if (state.openTypeOption) {
                state.openFilterOption = false; // Ensure the other option is closed
            }
        },
        setOpenFiltereOption: (state, action) => {
            state.openFilterOption = !state.openFilterOption;
            if (state.openFilterOption) {
                state.openTypeOption = false; // Ensure the other option is closed
            }
        },
        updateViewPageChange: (state, action) => {
            state.viewPageChange = !state.viewPageChange;
        },
        setDisplayShareOption: (state, action) => {
            state.displayShareOption = !state.displayShareOption;
        },
        setSharedNoteId: (state, action) => {
            state.sharedNoteId = action.payload;
        },
        setDisplayCodeBox: (state, action) => {
            state.displayCodeBox = action.payload;
        },
        setDisplayLinkBox: (state, action) => {
            state.displayLinkBox = !state.displayLinkBox;
        },
        setShareEditCodeBox: (state, action) => {
            state.shareEditCodeBox = action.payload;
        },
        setNoteIdToVerify: (state, action) => {
            state.noteToVerify = action.payload;
        },
        setEditNoteData: (state, action) => {
            state.editNoteData = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setAllNotes,
    setIsAuthenticate,
    setCurrentUserId,
    setAlertBox,
    handleOnDeleteNote,
    handleMarkNote,
    setFilterNoteType,
    setFilterNoteTypeIcon,
    setFilterOptionType,
    setFilterOptionTypeIcon,
    setSearchQuery,
    handleOnArchiveNote,
    setCurrentNoteArchive,
    setViewPageDelete,
    setFilterNoteCount,
    setOpenTypeOption,
    setOpenFiltereOption,
    updateViewPageChange,
    setDisplayShareOption,
    setSharedNoteId,
    setDisplayCodeBox,
    setDisplayLinkBox,
    setShareEditCodeBox,
    setNoteIdToVerify,
    setEditNoteData
} = SliceFunction.actions

export default SliceFunction.reducer