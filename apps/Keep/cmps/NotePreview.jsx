export class NotePreview extends React.Component{

    //the dynamic component
state={
    isEdit:false,
    txtEdit:null
}

handleChange=({target})=>{
    const field = target.name
    const value = target.value
    this.setState(prevState => ({
            ...prevState,
            [field]: value
        }
    ))
}


render(){
    const{note,onRemoveNote}=this.props
    const{isEdit,txtEdit}=this.state
    return <div className="note-preview">
        {(isEdit)? 
        <textarea name="txtEdit" id="" cols="" rows="" value={txtEdit} onChange={this.handleChange}></textarea>
         :note.info.txt  }
        
        <div className="note-preview-buttons">
            <button onClick={()=>onRemoveNote(note.id)}>Delete</button>
            <button onClick={()=>this.setState({isEdit:true,txtEdit:note.info.txt})}>Edit</button>
            <button>change color</button>
        </div>
    </div>
}

} 