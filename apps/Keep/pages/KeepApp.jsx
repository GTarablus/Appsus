const { Link ,Route} = ReactRouterDOM;
import {NotesList} from '../cmps/NotesList.jsx'
import {noteService} from '../services/note-service.js'
import {NoteAdd} from '../cmps/NoteAdd.jsx'
import {EditNote} from '../cmps/EditNote.jsx'
import {eventBusService} from '../../../services/event-bus-service.js'
import {IconPin} from '../cmps/icon-cmps/IconPin.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx';
export class KeepApp extends React.Component {

  removeEvent;
  state={
    notes:null,
    filterBy:{
      txt:''
    }
  }

  componentDidMount(){
    this.loadNotes()
    this.removeEvent = eventBusService.on('save-note', (note) =>this.onSaveNote(note))
      
  }

  componentWillUnmount(){
    this.removeEvent();
  }
loadNotes=()=>{
    noteService.query(this.state.filterBy).then(notes=>this.setState({notes}))
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

onFilter=(filterBy)=>{
  console.log('set filter')
  this.setState({ filterBy : {...this.state.filterBy, ...filterBy}},this.loadNotes)
}

  render() {
    const{notes}=this.state
    if(!notes) return <div>Loading...</div>
    return (
      <section className="keep-app" >
    
        <NoteAdd onSaveNote={this.onSaveNote}/>
        <NoteFilter onFilter={this.onFilter}/>
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
