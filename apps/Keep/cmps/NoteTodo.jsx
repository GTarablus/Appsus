import {TodoList} from './TodoList.jsx'
import {utilService} from '../../../services/util-service.js'
import {eventBusService} from '../../../services/event-bus-service.js'
import { noteService } from '../services/note-service.js'
export class NoteTodo extends React.Component{

    state={
        note:null,
        todos:null,
        inputTodoTxt:''
    }
    componentDidMount(){
        console.log(this.props)
        noteService.getNoteById(this.props.note.id)
        .then(note=>{
            this.setState({note,todos:this.props.info.todos})
        })
    }
    onToggleTodo=(todoId)=>{
        const updatedTodos=this.state.todos;
        const todoIdx=updatedTodos.findIndex(todo=>todo.id===todoId)
        updatedTodos[todoIdx].doneAt=(updatedTodos[todoIdx].doneAt)? null:Date.now();
        this.updateAndSaveTodos(updatedTodos)
    }
    onRemoveTodo=(todoId)=>{
        const updatedTodos=this.state.todos;
        const todoIdx=updatedTodos.findIndex(todo=>todo.id===todoId)
        updatedTodos.splice(todoIdx,1)
        this.updateAndSaveTodos(updatedTodos)
    }
    updateAndSaveTodos(updatedTodos){
        this.setState(prevState=>({
            note:{
                ...prevState.note,
                infos:{
                    ...prevState.note.info,
                    todos:updatedTodos
                }
            }
            }), eventBusService.emit('save-note',this.state.note))
    }
    onAddTodo=()=>{
        const updatedTodos=this.state.todos;
        updatedTodos.unshift({txt:this.state.inputTodoTxt,doneAt:null,id:utilService.makeId()})
        this.updateAndSaveTodos(updatedTodos)
        this.setState(prevState=>({
            ...prevState,
            inputTodoTxt:''
        }))
        }
    handleChange=({target})=>{
        this.setState(prevState=>({
            ...prevState,
            inputTodoTxt:target.value
        }))
    }
    render (){
        const {note,todos,inputTodoTxt}=this.state
        
        if(!note) return <div>loading</div>
        return <div className="note-todo">
            <TodoList todos={todos} onToggleTodo={this.onToggleTodo} onAddTodo={this.onAddTodo} onRemoveTodo={this.onRemoveTodo} />
            <input type="text" value={inputTodoTxt} onChange={this.handleChange} placeholder="add an item to your list..."/>
            <button onClick={this.onAddTodo}>Add</button>
        </div>
    }

}