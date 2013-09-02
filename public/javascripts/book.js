$(document).ready(function() {

  // Bind click event to submit buttom of edit_book form
  $('input[type="submit"][name="create_book"]').bind('click', function(e) {
    e.preventDefault();
    $('form[name="new_book"]').submit();
  });

  // Bind an event handler to the "submit" event on edit_book forms
  $('form[name="new_book"]').on('submit', function(e) {
    e.preventDefault();
    var isbn = $(this).find('input[name="isbn"]').val();
    data = $(this).serialize();
    $.ajax({  
      type: "POST",  
      url: "/books",
      headers: { Accept: 'application/json' },  
      data: data,  
      success: function(result) {
        window.location.href = '/books/' + isbn;
      },
      error: function(result) {
        $('div#alert').hide();
        $('div#alert').html('<div class="alert-box alert"> Oops. There was an error creating this book. </div>');
        $('div#alert').slideDown('slow', function() {
          $('div#alert').delay(1000).slideUp('slow');
        });
      }   
    });
    return false;
  });

  // Bind click event to submit buttom of edit_book form
  $('input[type="submit"][name="update_book"]').bind('click', function(e) {
    e.preventDefault();
    $('form[name="edit_book"]').submit();
  });

  // Bind an event handler to the "submit" event on edit_book forms
  $('form[name="edit_book"]').on('submit', function(e) {
    e.preventDefault();
    var isbn = $(this).find('input[name="isbn"]').val();  
    data = $(this).serialize();
    $.ajax({  
      type: "PUT",  
      url: "/books/" + isbn,
      headers: { Accept: 'application/json' },  
      data: data,  
      success: function(result) {
        window.location.href = '/books/' + isbn;
      },
      error: function(result) {
        $('div#alert').hide();
        $('div#alert').html('<div class="alert-box alert"> Oops. There was an error updating this book. </div>');
        $('div#alert').slideDown('slow', function() {
          $('div#alert').delay(1000).slideUp('slow');
        });
      }   
    });
    return false;
  });
  
  // bind click event to remove buttons
  $('button.remove').bind('click', function(e) {
    e.preventDefault();
    var isbn = $(this).data('isbn');
    $.ajax({  
      type: "DELETE",  
      url: "/books/" + isbn,
      headers: { Accept: 'application/json' },
      success: function(result) {
        window.location.href = '/books';
      },
      error: function(result) {
        $('div#alert').hide();
        $('div#alert').html('<div class="alert-box alert"> Oops. There was an error removing this book. </div>');
        $('div#alert').slideDown('slow', function() {
          $('div#alert').delay(1000).slideUp('slow');
        });
      }   
    });
  });
  
})