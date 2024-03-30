// Client facing scripts here
$(() => {
  $('#new-note').submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser
    const form = $(this);
    const input = $('#new-note > input');
    const body = input.val()
    console.log(body)
    // $.ajax({
    //   type: form.attr('method'),
    //   url: form.attr('action'),
    //   data: form.serialize()
    // }).done(function(data) {
    //   // Optionally alert the user of success here...
    // }).fail(function(data) {
    //   // Optionally alert the user of an error here...
    // });
  });
});
