export class NoteFilter extends React.Component {
    state = {
        filterBy:{
            txt: ''
        }
    }

handleChange=({target})=>{
    const field = target.name;
    const value= target.value; 
    this.setState({filterBy:{...this.state.filterBy,[field]:value}},()=>{
        this.props.onFilter(this.state.filterBy)
    })
}

    render() {
       const {txt}=this.state
        return <div className="note-filter">
        <input type="text" name="txt" value={txt} onChange={this.handleChange} placeholder="Search for Your Notes"/>
        </div>
    }


} 