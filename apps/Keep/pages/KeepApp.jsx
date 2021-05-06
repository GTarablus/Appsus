const { Link ,Route} = ReactRouterDOM;
import {NotesList} from '../cmps/NotesList.jsx'
import {noteService} from '../services/note-service.js'
import {NoteAdd} from '../cmps/NoteAdd.jsx'
import {EditNote} from '../cmps/EditNote.jsx'
import {eventBusService} from '../../../services/event-bus-service.js'
import {IconPin} from '../cmps/icon-cmps/IconPin.jsx'
export class KeepApp extends React.Component {

  removeEvent;
  state={
    notes:null
  }

  componentDidMount(){
    this.loadNotes()
    this.removeEvent = eventBusService.on('save-note', (note) =>this.onSaveNote(note))
      
  }

  componentWillUnmount(){
    this.removeEvent();
  }
loadNotes=()=>{
    noteService.query().then(notes=>this.setState({notes}))
  }

  onRemoveNote=(id)=>{
    noteService.removeNoteById(id).then(()=>this.loadNotes())
  }

  
onTogglePinNote=(note)=>{
  note.isPinned=!note.isPinned;
  noteService.saveNote(note).then(()=>this.loadNotes())
}
  onSaveNote=(note)=>{
    noteService.saveNote(note).then(()=>this.loadNotes())
  }
  //on update color 



  render() {
    const{notes}=this.state
    if(!notes) return <div>Loading...</div>
    return (
      <section className="keep-app">
        <h1>this is the keepApp </h1>
        <NoteAdd onSaveNote={this.onSaveNote}/>
        {notes.some(note=>note.isPinned)&& <div className="pinned-notes-section">
          <h3>PINNED <IconPin/> </h3>
      <NotesList notes={notes.filter(note=>note.isPinned)} onSaveNote={this.onSaveNote} onRemoveNote={this.onRemoveNote} onTogglePinNote={this.onTogglePinNote}/>
        </div> }
        <Route component={EditNote} path="/keep/edit/:noteId"/>
      <NotesList notes={notes.filter(note=>!note.isPinned)} onSaveNote={this.onSaveNote} onRemoveNote={this.onRemoveNote} onTogglePinNote={this.onTogglePinNote}/>
      </section>
    );
  }
}
