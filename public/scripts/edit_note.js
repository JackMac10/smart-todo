// Client facing scripts here
$(() => {
  const $categorySelect = $('#categories-select');

  const categoryOption = (category) => {
    console.log("category ------> : ", category);
    return `<option value="${category.id}">${category.name}</option>`
  }

  const loadCategories = () => {
    $.ajax({
      method: 'GET',
      url: `/api/categories`,
    }).done(function(data) {
      $categorySelect.empty();

      for (let category of data.categories) {
        $categorySelect.append(categoryOption(category))
      }
    }).fail(function(data) {
      // TODO: Handle error
    });
  }

  $('.delete-btn').click(function(event) {
    event.preventDefault()
    // notes api to delete
    // if ok window.location.href = "/notes"
  });

  $('.cancel-btn').click(function(event) {
    event.preventDefault()
    window.location.reload()
  });

  $('.back-btn').click(function(event) {
    event.preventDefault()
    window.location.href = '/notes'
  })

  $('.edit-submit-btn').click(function(event) {
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: `/api/notes/${this.dataset.noteId}/edit`,
      data: $('.edit-form').serialize()
    }).done(function(data) {

      categoryContainer(data.note.category_id).append(noteHtml(data.note));
    }).fail(function(data) {
      // TODO: Handle error
    });
  })

  loadCategories();
});
