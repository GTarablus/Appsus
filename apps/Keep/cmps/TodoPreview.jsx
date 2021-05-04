export function TodoPreview({todo,onRemoveTodo,onToggleTodo}){

    return <div className="todo-preview">
        <input type="checkbox" onChange={()=>onToggleTodo(todo.id)}/>
        <span className={(todo.doneAt)? 'todo-marked':'' }>{todo.txt}</span>
        <button onClick={()=>onRemoveTodo(todo.id)}>X</button>
    </div>
}