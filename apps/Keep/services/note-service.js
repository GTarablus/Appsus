import { utilService } from '../../../services/util-service.js'
export const noteService = {
    query,
    saveNote,
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
            backgroundColor: '#ffffff',
            color: 'black'
        }
    }
]

function query() {


    return Promise.resolve(gNotes)
}

function saveNote(note) {
    console.log(note)
    return note.id ? _updateNote(note) : _addNote(note)
}

function _updateNote(noteToUpdate) {
    const noteIdx = gNotes.findIndex(note => note.id === noteToUpdate.id)
    gNotes.splice(noteIdx, 1, noteToUpdate)
    return Promise.resolve()
}



function _addNote(note) {

    switch (note.type) {
        case 'NoteImg': return _createImgNote(note)
        case 'NoteTodo': return _createTodoNote(note)
        case 'NoteVideo':return _createTofoVideo(note)
        default: return _createTextNote(note)
    }
}
function _createTextNote(note) {

    const addedNote = {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: false,
        info: {
            txt: note.txt
        },
        style: {
            backgroundColor: '#ffffff',
            color: 'black'
        }
    }
    gNotes.unshift(addedNote)
    return Promise.resolve()
}

function _createImgNote(note) {
    if (!note.txt.match(/\.(jpeg|jpg|gif|png)$/)) return Promise.reject('Valid Pictures Only')
    const addedNote = {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: note.txt,
            title: ''
        },
        style: {
            backgroundColor: '#ffffff',
        }
    }
    gNotes.unshift(addedNote)
    return Promise.resolve()
}
function _createTodoNote(note) {
    const todos = note.txt.split(',');
    addedNote = {
        id: utilService.makeId(),
        type: 'NoteTodo',
        isPinned: false,
        info: {
            label:'Todos',
            todos: todos.map(todo=>{
               return {txt:todo,doneAt:null}
            }),
             style: {
                backgroundColor: '#ffffff',
            }
        }
    }
    gNotes.unshift(addedNote)
    return Promise.resolve()
}
function _createVideoNote(note){
    if(!note.txt.startsWith('https://www.youtube.com/')) Promise.reject('Wrong Url for Video')
    

    const addedNote = {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: note.txt,
            title: ''
        },
        style: {
            backgroundColor: '#ffffff',
        }
    }
    gNotes.unshift(addedNote)
    return Promise.resolve()
}

    function removeNoteById(noteId) {
        const noteIdx = gNotes.findIndex(note => note.id === noteId)
        gNotes.splice(noteIdx, 1);
        return Promise.resolve()
    }

