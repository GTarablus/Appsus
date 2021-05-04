import {TodoList} from './TodoList.jsx'
import {utilService} from '../../../services/util-service.js'
export class NoteTodo extends React.Component{

    state={
        note:this.props.note,
        todos:this.props.note.info.todos,
        inputTodoTxt:''
    }
    componentDidMount(){
        console.log(this.props)
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
                info:{
                    ...prevState.note.info,
                    todos:updatedTodos
                }
            }
            }),this.props.onSaveNote(this.state.note))
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
        const {inputTodoTxt}=this.state
        return <div className="note-todo">
            <TodoList todos={this.props.note.info.todos} onToggleTodo={this.onToggleTodo} onAddTodo={this.onAddTodo} onRemoveTodo={this.onRemoveTodo} />
            <input type="text" value={inputTodoTxt} onChange={this.handleChange}/>
            <button onClick={this.onAddTodo}>Add</button>
        </div>
    }

}