export class NoteAdd extends React.Component{
    state={
        type:'NoteText',
        txt:''

    }
    handleChange=({target})=>{
        const type=target.name;
        const val=target.value;
        this.setState({txt:val})
    }
    render(){
        const{type,txt}=this.state
       return <div className="note-add-container">
           <input className="note-add-input" type="text" name="inputVal" placeholder="Add a note..." value={txt} onChange={this.handleChange}/>
           <button onClick={()=>{
               this.props.onAddNote({type,txt})
               this.setState({txt:''})
           }}>Add</button>
       </div>
    }
}