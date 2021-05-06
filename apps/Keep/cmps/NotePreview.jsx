const { withRouter, Link, Route } = ReactRouterDOM;
import { eventBusService } from '../../../services/event-bus-service.js';
import { DynamicNote } from './DynamicNote.jsx'
import { IconPalette } from './icon-cmps/IconPalette.jsx'
import { IconTrash } from './icon-cmps/iconTrash.jsx'
import { IconPin } from './icon-cmps/IconPin.jsx'
import {IconEdit} from './icon-cmps/IconEdit.jsx'
class _NotePreview extends React.Component {

    //the dynamic component
    state = {
        style: this.props.note.style,
    }

    updateColor = ({ target }) => {
        this.setState(prevState => ({
            style: {
                ...prevState.style,
                backgroundColor: target.value
            }
        }), () => {
            this.props.note.style = this.state.style
            this.props.onSaveNote(this.props.note)
        })
    }
    render() {
        const { note, onRemoveNote } = this.props
        return <div className="note-preview" style={note.style} >
                <button className="pin-btn" onClick={() => this.props.onTogglePinNote(this.props.note)}><IconPin /></button>
               {note.title&&<h3>{note.title}</h3>}
            <DynamicNote note={note}{...this.props} type={note.type} />
            <div className="note-preview-buttons" onClick={(ev) => ev.stopPropagation()}>
                <IconPalette style={this.state.style} note={this.props.note} updateColor={this.updateColor} />
                <Link to={`/keep/edit/${note.id}`}><IconEdit/></Link>
                <button onClick={() => onRemoveNote(note.id)}><IconTrash /></button>
            </div>
        </div>
 
    }
}


export const NotePreview = withRouter(_NotePreview)