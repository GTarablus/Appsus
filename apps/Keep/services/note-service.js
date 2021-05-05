import { utilService } from '../../../services/util-service.js'
export const noteService = {
    query,
    saveNote,
    removeNoteById,
    getNoteById
}

let gNotes = [
    {
        id: utilService.makeId(),
        isPinned: true,
        infos:[ {
            type: 'NoteText',
            txt: 'Fullstack Me Baby!'
        }],
        style: {
            backgroundColor: '#ffffff',
            color: 'black'
        }
    },
    {
        id: utilService.makeId(),
       
        isPinned: false,
        infos: [{
            type: 'NoteVideo',
            url: 'https://www.youtube.com/watch?v=8ucz_pm3LX8',
            title: '',
            videoId: '8ucz_pm3LX8'
        }],
        style: {
            backgroundColor: '#121212',
            color: '#ffffff'
        }
    },
    {
        id: utilService.makeId(),
        label: 'Todos',
        isPinned: false,
        infos: [{
            type: 'NoteTodo',
            todos: [{
                txt: 'sleep',
                id: utilService.makeId(),
                doneAt: null
            },
            {
                txt: 'Finish This Sprint',
                id: utilService.makeId(),
                doneAt: null
            },
            {
                txt: `Don't Forget to eat (again)`,
                id: utilService.makeId(),
                doneAt: null
            }
            ]
        }],
        style: {
            backgroundColor: '#ffffff',
        }

    },
    {
        id: utilService.makeId(),
      
        isPinned: false,
        infos: [{
            type: 'NoteImg',
            imgUrl: 'https://static01.nyt.com/images/2020/05/16/business/16JORDAN-01sub/16JORDAN-01sub-superJumbo.jpg',
            title: ''
        }],
        style: {
            backgroundColor: '#ffffff',
        }
    }
]

function query() {

    //search and filter 
    return Promise.resolve(gNotes)
}

function getNoteById(noteId) {

    return Promise.resolve(gNotes.find(note => note.id === noteId))
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

    const addedNote = {
        id: utilService.makeId(),
        label: '',
        isPinned: false,
        infos: [_createNoteInfo(note)],
        style: {
            backgroundColor: '#ffffff',
            color: 'black'
        }
    }
    gNotes.unshift(addedNote)
    return Promise.resolve()


}
function _createNoteInfo(note) {
    switch (note.type) {
        case 'NoteImg': return _createImgInfo(note)
        case 'NoteTodo': return _createTodoInfo(note)
        case 'NoteVideo': return _createVideoInfo(note)
        default: return _createTextInfo(note)
    }
}
function _createTextInfo(note) {
    const addedInfo = {
        type:'NoteText',
        title: '',
        txt: note.txt
    }
    return addedInfo;
}

function _createImgInfo(note) {
    const addedInfo = {
        type:'NoteImg',
        imgUrl: note.txt,
        title: ''
    }
    return addedInfo;
}
function _createTodoInfo(note) {
    const todos = note.txt.split(',');
    const addedInfo = {
        title:'',
            type:'NoteTodo',
            todos: todos.map(todo => {
                return {
                    id: utilService.makeId(),
                    txt: todo,
                    doneAt: null
                }
            })
        }
    return addedInfo;
}
function _createVideoInfo(note) {
    if (!note.txt.startsWith('https://www.youtube.com/')) return Promise.reject('Wrong Url for Video')
    const idIdx = note.txt.search('v=')
    if (idIdx === -1) return Promise.reject('could not find the video')
    const addedInfo = {
        title:'',
            type: 'NoteVideo',
            url: note.txt,
            videoId: note.txt.substring(idIdx + 2)
    }
   
    return addedInfo;
}

function removeNoteById(noteId) {
    const noteIdx = gNotes.findIndex(note => note.id === noteId)
    gNotes.splice(noteIdx, 1);
    return Promise.resolve()
}

