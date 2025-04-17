export const filterAndSortedNote = (notes, noteType, filterType, searchValue) => {
    if (!notes) return [];
    let filteredNotes = [...notes];

    // filter by note type...
    if (noteType === "Non-Archieve") {
        filteredNotes = filteredNotes.filter(note => (!note.isArchive && note.isOriginal));
    }
    else if (noteType === "All Notes") {
        filteredNotes;
    }
    else if (noteType === "Archive Notes") {
        filteredNotes = filteredNotes.filter(note => note.isArchive && note.isOriginal);
    }
    else if (noteType === "Cloned Notes") {
        filteredNotes = filteredNotes.filter(note => !note.isOriginal);
    }

    // filter by note property...
    if (filterType === "Favourite") {
        filteredNotes = filteredNotes.filter(note => note.isImportant);
    }
    else if (filterType === "Newest First") {
        filteredNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    else if (filterType === "Oldest First") {
        filteredNotes.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    else if (filterType === "A-Z Order") {
        filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (filterType === "Z-A Order") {
        filteredNotes.sort((a, b) => b.title.localeCompare(a.title));
    }
    else if (filterType === "All Notes") {
        filteredNotes;
    }

    // Apply search filter
    return filteredNotes.filter(note => note.title.toLowerCase().includes(searchValue.toLowerCase()));
};