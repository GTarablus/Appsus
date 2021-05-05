export function NoteVideo({note}){

    return <iframe className="note-video" src={`https://www.youtube.com/embed/${note.info.videoId}`}>
    </iframe>
}