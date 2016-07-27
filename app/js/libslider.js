function libSlider() {
  if ($('#libSlider').hasClass('shift-left')) {
    $('#libSlider').removeClass('shift-left');
    $('.header h1').removeClass('shift-left');
  } else {
    $('#libSlider').addClass('shift-left');
    $('.header h1').addClass('shift-left');
  };
};
