export default class NotesApp{

    static getNote(id){

        const notes = this.getNotesFromStrorage();

        return notes.find((note)=> note.id == id);

    }

    static getNotesFromStrorage(){

        return JSON.parse(localStorage.getItem("notes")) || [];

    }

    static adNoteToStorage({id, title, description}){

        const notes = this.getNotesFromStrorage();

        if(id === ""){

            id = Math.floor(Math.random() * 1000);
            notes.push({id, title, description});


        }else{

            const note = notes.find((note) => note.id == id);
            note.title = title;
            note.description = description;

        }

        localStorage.setItem("notes",JSON.stringify(notes));

    }


    static deleteNote(id){

        console.log(id);

        const notes = this.getNotesFromStrorage();

        console.log(notes);

        const notesNew = notes.filter(note => note.id != id );

        console.log(notesNew);

        localStorage.setItem("notes",JSON.stringify(notesNew));

    }
}


