import {noteService} from '../services/note-service.js'
import {DynamicNote} from './DynamicNote.jsx'
import {IconImage} from'./icon-cmps/IconImage.jsx'
import {IconPalette} from'./icon-cmps/IconPalette.jsx'
import {IconText} from './icon-cmps/IconText.jsx'
import {IconVideo} from './icon-cmps/IconVideo.jsx'
import {IconTodo} from './icon-cmps/IconTodo.jsx'
export class EditNote extends React.Component{

    state={
        note:null
    }
    componentDidMount(){
        const noteId=this.props.match.params.noteId;
        if(!noteId)this.props.history.push('/keep')
        noteService.getNoteById(noteId)
        .then(note=>{
            if (!note) {
                this.props.history.push('/keep')
                return
            }
            this.setState({note})
            
        })
        .catch(err=>{})
            
      
    }
    onSubmitEdit = () => {
        this.setState(prevState => ({
            note: {
                ...prevState.note,
                info: {
                    txt: this.state.txtEdit
                }
            },
        }), () => this.props.onSaveNote(this.state.note))
    }
    onCancelEdit = () => {
       this.props.history.push('/keep')
    }
   
render(){
    const{note}=this.state
   if(!note) return null
    return <div className="edit-note">
       <input type="text" placeHolder="Enter Your Title"/>
        <div className="edit-content">
        <DynamicNote note={note}/>
       </div>
        <div className="edit-btns">
    <IconImage/>
    <IconPalette/>
    <IconText/>
    <IconTodo/>
    <IconVideo/>
        </div>
        <div className="action-btns">
        <button onClick={this.onCancelEdit}>Cancel</button>
        <button>save</button>
        </div>
         </div>
}

}