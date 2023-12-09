/* eslint-disable no-const-assign */
/* eslint-disable no-empty */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
// eslint-disable-next-line linebreak-style
$(document).ready(function() {
  $('.new-tweet form textarea').on('input', function() {
    let maxLength = 140;
    let currentLength = $(this).val().length;
    let remaining = maxLength - currentLength;
    let counterElement = $('.counter');
    counterElement.text(remaining);
    if (remaining < 0) {
      counterElement.css('color', 'red');
    } else {
      counterElement.css('color', ''); // Reset color to default
    }

  });
});