const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function saveNotes() {
    const notes = [];
    document.querySelectorAll(".input-box").forEach((note) => {
        notes.push(note.innerText);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
        storedNotes.forEach(noteText => {
            createNote(noteText);
        });
    }
}

function createNote(noteText = "") {
    let noteWrapper = document.createElement("div");
    noteWrapper.className = "note-wrapper";

    let inputBox = document.createElement("div");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerText = noteText;

    let trashIcon = document.createElement("i");
    trashIcon.className = "fa-solid fa-trash";

    noteWrapper.appendChild(inputBox);
    noteWrapper.appendChild(trashIcon);
    notesContainer.appendChild(noteWrapper);

    trashIcon.addEventListener("click", function() {
        notesContainer.removeChild(noteWrapper);
        saveNotes();
    });

    inputBox.addEventListener("input", saveNotes);
}

window.onload = loadNotes;

createBtn.addEventListener("click", () => {
    createNote();
    saveNotes();
});
