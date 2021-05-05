import { noteService } from '../services/note-service.js'
import { DynamicNote } from './DynamicNote.jsx'
import { IconImage } from './icon-cmps/IconImage.jsx'
import { IconPalette } from './icon-cmps/IconPalette.jsx'
import { IconText } from './icon-cmps/IconText.jsx'
import { IconVideo } from './icon-cmps/IconVideo.jsx'
import { IconTodo } from './icon-cmps/IconTodo.jsx'
import {eventBusService} from '../../../services/event-bus-service.js'
export class EditNote extends React.Component {

    state = {
        note: null,
        infos:null,
        style:null,
            
        
    }
    componentDidMount() {
        const noteId = this.props.match.params.noteId;
        if (!noteId) this.props.history.push('/keep')
        noteService.getNoteById(noteId)
            .then(note => {
                if (!note) {
                    this.props.history.push('/keep')
                    return
                }
                this.setState({ note, infos: note.info,style:note.style })

            })
            .catch(err => { })
    }
    onSubmitEdit = () => {
        console.log('on submit')
        this.setState(prevState => ({
            note:{
                ...prevState.note,
                infos:this.state.info,
                style:this.state.style
            }
        }),() =>{
            eventBusService.emit('save-note',this.state.note)
            this.onCloseEdit()
         } )
    }
    onCloseEdit = () => {
        this.props.history.push('/keep')
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        const parent=target.dataset.parent
        console.log(value,field,parent)
        this.setState(prevState => ({
          ...prevState,
            [parent]: {
                ...prevState[parent],
                [field]: value
            }
        }
        ))
    }
    
    render() {
        const { note, info ,style} = this.state
        if (!note) return null
        return <div className="edit-note" style={style}>
            <input type="text" placeholder="Enter Your Title" />
            <div className="edit-content">
            {note.infos.map(info=>{
                if(info.type === 'NoteText'){
                   return  <textarea value={info.txt} name="txt" data-parent="info" onChange={this.handleChange}></textarea>
                }
               return <DynamicNote  info={info} note={note}{...this.props} />
            })}

                    
            </div>
            <div className="edit-btns">
                <button>
                <IconImage />
                </button>
                <IconPalette  note={note} handleChange={this.handleChange}/>
                <button onClick={this}>
                <IconText />
                </button>
               <button>
                <IconTodo  />
                   </button> 
                <button>
                <IconVideo />
                </button>
            </div>
            <div className="action-btns">
                <button onClick={this.onCloseEdit}>Cancel</button>
                <button onClick={this.onSubmitEdit}>save</button>
            </div>
        </div>
    }

}