import { noteService } from '../services/note-service.js'
import { DynamicNote } from './DynamicNote.jsx'
import { IconImage } from './icon-cmps/IconImage.jsx'
import { IconPalette } from './icon-cmps/IconPalette.jsx'
import { IconText } from './icon-cmps/IconText.jsx'
import { IconVideo } from './icon-cmps/IconVideo.jsx'
import { IconTodo } from './icon-cmps/IconTodo.jsx'
import { eventBusService } from '../../../services/event-bus-service.js'
import { IconPin } from './icon-cmps/IconPin.jsx'
export class EditNote extends React.Component {

    state = {
        note: null,
        fileInputTxt:'',
        isFileInput:false,
        title:''
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
                this.setState({ note,isFileInput:false})
            })
            .catch(err => { })

           
    }
    onSubmitEdit = () => {
        console.log('on submit')
        // this.setState(prevState => ({
        //     note: {
        //         ...prevState.note,
        //         type: this.state.type,
        //         style: this.state.style,
        //         title: this.state.title,
        //         info: {
        //             ...prevState.note.info,
        //             txt: this.state.txt
        //         }
        //     },

        // }), () => {
        //     console.log(this.state.note)
            eventBusService.emit('save-note', this.state.note)
            this.onCloseEdit()
        // })
    }
    onCloseEdit = () => {
        this.props.history.push('/keep')
    }
    handleChange = ({ target }) => {
        console.log(target.name)
        const field = target.name
        const value = target.value
        const parentKey=target.dataset.parent
        if (field === 'fileInputTxt') this.setState(prevState=>({...prevState,[field]:value}))
        else if(field==='title') this.setState(prevState=>({
            ...prevState,
            note:{
                ...prevState.note,
                title:value
            }
        }))
        else this.setState(prevState => ({
            ...prevState,
            note:{
                ...prevState.note,
                [parentKey]: {
                    ...prevState[parentKey],
                    [field]: value,
            }
            }
        }))
    }
    onChangeType = (type ,txt) => {
        console.log('Type:',type)
        this.setState(prevState=>({
            ...prevState,
            note:{
                ...prevState.note,
                type:type,
                info:noteService.createNoteInfo({type,txt})
            }
        }))
        // this.setState(prevState=>({...prevState,type}))
        // switch (type) {
        //     // case 'NoteImage':
        //     //     break;
        //     case 'NoteText': 
        //         break;
        //     // case 'NoteVideo':
        //     //     break;
        //     case 'NoteTodo':this.setState({})
        //         break;
        // }
    }
   
    
    toggleFileInput = (fileType) => {
        console.log('onToggle' , fileType)
           this.setState(prevState=>({
            ...prevState,
            isFileInput:!prevState.isFileInput,
            fileType
           }))
        }
    

  onAddFile=()=>{
    this.onChangeType(this.state.fileType,this.state.fileInputTxt)
  }
   


    render() {
        const { note ,fileInputTxt} = this.state
        if (!note) return null
        return <div className="edit-note" style={note.style}>
            <input type="text" placeholder="Enter Your Title" name="title" value={note.title} onChange={this.handleChange} />
            <div className="edit-content">
                {(note.type === 'NoteText') ?
                    <textarea value={note.info.txt} name="txt" data-parent="info" onChange={this.handleChange}></textarea>
                    : <DynamicNote info={note.info} note={note}{...this.props} type={note.type} />}
            </div>
            <div className="edit-btns">
                <button onClick={() => this.toggleFileInput('NoteImg')}><IconImage /></button>
                <IconPalette note={note} style={note.style} updateColor={this.handleChange} />
                <button onClick={() => this.onChangeType('NoteText')}><IconText /></button>
                <button onClick={() => this.onChangeType('NoteTodo')} ><IconTodo /> </button>
                <button onClick={() => this.toggleFileInput('NoteVideo')}><IconVideo /></button>
            </div>
            {this.state.isFileInput&&<div class="file-input-field">
                <input type="text" value={fileInputTxt} name="fileInputTxt" onChange={this.handleChange} placeholder="Insert a vail url... "/>
                <button onClick={this.onAddFile}>Add</button>
                </div>}
            <div className="action-btns">
                <button onClick={this.onCloseEdit}>Cancel</button>
                <button onClick={this.onSubmitEdit}>save</button>
            </div>
        </div>
    }

}