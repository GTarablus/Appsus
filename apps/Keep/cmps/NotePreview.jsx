const { withRouter,Link,Route } = ReactRouterDOM;
import {DynamicNote} from './DynamicNote.jsx'
import { IconPalette } from './icon-cmps/IconPalette.jsx'
class _NotePreview extends React.Component {

    //the dynamic component
    state = {
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
        return <Link to={`/keep/edit/${note.id}`}><div className="note-preview" style={note.style}>
            {note.infos.map(info=><DynamicNote  info={info} note={note}{...this.props} />)}
                <div className="note-preview-buttons" onClick={(ev)=>ev.stopPropagation()}>
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                    <button onClick={() => this.setState({ isEdit: true, txtEdit: note.info.txt })}>Edit</button>
                   <IconPalette note={note} handleChange={this.handleChange}/>
                </div>
        </div>
        </Link>
    }
}


export const NotePreview = withRouter(_NotePreview)