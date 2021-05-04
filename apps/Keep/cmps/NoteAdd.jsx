export class NoteAdd extends React.Component{
    state={
        type:'NoteText',
        txt:'',
       
    }
    getPlaceholder=()=>{
       switch (this.state.type){
           case 'NoteText': return 'Enter your Text'
           case 'NoteImg':return 'Enter an image Url'
            case 'NoteTodo' : return 'Enter a comma Separted list for your todos'
            case 'NoteVideo' : return 'Enter a video url'

       }
    }
    handleChange=({target})=>{
        const field=target.name;
        const val=target.value;
        this.setState({[field]:val}, ()=>console.log(this.state))
    }
    render(){
        const{type,txt}=this.state
       return <div className="note-add-container">
           <input className="note-add-input" type="text" name="txt" placeholder={this.getPlaceholder()} value={txt} onChange={this.handleChange}/>
           <label htmlFor="text-type"> Text</label>
           <input type="radio" name="type" value='NoteText' id="text-type" onChange={this.handleChange}/>
           <label htmlFor="img-type"> Image</label>
           <input type="radio" name="type" value='NoteImg' id="img-type" onChange={this.handleChange}/>
           <label htmlFor="todo-type"> Todo</label>
           <input type="radio" name="type" value='NoteTodo' id="todo-type" onChange={this.handleChange}/>
           <label htmlFor="video-type"> Video</label>
           <input type="radio" name="type" value='NoteVideo' id="video-type" onChange={this.handleChange}/>
           <button onClick={()=>{
               this.props.onSaveNote({type,txt})
               this.setState({txt:''})
           }}>Add</button>
       </div>
    }
}