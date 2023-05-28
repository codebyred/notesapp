const notes = [
    {id:1, title: ""},
    {id:"2", title: ""},
    {id:3, title: ""}
]

let id = 2;

const newNotes = notes.filter(note => note.id != id );
console.log(newNotes);