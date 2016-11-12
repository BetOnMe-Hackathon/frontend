'use strict';

$('#contents').slider({
  max: 10000,
  step: 500,
  value: 0,
  orientation: 'horizontal',
  range: 'min',
  slide: function( event, ui ) {
    $( '#contents-amount' ).html( ui.value );
  }
});

$('#compensation').slider({
  max: 10000,
  step: 500,
  value: 0,
  orientation: 'horizontal',
  range: 'min',
  slide: function (event, ui) {
    $( '#compensation-amount' ).html( ui.value );
  }
});



$( '#contents-amount' ).html( $( '#contents' ).slider('value') );
$( '#compensation-amount' ).html( $( '#compensation' ).slider('value') );

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
  }();

  // $('#screen-quote').addClass('zoomOutRight');
  // $('#screen-quote').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', switchScreens);
}

function showIndividualInfo() {
  $('#insurance_info button[onclick]').addClass('hide');
  $('#individual_info').removeClass('hide');
}
function showInsuranceInfo() {
  $('#additional_options button[onclick]').addClass('hide');
  $('#insurance_info').removeClass('hide');
}




// Input show/hide
$('#property_type button').on('click', function () {
  $('#property_type button').removeClass('btn-warning');
  $(this).addClass('btn-warning');
  $('#property_size').removeClass('hide');
})


$('select[name="property_size"]').on('change select', function () {
  if ($(this).val() !== 'Please select') {
    $('#construction_type').removeClass('hide');
  }
});
$('select[name="construction_type"]').on('change select', function () {
  if ($(this).val() !== 'Please select') {
    $('#additional_options').removeClass('hide');
  }
});
