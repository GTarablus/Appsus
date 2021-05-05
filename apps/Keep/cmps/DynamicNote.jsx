import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodo } from './NoteTodo.jsx'
export const DynamicNote = (props) => {
    switch (props.note.type) {
        case 'NoteText':
            return <NoteText {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        case 'NoteTodo':
            return <NoteTodo {...props} />
        //   default:
        //     return //...some default error view
    }
}