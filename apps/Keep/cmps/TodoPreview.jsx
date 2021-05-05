export function TodoPreview({todo,onRemoveTodo,onToggleTodo}){

    return <div className="todo-preview" onClick={(ev)=>ev.stopPropagation()}>
        <input type="checkbox" onChange={(ev)=>{
            ev.stopPropagation()
            onToggleTodo(todo.id)
        }}/>
        <span className={(todo.doneAt)? 'todo-marked':'' }>{todo.txt}</span>
        <button onClick={(ev)=>{
            ev.stopPropagation()
            onRemoveTodo(todo.id)}
            }>X</button>
    </div>
}