const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $(".list-container .list-group");
let notesArray = [];
// activeNote is used to keep track of the note in the textarea
let activeNote = {};
// A function for getting all notes from the db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};
// A function for saving a note to the db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};
// A function for deleting a note from the db
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};
// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = (idx) => {
  $saveNoteBtn.hide();
  if (idx) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(notesArray[idx].title);
    $noteText.val(notesArray[idx].text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};
// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote(notesArray.length - 1);
  });
};
// Delete the clicked note
const handleNoteDelete = function (event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();
  const noteId = $(this).parent(".list-group-item").data('id');
  // if (activeNote.id === note.id) {
  //   activeNote = {};
  // }
  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    // renderActiveNote(noteId);
  });
};
// Sets the activeNote and displays it
const handleNoteView = function () {
  activeNoteId = $(this).data('id');
  renderActiveNote(activeNoteId);
};
// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};
// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = function () {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};
// Render's the list of note titles
const renderNoteList = (notes) => {
  $noteList.empty();
  notesArray = notes;
  const noteListItems = [];
  // Returns jquery object for li with given text and delete button
  // unless withDeleteButton argument is provided as false
  const create$li = (note, idx, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(note.title);
    $li.data('id', idx);
    // console.log('$li: ', $li);
    // console.log('$li.data(id): ', $li.data('id'));
    $li.append($span);
    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }
    return $li;
  };
  if (notesArray.length === 0) {
    noteListItems.push(create$li("No saved Notes", 0, false));
  }
  notesArray.forEach((note, index) => {
    // const $li = create$li(note.title).data(note);
    const $li = create$li(note, index);
    noteListItems.push($li);
  });
  $noteList.append(noteListItems);
};
// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};
$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);
// Gets and renders the initial list of notes
getAndRenderNotes();
