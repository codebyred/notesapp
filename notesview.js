import NotesApp from "./app.js";

const notesElement = document.querySelector(".notes");
const adNote = document.querySelector(".ad-new-note");
const popup = document.querySelector(".modal");
const closeElement = document.querySelector(".close-form")
const closeButton = document.querySelector(".close-form i");
const adNoteButton = document.querySelector(".adNote-button");
const titleElement = document.querySelector(".modal-title input");
const descriptionElement = document.querySelector(".modal-description textarea");

let isupdated = false;
let updatedId;

{/* <div class="note" data-id="5">

<div class="title">My name is Khan</div>
<div class="description">
     ipsum dolor sit amet, consectetur adipiscing elit, sed d
</div>
<div class="settings">
    <i class="uil uil-ellipsis-h"></i>
    <ul class="menu">
        <li><i class="uil uil-pen"></i>Edit</li>               
        <li><i class="uil uil-trash"></i>Delete</li>
    </ul>              
</div>

</div> */}

function showNotes(){

    document.querySelectorAll(".note").forEach((note,index) => note.remove());
    const notes = NotesApp.getNotesFromStrorage();
    notes.forEach((note, index)=>{
        createNote(note.id, note.title, note.description);
    });

}

showNotes();

function createElement(elementType){

    return document.createElement(elementType);

}

function addClass(element, className){

    return element.classList.add(className);

}

function addDataId(element, id){

    return element.dataset.id = id;

}

function addText(element, text){

    return element.innerHTML = text;

}

function addChildElement(element, childElement){

    if(typeof childElement == "string")
        return element.insertAdjacentHTML("beforeend", childElement);
    
    return element.appendChild(childElement);

}

function createNote(id, title, description){

    const noteElement = createElement("div");
    const titleElement = createElement("div");
    const descriptionElement = createElement("div");

    addClass(noteElement, "note");
    addDataId(noteElement, id);

    addClass(titleElement, "title");
    addClass(descriptionElement, "description");
    
    addText(titleElement, title);
    addText(descriptionElement, description);

    addChildElement(noteElement, titleElement);
    addChildElement(noteElement, descriptionElement);  
    addChildElement(noteElement, createSettings());
    addChildElement(notesElement, noteElement);

}

function createSettings(){

    const settingsElement = createElement("div");
    const settingsIcon = createElement("i");
    const menuElement = createElement("ul");
    const editElement = createElement("li");
    const deleteElement = createElement("li");
    const editIcon = createElement("i");
    const deleteIcon = createElement("i");

    addClass(settingsElement, "settings");
    addClass(settingsIcon, "uil");
    addClass(settingsIcon,"uil-ellipsis-h");

    addClass(menuElement, "menu");

    addClass(editElement, "edit");
    addClass(editIcon, "uil");
    addClass(editIcon, "uil-pen");

    addClass(deleteElement, "delete");
    addClass(deleteIcon, "uil");
    addClass(deleteIcon, "uil-trash");

    addChildElement(settingsElement, settingsIcon);
    addChildElement(settingsElement, menuElement)

    addChildElement(menuElement, editElement);
    addChildElement(menuElement, deleteElement);

    addChildElement(editElement, editIcon);
    addChildElement(deleteElement, deleteIcon);

    editElement.addEventListener("click",(e)=>{

        const note = NotesApp.getNote(editElement.closest(".note").dataset.id);
        console.log(note);

        isupdated = true;
        updatedId = note.id;

        titleElement.value = note.title;
        descriptionElement.value = note.description;

        adNoteButton.innerHTML = "Update Note";

        popup.showModal();
        
    });

    deleteElement.addEventListener("click",(e)=>{

        NotesApp.deleteNote(deleteElement.closest(".note").dataset.id);
        showNotes();

    });

    return settingsElement;

}

adNoteButton.addEventListener("click",()=>{

    if(isupdated){

        NotesApp.adNoteToStorage({id:updatedId, title:titleElement.value, description: descriptionElement.value});
        isupdated = false;
        
    }else{

        NotesApp.adNoteToStorage({id:"", title:titleElement.value, description: descriptionElement.value});

    }

    titleElement.value = "";
    descriptionElement.value = "";
    showNotes();

});

adNote.addEventListener('click',(e)=>{

    popup.showModal();

});

adNoteButton.addEventListener('click',(e)=>{

    e.preventDefault();
    popup.close();

});

closeButton.addEventListener('click',(e)=>{

    popup.close();

});

