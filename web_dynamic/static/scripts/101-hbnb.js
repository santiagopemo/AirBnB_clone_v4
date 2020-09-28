$('document').ready(() => {
  const amenities = {};
  const states = {};
  const cities = {};
  $('.amenities H4').css({ height: '16px', width: '85%', 'text-overflow': 'ellipsis', 'white-space': 'nowrap', overflow: 'hidden' });
  $('input[type="checkbox"]').css({ 'margin-right': '10px', padding: '0px' });
  $('.amenities input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete amenities[$(this).attr('data-id')];
    }
    if (Object.values(amenities).length >= 1) {
      $('.amenities H4').text(Object.values(amenities).join(', '));
    } else {
      $('.amenities H4').html('&nbsp;');
    }
  });
  $('.locations ul li h2 input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      states[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete states[$(this).attr('data-id')];
    }
    console.log(states);
  });
  $('.locations ul ul li input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      cities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if ($(this).is(':not(:checked)')) {
      delete cities[$(this).attr('data-id')];
    }
    console.log(cities);
  });
  $.ajax({
    // localhost instead of 0.0.0.0 to work on windows
    url: 'http://localhost:5001/api/v1/status/',
    success: (data) => {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
  $.ajax({
    type: 'POST',
    // localhost instead of 0.0.0.0 to work on windows
    url: 'http://localhost:5001/api/v1/places_search/',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: (data) => {
      renderPlaces(data);
    }
  });
  $('BUTTON').click(() => {
    $.ajax({
      type: 'POST',
      // localhost instead of 0.0.0.0 to work on windows
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      }),
      dataType: 'json',
      contentType: 'application/json',
      success: (data) => {
        renderPlaces(data);
      }
    });
  });
  function renderPlaces (data) {
    $('SECTION.places').empty();
    for (const place of data) {
      const template = `<article id="${place.id}">
                           <div class="title_box">
                              <h2>${place.name}</h2>
                              <div class="price_by_night">$${place.price_by_night}</div>
                           </div>
                           <div class="information">
                              <div class="max_guest">${place.max_guest} Guests</div>
                              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                              <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                           </div>
                           <div class="description">${place.description}</div>
                           <div class="reviews">
                                <h2>Reviews&nbsp;<span place-id="${place.id}">show</span></h2>
                                <ul></ul>
                           </div>
                        </article>`;
      $('SECTION.places').append(template);
    }
    $('.reviews H2').css({ 'font-size': '17px', padding: '0', margin: '30px 0px 0px 0px', 'padding-bottom': '7px', display: 'flex', 'justify-content': 'flex-start' });
    $('.reviews H2 SPAN').click(function () {
      const placeId = $(this).attr('place-id');
      if ($(this).text() === 'show') {
        $('#' + placeId + ' .reviews h2').css({ 'border-bottom': '1px solid #DDDDDD' });
        console.log(placeId);
        $.ajax({
          type: 'GET',
          // localhost instead of 0.0.0.0 to work on windows
          url: 'http://localhost:5001/api/v1/places/' + placeId + '/reviews',
          success: (data) => {
            console.log(data);
            for (const review of data) {
              const date = new Date(review.created_at);
              const day = date.getDate();
              const month = date.toLocaleString('en', { month: 'long' });
              const year = date.getFullYear();
              $.ajax({
                url: 'http://localhost:5001/api/v1/users/' + review.user_id,
                success: (data) => {
                  const template = `<li><h3>From ${data.first_name} ${data.last_name} the ${day}th ${month} ${year}</h3>
                                  <p>${review.text}</p>`;
                  $('#' + placeId + ' .reviews ul').append(template);
                }
              });
            }
            $(this).text('hide');
          }
        });
      } else {
        $('#' + placeId + ' .reviews h2').css({ 'border-bottom': 'none' });
        $('#' + placeId + ' .reviews ul').empty();
        $(this).text('show');
      }
    });
    $('.reviews ul').css({ 'list-style': 'none', padding: '0 0 0 0', margin: '0' });
    $('.reviews ul li').css({ 'padding-top': '18px' });
    $('.reviews ul li h3').css({ 'font-size': '14px', padding: '0', margin: '0' });
    $('.reviews ul li p').css({ 'font-size': '12px', padding: '0', margin: '0', 'padding-top': '5px' });
  }
});
