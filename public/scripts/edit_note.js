// Client facing scripts here
$(() => {
  const $categorySelect = $('#categories-select');
  const currentCategoryId = $categorySelect[0].dataset.currentCategoryId;

  const categoryOption = (category) => {
    if (category.id == currentCategoryId) {
      return `<option value="${category.id}" selected>${category.name}</option>`
    } else {
      return `<option value="${category.id}">${category.name}</option>`
    }
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
    }).fail(function(_data) {
      alert("Request failed");
    });
  }

  $('.delete-btn').click(function(event) {
    event.preventDefault()

    const noteId = this.dataset.noteId;

    $.ajax({
      method: 'DELETE',
      url: `/api/notes/${noteId}/delete`
    }).done(function(_data) {
      window.location.href = `/notes/${noteId}/edit`
    }).fail(function(data) {
      alert("Request failed");
    });
  });

  $('.cancel-btn').click(function(event) {
    event.preventDefault()
    window.location.reload()
  });

  $('.back-btn').click(function(event) {
    event.preventDefault()
    window.location.href = '/notes'
  })

  $('.edit-submit-btn').click(function(event) { // the Save Changes button
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: `/api/notes/${this.dataset.noteId}`,
      dataType: 'json',
      data: { id: this.dataset.noteId, categoryId: $('#categories-select').val(), content: $("input[name=content]").val() },
    }).done(function(_data) {
      window.location.reload()
    }).fail(function(_data) {
      alert("Request failed");
    });
  })

  loadCategories();
});
