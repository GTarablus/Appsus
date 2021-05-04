
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
           <label htmlFor="img-type"> 
           <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" class="svg-inline--fa fa-image fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>
           <input type="radio" name="type" value='NoteImg' id="img-type" onChange={this.handleChange}/>
            </label>
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