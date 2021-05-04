import {NotePreview} from '../cmps/NotePreview.jsx'
export function NotesList({notes,onRemoveNote,onSaveNote}){

    return <section>
        {notes.map(note=><NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} onSaveNote={onSaveNote} />)}
    </section>
}