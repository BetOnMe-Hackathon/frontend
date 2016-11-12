'use strict';
var property_type;

$('#robbery').slider({
  max: 10000,
  step: 500,
  value: 0,
  orientation: 'horizontal',
  range: 'min',
  slide: function( event, ui ) {
    $( '#robbery-amount' ).html( ui.value );
  }
});

$('#disaster').slider({
  max: 10000,
  step: 500,
  value: 0,
  orientation: 'horizontal',
  range: 'min',
  slide: function (event, ui) {
    $( '#disaster-amount' ).html( ui.value );
  }
});



$( '#robbery-amount' ).html( $( '#robbery' ).slider('value') );
$( '#disaster-amount' ).html( $( '#disaster' ).slider('value') );

$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="radio"]').radiocheck();
$('[data-toggle="checkbox"]').radiocheck();
$('[data-toggle="switch"]').bootstrapSwitch({
  handleWidth: '500px'
});
$('[data-toggle="select"]').select2();


function loadPrice() {
  var switchScreens = function() {
    $('#screen-quote').addClass('hide');
    $('#screen-success').removeClass('hide');
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
      security: $('input[name="security"]').is(':checked'),
      reconstruction: $('input[name="reconstruction"]').is(':checked'),
      building_year: $('input[name="building_year"]').is(':checked'),
    }
  };

  console.log(data);

  // var request = $.ajax({
  //   url: "https://decc27d7.eu.ngrok.io/quotes",
  //   type: "POST",
  //   data: data
  // });

  // $('#screen-quote').addClass('zoomOutRight');
  // $('#screen-quote').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', switchScreens);
}

function showIndividualInfo() {
  $('#insurance_info button[onclick]').addClass('hide');
  $('#individual_info').removeClass('hide');
    $('html, body').animate({
        scrollTop: $('#individual_info').offset().top
    }, 2000);
}
function showInsuranceInfo() {
  $('#additional_options button[onclick]').addClass('hide');
  $('#insurance_info').removeClass('hide');
    $('html, body').animate({
        scrollTop: $('#insurance_info').offset().top
    }, 2000);
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
  $('#property_size').removeClass('hide');

  $('html, body').animate({
      scrollTop: $('#property_size').offset().top
  }, 2000);
})


$('select[name="property_size"]').on('change select', function () {
  if ($(this).val() !== 'Please select') {
    $('#construction_type').removeClass('hide');
    $('html, body').animate({
        scrollTop: $('#construction_type').offset().top
    }, 2000);
  }
});
$('select[name="construction_type"]').on('change select', function () {
  if ($(this).val() !== 'Please select') {
    $('#additional_options').removeClass('hide');
    $('html, body').animate({
        scrollTop: $('#additional_options').offset().top
    }, 2000);
  }
});
