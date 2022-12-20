const newNote = document.querySelector(".new-note");

newNote.addEventListener("click", () => {
  addNewNote();
});

// get from ls
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

function addNewNote(tt = "") {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  noteDiv.innerHTML = `
    <div class="note">
    <div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${tt ? "" : "hidden"}"></div>
    <textarea class="${tt ? "hidden " : ""}"></textarea>
    </div>
    `;
  const editBtn = noteDiv.querySelector(".edit");
  const deleteBtn = noteDiv.querySelector(".delete");
  const mainel = noteDiv.querySelector(".main");
  const textareaEl = noteDiv.querySelector("textarea");
  textareaEl.value = tt;
  mainel.innerHTML = marked.parse(tt);
  // console.log((mainel.innerHTML = marked.parse(tt)));
  editBtn.addEventListener("click", () => {
    mainel.classList.toggle("hidden");
    textareaEl.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    noteDiv.remove();
    updateLs();
  });

  textareaEl.addEventListener("input", (e) => {
    {
      passive: true;
    }
    const { value } = e.target;
    mainel.innerHTML = marked.parse(value);
    updateLs();
    // textareaEl.innerHTML = marked(value);
  });
  document.body.appendChild(noteDiv);
}

function updateLs() {
  const noteText = document.querySelectorAll("textarea");

  const notes = [];
  noteText.forEach((note) => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
