import { NoteText } from './NoteText.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodo } from './NoteTodo.jsx'
export const DynamicNote = (props) => {
    const { info } = props.note


    switch (props.info.type) {
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
    return <div>

        {info.txt && <NoteText {...props} />}
        {info.imgUrl && <NoteImg {...props} />}
        {info.videoId && <NoteVideo {...props} />}
        {info.todos && <NoteTodo {...props} />}
    </div>


}