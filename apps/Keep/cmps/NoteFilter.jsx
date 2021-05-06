export class NoteFilter extends React.Component {
    state = {
        txt: ''
    }

handleChange=({target})=>{
    
}

    render() {
        return <input type="text" name="txt" onChange={this.handleChange} placeholder="Search for Your Notes"/>
    }


} 