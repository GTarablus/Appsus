import {TodoPreview} from './TodoPreview.jsx'
export function TodoList({todos,onToggleTodo,onRemoveTodo,onAddTodo}){

    return <div className="notes-container">
        {todos.map(todo =><TodoPreview todo={todo} key={todo.id} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo}/>)}

    </div>
}