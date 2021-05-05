import {IconVideo} from './icon-cmps/IconVideo.jsx'
import {IconImage} from './icon-cmps/IconImage.jsx'
import {IconTodo} from './icon-cmps/IconTodo.jsx'
import {IconText} from './icon-cmps/IconText.jsx'
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
           <label htmlFor="text-type"> 
           <input type="radio" name="type" value='NoteText' id="text-type" onChange={this.handleChange}/>
          <IconText/>
           </label>
           <label htmlFor="img-type"> 
           <input type="radio" name="type" value='NoteImg' id="img-type" onChange={this.handleChange}/>
           <IconImage/>
            </label>
           <label htmlFor="todo-type"> 
           <input type="radio" name="type" value='NoteTodo' id="todo-type" onChange={this.handleChange}/>
           <IconTodo/>
           </label>
           <label htmlFor="video-type">
           <input type="radio" name="type" value='NoteVideo' id="video-type" onChange={this.handleChange}/>
           <IconVideo/>
           </label>
           <button onClick={()=>{
               this.props.onSaveNote({type,txt})
               this.setState({txt:''})
           }}>Add</button>
       </div>
    }
}