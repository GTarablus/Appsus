import {NotePreview} from '../cmps/NotePreview.jsx'
export function NotesList({notes,onRemoveNote,onSaveNote,onTogglePinNote}){

    return <section className="notes-container">
        {notes.map(note=><NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote} onTogglePinNote={onTogglePinNote} />)}
    </section>
}