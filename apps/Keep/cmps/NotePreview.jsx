const { withRouter,Link,Route } = ReactRouterDOM;
import {DynamicNote} from './DynamicNote.jsx'
import { IconPalette } from './icon-cmps/IconPalette.jsx'
class _NotePreview extends React.Component {

    //the dynamic component
    state = {
        isEdit: false,
        txtEdit: '',
        note: this.props.note,

    }
    componentDidMount() {
        console.log(this.props.history)
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        if (field === 'backgroundColor') this.updateColor(value)
        else this.setState(prevState => ({
            ...prevState,
            [field]: value
        }
        ))
    }
    updateColor = (value) => {
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                style: {
                    ...prevState.note.style,
                    backgroundColor: value
                }
            },
            backgroundColor: value
        }), () => this.props.onSaveNote(this.state.note))
    }
    render() {
        const { backgroundColor } = this.props.note.style
        const { note, onRemoveNote } = this.props
        const { isEdit, txtEdit } = this.state
        return <Link to={`/keep/edit/${note.id}`}><div className="note-preview" style={{ backgroundColor: backgroundColor }}>
            <DynamicNote note={note}{...this.props} />
            {/* {(isEdit) ?
                <textarea name="txtEdit" id="" cols="" rows="" value={txtEdit} onChange={this.handleChange}></textarea>
            : note.info.txt} */}
                <div className="note-preview-buttons" onClick={(ev)=>ev.stopPropagation()}>
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                    <button onClick={() => this.setState({ isEdit: true, txtEdit: note.info.txt })}>Edit</button>
                    <label htmlFor={`bg-note-color-${note.id}`} >
                        <IconPalette />
                        <input type="color" id={`bg-note-color-${note.id}`} name="backgroundColor" onChange={this.handleChange} value={backgroundColor} />
                    </label>
                </div>
        </div>
        </Link>
    }
}


export const NotePreview = withRouter(_NotePreview)