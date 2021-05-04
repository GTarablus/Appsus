const { Link } = ReactRouterDOM;
import {NotesList} from '../cmps/NotesList.jsx'
import {noteService} from '../services/note-service.js'
import {NoteAdd} from '../cmps/NoteAdd.jsx'
export class KeepApp extends React.Component {

  state={
    notes:null
  }

  componentDidMount(){
    this.loadNotes()
  }
loadNotes=()=>{
    noteService.query().then(notes=>this.setState({notes}))
  }

  onRemoveNote=(id)=>{
    noteService.removeNoteById(id).then(()=>this.loadNotes())
  }

  onAddNote=(note)=>{
    noteService.addNote(note).then(()=>this.loadNotes())
  }

  render() {
    const{notes}=this.state
    if(!notes) return <div>Loading...</div>
    return (
      <section className="main-container">
        <h1>this is the keepApp </h1>
        <NoteAdd onAddNote={this.onAddNote}/>
      <NotesList notes={notes} onRemoveNote={this.onRemoveNote}/>
      </section>
    );
  }
}
