// This file is for the demo ONLY. Do not use outside of this context.
$(document).ready(function(){

  //blocks click attempts
  $('a').on({
    'click': function(e){
      e.preventDefault();
    }
  });

  $('.field__input--textbox').on({
    'focus': function(){
      //alert('working');
      $(this).prev('.field__label-text').removeClass('.field__label-text').addClass('field__label-text--is-hidden');
    },
    'focusout': function(){
      var currentVal = $(this).val();
      currentVal = currentVal.trim();
      if(!currentVal) {
        $(this).prev('.field__label-text--is-hidden').removeClass('field__label-text--is-hidden');
      }
    }
  });

  //toggles sidebar visibility
  $('#demo_sidebarToggle').on({
    'click': function(e){
      $('#demo_sidebar').toggleClass('page__sidebar--is-active');
    }
  });

  $('#demo__modalToggle,#demo__modalClose,#demo__modalSubmit').on({
    'click': function(e) {
      $('#demo__modal').toggleClass('modal--is-active');
    }
  });

  $('#demo__modalFullScreenToggle,#demo__modalFullScreenClose,#demo__modalFullScreenSubmit').on({
    'click': function(e) {
      $('#demo__modalFullScreen').toggleClass('modal--is-active');
    }
  });

});
