import {NotePreview} from '../cmps/NotePreview.jsx'
export function NotesList({notes,onRemoveNote}){


    return <section>
        {notes.map(note=><NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote} />)}
    </section>
}