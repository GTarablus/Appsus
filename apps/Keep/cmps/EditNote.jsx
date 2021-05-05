import { noteService } from '../services/note-service.js'
import { DynamicNote } from './DynamicNote.jsx'
import { IconImage } from './icon-cmps/IconImage.jsx'
import { IconPalette } from './icon-cmps/IconPalette.jsx'
import { IconText } from './icon-cmps/IconText.jsx'
import { IconVideo } from './icon-cmps/IconVideo.jsx'
import { IconTodo } from './icon-cmps/IconTodo.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'
export class EditNote extends React.Component {

    state = {
        note: null,
        type: null,
        style: null,
        txt: null,
    }
    componentDidMount() {
        const noteId = this.props.match.params.noteId;
        console.log(noteId)
        if (!noteId) this.props.history.push('/keep')
        noteService.getNoteById(noteId)
            .then(note => {
                if (!note) {
                    this.props.history.push('/keep')
                    return
                }
                console.log(note)
                this.setState({ note, type: note.type, style: note.style })
            })
            .catch(err => { })
    }
    onSubmitEdit = () => {
        console.log('on submit')
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                type: this.state.type,
                style: this.state.style
            },

        }), () => {
            console.log(this.state.note)
            eventBusService.emit('save-note', this.state.note)
            this.onCloseEdit()
        })
    }
    onCloseEdit = () => {
        this.props.history.push('/keep')
    }
    handleChange = ({ target }) => {
        console.log(target.value)
        const field = target.name
        const value = target.value
        this.setState(prevState => ({
            ...prevState,
            style:{
                [field]: value,
            }
        }))
    }



    render() {
        const { note, style } = this.state
        if (!note) return null
        return <div className="edit-note" style={style}>
            <input type="text" placeholder="Enter Your Title" />
            <div className="edit-content">
                {(note.type === 'NoteText') ?
                    <textarea value={note.info.txt} name="txt" onChange={this.handleChange}></textarea>
                    : <DynamicNote info={note.info} note={note}{...this.props} />}
            </div>
            <div className="edit-btns">
                <button onClick={() => onAddInfo('image')}><IconImage /></button>
                <IconPalette note={note} style={this.state.style} updateColor={this.handleChange} />
                <button onClick={this.handleChange}><IconText /></button>
                <button><IconTodo /> </button>
                <button><IconVideo /></button>
            </div>
            <div className="action-btns">
                <button onClick={this.onCloseEdit}>Cancel</button>
                <button onClick={this.onSubmitEdit}>save</button>
            </div>
        </div>
    }

}