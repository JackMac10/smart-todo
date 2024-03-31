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
        category = categories.find(category => category.name === 'Products');
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
      categoryContainer(data.note.category_id).append(noteHtml(data.note));
    }).fail(function(data) {
      // TODO: Handle error
    });
  });

  const categoryHtml = (category) => {
    const { id, name } = category;

    return `
      <div class='category-container' data-category-id=${id}>
        <strong>${name}</strong>
      </div>
    `
  }

  const noteHtml = (note) => {
    const { id, content } = note;

    return `<p class='note' data-note-id=${id}>${content}</p>`
  }

  const categoryContainer = (categoryId) => {
    return $(`[data-category-id=${categoryId}]`);
  }

  const loadNotes = () => {
    $.ajax({
      method: 'GET',
      url: `/api/notes?user_id=${userId}`,
    }).done(function(data) {
      for (const note of data.notes) {
        categoryContainer(note.category_id).append(noteHtml(note));
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

      $notesContainer.empty();

      for (const category of categories) {
        $notesContainer.append(categoryHtml(category));
      }

      loadNotes();
    }).fail(function(data) {
      // TODO: Handle error
    });
  }

  loadCategories();
});
