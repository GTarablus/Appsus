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
    },
    {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: 'https://www.youtube.com/watch?v=8ucz_pm3LX8',
            title: '',
            videoId: '8ucz_pm3LX8'
        },
        style: {
            backgroundColor: '#121212',
            color:'#ffffff'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTodo',
        isPinned: false,
        info: {
            label: 'Todos',
            todos: [{
                txt:'sleep',
                id:utilService.makeId(),
                doneAt:null
            },
            {
                txt:'Finish This Sprint',
                id:utilService.makeId(),
                doneAt:null
            },
            {
                txt:`Don't Forget to eat (again)`,
                id:utilService.makeId(),
                doneAt:null
            }
            ]
        },
        style: {
            backgroundColor: '#ffffff',
        }

    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'https://static01.nyt.com/images/2020/05/16/business/16JORDAN-01sub/16JORDAN-01sub-superJumbo.jpg',
            title: ''
        },
        style: {
            backgroundColor: '#ffffff',
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
        case 'NoteVideo': return _createVideoNote(note)
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
    const addedNote = {
        id: utilService.makeId(),
        type: 'NoteTodo',
        isPinned: false,
        info: {
            label: 'Todos',
            todos: todos.map(todo => {
                return {
                    id: utilService.makeId(),
                    txt: todo,
                    doneAt: null
                }
            })
        },
        style: {
            backgroundColor: '#ffffff',
        }

    }
    gNotes.unshift(addedNote)
    return Promise.resolve()
}
function _createVideoNote(note) {
    if (!note.txt.startsWith('https://www.youtube.com/')) return Promise.reject('Wrong Url for Video')
    const idIdx = note.txt.search('v=')
    if (idIdx === -1) return Promise.reject('could not find the video')

    const addedNote = {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
            url: note.txt,
            title: '',
            videoId: note.txt.substring(idIdx + 2)
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

