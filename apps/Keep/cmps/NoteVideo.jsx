export function NoteVideo({note}){

    return <iframe src={`https://www.youtube.com/embed/${note.info.videoId}`}>
    </iframe>
}