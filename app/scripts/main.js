'use strict';
var property_type;

$('#robbery').slider({
  max: 100000,
  step: 1000,
  value: 15000,
  orientation: 'horizontal',
  range: 'min',
  slide: function( event, ui ) {
    $( '#robbery-amount' ).html( ui.value );
  }
});

$('#disaster').slider({
  max: 100000,
  step: 1000,
  value: 50000,
  orientation: 'horizontal',
  range: 'min',
  slide: function (event, ui) {
    $( '#disaster-amount' ).html( ui.value );
  }
});

$('#vandalism').slider({
  max: 100000,
  step: 1000,
  value: 30000,
  orientation: 'horizontal',
  range: 'min',
  slide: function (event, ui) {
    $( '#vandalism-amount' ).html( ui.value );
  }
});
$('#fire').slider({
  max: 100000,
  step: 1000,
  value: 90000,
  orientation: 'horizontal',
  range: 'min',
  slide: function (event, ui) {
    $( '#fire-amount' ).html( ui.value );
  }
});
$('#leakage').slider({
  max: 100000,
  step: 1000,
  value: 0,
  orientation: 'horizontal',
  range: 'min',
  slide: function (event, ui) {
    $( '#leakage-amount' ).html( ui.value );
  }
});



$( '#robbery-amount' ).html( $( '#robbery' ).slider('value') );
$( '#disaster-amount' ).html( $( '#disaster' ).slider('value') );
$( '#leakage-amount' ).html( $( '#leakage' ).slider('value') );
$( '#vandalism-amount' ).html( $( '#vandalism' ).slider('value') );
$( '#fire-amount' ).html( $( '#fire' ).slider('value') );

$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="radio"]').radiocheck();
$('[data-toggle="checkbox"]').radiocheck();
$('[data-toggle="switch"]').bootstrapSwitch({
  handleWidth: '500px'
});
$('[data-toggle="select"]').select2();


function loadPrice() {
  var switchScreens = function() {
    $('#screen-quote').addClass('hide-xs-block');
    $('#screen-success').removeClass('hide-xs-block');
  };

  var data = {
    customer_email: $('input[name="email"]').val(),
    bidding_duration: 86400, // @todo: waiting_time
    data: {
      property_type: property_type,
      construction_type: $('select[name="construction_type"]').val(),
      property_size: $('select[name="property_size"]').val(),
      disaster: $( '#disaster' ).slider('value'),
      robbery: $( '#robbery' ).slider('value'),
      vandalism: $( '#vandalism' ).slider('value'),
      leakage: $( '#leakage' ).slider('value'),
      fire: $( '#fire' ).slider('value'),
      security: $('input[name="security"]').is(':checked'),
      reconstruction: $('input[name="reconstruction"]').is(':checked'),
      building_year: $('input[name="building_year"]').is(':checked'),
    }
  };

  console.log(data);

  var request = $.ajax({
    url: 'https://api.bidonme.eu/quotes',
    type: 'POST',
    data: data
  });

  request.done(function () {
    swal({
      title: 'Quote successfully requested!',
      text: 'We will get back to You via e-mail with the best possible offer You can get.',
      type: 'success',
      showConfirmButton: false
    })
  });

  request.fail(function (response) {
    for (var error in response.responseJSON) {}
    console.log('fail', arguments);
    var err = 'Unknown error';

    if (response.responseJSON !== undefined || response.responseJSON[error] !== undefined || response.responseJSON[error][0] !== undefined) {
      err = response.responseJSON[error][0];
    }
    swal('An error occurred!', err, 'error')
  });

  // $('#screen-quote').addClass('zoomOutRight');
  // $('#screen-quote').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', switchScreens);
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    $('.select2-search__field').attr('readonly', true);
}
$('.select2-container').each(function () {
    if (!$(this).hasClass('select2-container-multi')) {
        $('input', this).remove();
    }
});

function showIndividualInfo() {
  $('#insurance_info button[onclick]').addClass('hide');
  $('#individual_info').removeClass('visible-xs-block');
    $('html, body').animate({
        scrollTop: $('#individual_info').offset().top
    }, 1000);
}
function showInsuranceInfo() {
  $('#additional_options button[onclick]').addClass('hide');
  $('#insurance_info').removeClass('visible-xs-block');
    $('html, body').animate({
        scrollTop: $('#insurance_info').offset().top
    }, 1000);
}




// Input show/hide
$('#property_type button').on('click', function () {
  property_type = $(this).data('val');
  $('#property_type button').removeClass('btn-warning');
  // $('#property_type .fa').addClass('animated fadeOut');
  // $('#property_type .fa').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
  //   $('#property_type .fa').addClass('hide');
  // });

  $(this).addClass('btn-warning');
  $('#property_size').removeClass('visible-xs-block');

  $('html, body').animate({
      scrollTop: $('#property_size').offset().top
  }, 1000);
})


$('select[name="property_size"]').on('change select', function () {
  if ($(this).val() !== 'Please select') {
    $('#construction_type').removeClass('visible-xs-block');
    $('html, body').animate({
        scrollTop: $('#construction_type').offset().top
    }, 1000);
  }
});
$('select[name="construction_type"]').on('change select', function () {
  if ($(this).val() !== 'Please select') {
    $('#additional_options').removeClass('visible-xs-block');
    $('html, body').animate({
        scrollTop: $('#additional_options').offset().top
    }, 1000);
  }
});










// FIGHT page
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (getParameterByName('id')) {
  var offers = {};
  var stopped = false;
  var quoteObject;
  var loadQuote = function (id) {
    var request = $.ajax({
      url: 'https://api.bidonme.eu/quotes/' + id,
      type: 'GET'
    });

    request.done(function (response) {
      quoteObject = response;
      var delay = 0;

      $('#loader').addClass('hide');

      if (Object.keys(response).length > 0) {
        $('#no-quotes').addClass('hide');
        $('#time').removeClass('hide');
      } else {
        $('#no-quotes').removeClass('hide');
      }

      for (var round in response) {
        for (var i in response[round].bids) {
          if (response[round].bids[i].offer_price === null) {
            continue;
          }

          if (offers[response[round].bids[i].offer_id] === true) {
            continue;
          }

          offers[response[round].bids[i].offer_id] = true;

          var price = response[round].bids[i].offer_price,
            offerId = response[round].bids[i].offer_id;

          $('#bids').prepend(
            '<div class="row animated fadeIn hide" id="offer-' + offerId + '">' +
              '<div class="col-sm-offset-3 col-sm-6 well">' +
                '<div class="row">' +
                  '<div class="col-xs-4">' +
                    '<img src="http://localhost:9000/images/logo.png" height="40px">' +
                  '</div>' +
                  '<div class="col-xs-5">' +
                    '<span style="font-size: 25px">€ ' + (price/100) + '</span>'  +
                  '</div>' +
                  '<div class="col-xs-3">' +
                    '<button class="btn btn-warning btn-block" onclick="buy('+ price + ', \'' + offerId + '\')">Buy</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>'
          );

          setTimeout(function() {
            $($('#bids .hide')[0]).removeClass('hide');
          }, 300 * delay);

          delay += 1;
        }
      }

      if (Object.keys(response).length > 0) {
        $('#time-remaining').html(moment(response[round].expires * 1000).fromNow());
      }

      setTimeout(function () {
        if (stopped === true) {
          return
        }
        loadQuote(id);
      }, 3000);
    });

    request.fail(function () {
      swal({
        title: 'An error occurred!',
        text: 'Sorry, but this page is invalid.',
        type: 'error',
        // showConfirmButton: false
      });
    });
  }

  loadQuote(getParameterByName('id'));

  var handler = StripeCheckout.configure({
    key: 'pk_test_gGD5angznT3xQIkvIGYHMprN',
    image: 'http://www.bidonme.eu/images/logo.png',
    locale: 'auto',
    currency: 'usd',
    token: function(token) {
      var data = {
        'token': token.id,
        'offer_id': offerId,
      };

      stopped = true;
      var request = $.ajax({
        url: 'https://api.bidonme.eu/payment',
        type: 'POST',
        data: data
      });

      $('#loader').removeClass('hide');
      $('#bids').addClass('hide');

      request.done(function () {
        swal({
          title: 'Policy successfully purchased!',
          text: 'The policy documentation will shortly arrive at your email.',
          type: 'success',
          showConfirmButton: false
        });
        $('#loader').addClass('hide');
      });

      request.fail(function () {
        swal({
          title: 'An error occurred!',
          text: 'Sorry, but something went wrong.',
          type: 'error',
          showConfirmButton: false
        });
        $('#loader').addClass('hide');
      });
    }
  });

  var offerId;

  function buy(price, offer) {
    offerId = offer;

    $('#offer-' + offer + ' button').attr('disabled');

    handler.open({
      name: 'BetOnMe',
      description: 'Property Insurance',
      zipCode: false,
      bitcoin: true,
      amount: price
    });

  }
}
