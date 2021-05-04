import { utilService } from '../../../services/util-service.js'
export const noteService = {
    query,
    addNote,
    removeNoteById
}

let gNotes = [
    {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
            txt: 'Fullstack Me Baby!'
        },
        style: {
            backgroundColor: 'blue',
            color: 'black'
        }
    }
]

function query() {


    return Promise.resolve(gNotes)
}

function addNote(note) {
    const addedNote = {
        id: utilService.makeId(),
        type: note.type,
        isPinned: false,
        info: {
            txt: note.txt
        },
        style: {
            backgroundColor: 'white',
            color: 'black'
        }
    }
    gNotes.unshift(addedNote)
    return Promise.resolve()
}

function removeNoteById(noteId){
const noteIdx=gNotes.findIndex(note=>note.id===noteId)
gNotes.splice(noteIdx,1);
return Promise.resolve()
}

