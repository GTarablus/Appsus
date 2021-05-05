const { withRouter,Link,Route } = ReactRouterDOM;
import { eventBusService } from '../../../services/event-bus-service.js';
import {DynamicNote} from './DynamicNote.jsx'
import { IconPalette } from './icon-cmps/IconPalette.jsx'
class _NotePreview extends React.Component {

    //the dynamic component
    state = {
        style:this.props.note.style,
    }
   
    updateColor = ({target}) => {
        this.setState(prevState=>({
            style:{
                ...prevState.style,
                backgroundColor:target.value
            }
        }), () => 
        {
            this.props.note.style=this.state.style
            this.props.onSaveNote(this.props.note)
    })
}
    render() {
        const { note, onRemoveNote } = this.props
        return <Link to={`/keep/edit/${note.id}`}><div className="note-preview" style={this.state.style} >
            <DynamicNote note={note}{...this.props} />
                <div className="note-preview-buttons" onClick={(ev)=>ev.stopPropagation()}>
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                   <IconPalette style={this.state.style} note={this.props.note} updateColor={this.updateColor}/>
                </div>
        </div>
        </Link>
    }
}


export const NotePreview = withRouter(_NotePreview)