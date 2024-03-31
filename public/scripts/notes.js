// Client facing scripts here
$(() => {
  const $notesContainer = $('#notes-container');
  const userId = $notesContainer.data('userId');
  let categories = [];

  const buildNote = (userId, content, categories) => {
    let newNote = { userId: userId, content: content };
    let category = undefined

    switch (true) {
      case (content.includes('Watch')) || (content.includes('watch')):
        category = categories.find(category => category.name === 'Films/TV Shows');
        break;
      case (content.includes('Read')) || (content.includes('read')):
        category = categories.find(category => category.name === 'Books');
        break;
      case (content.includes('Eat')) || (content.includes('eat')):
        category = categories.find(category => category.name === 'Restaurants');
        break;
      case (content.includes('Buy')) || (content.includes('buy')):
        category = categories.find(category => category.name === 'Product');
        break;
      default:
        category = categories.find(category => category.name === 'Other');
        break;
    }

    newNote.categoryId = category.id

    return newNote // { userId: 123, categoryId: 123, content: "content" }
  }

  $('#new-note').submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser
    const form = $(this);
    const input = $('#new-note > input');
    const newNote = buildNote(userId, input.val(), categories)

    $.ajax({
      method: 'POST',
      url: `/api/notes`,
      data: { note: newNote }
    }).done(function(data) {
      $notesContainer.append(noteHtml(data.note));
    }).fail(function(data) {
      // TODO: Handle error
    });
  });

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
