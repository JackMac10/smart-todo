// Client facing scripts here
$(() => {
  $('#new-note').submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser
    const form = $(this);
    const input = $('#new-note > input');
    const body = input.val()

    $.ajax({
      method: 'POST',
      url: `/api/notes`,
      data: body
    }).done(function(data) {

    }).fail(function(data) {
      // TODO: Handle error
    });
  });

  const $notesContainer = $('#notes-container');
  const userId = $notesContainer.data('userId');

  const noteHtml = (note) => {
    const { id, content } = note;

    return `
      <article class='note' data-note-id=${id}>
        <p>${content}</p>
      </article>
    `
  }

  const loadNotes = () => {
    $.ajax({
      method: 'GET',
      url: `/api/notes?user_id=${userId}`,
    }).done(function(data) {
      $notesContainer.empty()

      for (const note of data.notes) {
        $notesContainer.append(noteHtml(note));
      }
    }).fail(function(data) {
      // TODO: Handle error
    });
  }

  const loadCategories = () => {
    $.ajax({
      method: 'GET',
      url: `/api/categories`,
    }).done(function(data) {
      categories = data.categories;
      loadNotes();
    }).fail(function(data) {
      // TODO: Handle error
    });
  }

  loadCategories();
});
