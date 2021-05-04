import { NoteText } from './NoteText.jsx'
import {NoteImg} from './NoteImg.jsx'
import {NoteVideo} from './NoteVideo.jsx'
import {NoteTodo} from './NoteTodo.jsx'
export class NotePreview extends React.Component {

    //the dynamic component
    state = {
        isEdit: false,
        txtEdit: '',
        note: this.props.note,
       
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
            backgroundColor:value
        }), () => this.props.onSaveNote(this.state.note))
    }
    onCancelEdit = () => {
        this.setState({ isEdit: false, txtEdit: '' })
    }
    onSubmitEdit = () => {
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                info: {
                    txt: this.state.txtEdit
                }
            },
            isEdit: false,
            txtEdit: ''
        }), () => this.props.onSaveNote(this.state.note))
    }

    render() {
        const {backgroundColor}= this.props.note.style
        const { note, onRemoveNote } = this.props
        const { isEdit, txtEdit } = this.state
        return <div className="note-preview" style={{backgroundColor:backgroundColor}}>
            <DynamicCmp note={note}{...this.props}/>
            {/* {(isEdit) ?
                <textarea name="txtEdit" id="" cols="" rows="" value={txtEdit} onChange={this.handleChange}></textarea>
                : note.info.txt} */}
            {(!isEdit) ?
                <div className="note-preview-buttons">
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                    <button onClick={() => this.setState({ isEdit: true, txtEdit: note.info.txt })}>Edit</button>
                    <label htmlFor="bg-note-color">Change Color
            <input type="color" id="bg-note-color" name="backgroundColor" onChange={this.handleChange} value={backgroundColor}/>
                    </label>
                </div>
                :
                <div className="edit-btn-container">
                    <button onClick={this.onSubmitEdit}>V</button>
                    <button onClick={this.onCancelEdit}>X</button>
                </div>
            }
        </div>
    }
    
} 

const DynamicCmp = (props) => {
    switch (props.note.type) {
      case 'NoteText':
        return <NoteText {...props} />
      case 'NoteImg':
        return <NoteImg {...props} />
        case 'NoteVideo':
            return<NoteVideo {...props}/>
      case 'NoteTodo':
        return <NoteTodo {...props} />
    //   default:
    //     return //...some default error view
    }
  }
