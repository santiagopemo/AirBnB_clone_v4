$('document').ready(() => {
  const amenities = {};
  $('.amemnities.popover ul li input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities) >= 1) {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    } else {
      $('.amenities H4').text('&nbsp;');
    }
  });
});
