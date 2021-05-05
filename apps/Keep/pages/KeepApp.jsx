const { Link ,Route} = ReactRouterDOM;
import {NotesList} from '../cmps/NotesList.jsx'
import {noteService} from '../services/note-service.js'
import {NoteAdd} from '../cmps/NoteAdd.jsx'
import {EditNote} from '../cmps/EditNote.jsx'
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

  onSaveNote=(note)=>{
    noteService.saveNote(note).then(()=>this.loadNotes())
  }

  render() {
    const{notes}=this.state
    if(!notes) return <div>Loading...</div>
    return (
      <section className="keep-app">
        <h1>this is the keepApp </h1>
        <NoteAdd onSaveNote={this.onSaveNote}/>
        <Route component={EditNote} path="/keep/edit/:noteId"/>
      <NotesList notes={notes} onSaveNote={this.onSaveNote} onRemoveNote={this.onRemoveNote}/>
      </section>
    );
  }
}
