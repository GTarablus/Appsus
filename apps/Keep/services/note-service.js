import { utilService } from '../../../services/util-service.js'
export const noteService = {
    query,
    saveNote,
    removeNoteById,
    getNoteById,
    updateNoteStyleById,
    createNoteInfo
}

let gNotes = [
    {
        id: utilService.makeId(),
        isPinned: false,
        title:'',
        type: 'NoteText',
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
        title:'',
        isPinned: false,
        type: 'NoteVideo',
        info: {
            url: 'https://www.youtube.com/watch?v=8ucz_pm3LX8',
            title: '',
            videoId: '8ucz_pm3LX8'
        },
        style: {
            backgroundColor: '#121212',
            color: '#ffffff'
        }
    },
    {
        id: utilService.makeId(),
        label: 'Todos',
        type: 'NoteTodo',
        title:'',
        isPinned: false,
        info: {
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
        },
        style: {
            backgroundColor: '#ffffff',
        }

    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        title:'',
        isPinned: false,
        info: {
            type: 'NoteImg',
            imgUrl: 'https://static01.nyt.com/images/2020/05/16/business/16JORDAN-01sub/16JORDAN-01sub-superJumbo.jpg',
            title: ''
        },
        style: {
            backgroundColor: '#ffffff',
        }
    }
]

function query(filterBy) {
    console.log('in query' , filterBy)
    if(!filterBy) return Promise.resolve(gNotes)
   const {txt} =filterBy
   const filteredNotes=gNotes.filter(note=>{
        return _isNoteInFilter(note,txt)
    })
   return Promise.resolve(filteredNotes)
}

function getNoteById(noteId) {

    return Promise.resolve(gNotes.find(note => note.id === noteId))
}

function saveNote(note) {

    return note.id ? _updateNote(note) : _addNote(note)
}

function _updateNote(noteToUpdate) {
    console.log('note of the todo note',noteToUpdate)
    const noteIdx = gNotes.findIndex(note => note.id === noteToUpdate.id)
    gNotes.splice(noteIdx, 1, noteToUpdate)
    return Promise.resolve()
}



function _addNote(note) {
    const addedNote = {
        id: utilService.makeId(),
        title:note.title,
        label: '',
        type: note.type,
        isPinned: false,
        info: createNoteInfo(note),
        style: {
            backgroundColor: '#ffffff',
            color: 'black'
        }
    }
    gNotes.unshift(addedNote)
    return Promise.resolve()


}
function updateNoteStyleById(noteId,style){
     console.log('in update style')
    console.log(style)
   const note= gNotes.find(note=>noteId===note.id)
   console.log(note)
   note.style=style;
    return Promise.resolve()
}
function createNoteInfo(note) {
    switch (note.type) {
        case 'NoteImg': return _createImgInfo(note)
        case 'NoteTodo': return _createTodoInfo(note)
        case 'NoteVideo': return _createVideoInfo(note)
        case 'NoteMap' : return _createMapInfo(note)
        default: return _createTextInfo(note)
    }
}
function _createTextInfo(note) {
    const addedInfo = {
        txt: note.txt
    }
    return addedInfo;
}

function _createImgInfo(note) {
    const addedInfo = {
        imgUrl: note.txt,
    }
    return addedInfo;
}
function _createTodoInfo(note) {
    if(!note.txt) note.txt='';
    const todos = note.txt.split(',');
    const addedInfo = {
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
            url: note.txt,
            videoId: note.txt.substring(idIdx + 2)
    }
    return addedInfo;
}
function _createMapInfo(note){
    const addedInfo = {
        locName: note.txt,
    }
    return addedInfo;
}
function _isNoteInFilter(note,txt){
   txt= txt.toUpperCase()
    if(note.title.toUpperCase().includes(txt))return true
    if(note.type==='NoteText'&&  note.info.txt.toUpperCase().includes(txt)) return true
    if(note.type==='NoteTodo' && note.info.todos.some(todo=>todo.txt.toUpperCase().includes(txt))) return true
    return false
}

function removeNoteById(noteId) {
    const noteIdx = gNotes.findIndex(note => note.id === noteId)
    gNotes.splice(noteIdx, 1);
    return Promise.resolve()
}

