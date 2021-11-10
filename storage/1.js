
  $('#passFieldInput').on('keyup',function(e){

    if ($(this).val() == "") {
      $('#emptyPass')
      .html('Поле не может быть пустым');
      $('#passField').removeClass('succhess_field');
      $('#emptyPass').removeClass('succhess');
      $('#passField').addClass('wrong_field');
      $('#emptyPass').removeClass('hidden');
      $('#emptyPass').addClass('visible');
      $('#emptyPass').addClass('wrong'); 
    } else {
      $('#emptyPass')
      .html('Успех !');
      $('#emptyPass').removeClass('hidden');
      $('#emptyPass').addClass('visible');
      $('#emptyPass').removeClass('wrong'); 
      $('#passField').removeClass('wrong_field');
      $('#passField').addClass('succhess_field');
      $('#emptyPass').addClass('succhess'); 
    
    }
    
    }), 
    
    $('#loginFieldInput').on('keyup',function(e){
    
    if ($(this).val() == "") {
      $('#emptyLogin')
      .html('Поле не может быть пустым');
      $('#loginField').removeClass('succhess_field');
      $('#emptyLogin').removeClass('succhess');
      $('#loginField').addClass('wrong_field');
      $('#emptyLogin').removeClass('hidden');
      $('#emptyLogin').addClass('visible');
      $('#emptyLogin').addClass('wrong'); 
    } else {
      const regexp = /^[a-zA-Z0-9]+$/i;
      if(!regexp.test($(this).val())) {
      $('#emptyLogin')
      .html('Допустимые символы: a-z, A-Z, 0-9');
      $('#loginField').removeClass('succhess_field');
      $('#emptyLogin').removeClass('succhess');
      $('#loginField').addClass('wrong_field');
      $('#emptyLogin').removeClass('hidden');
      $('#emptyLogin').addClass('visible');
      $('#emptyLogin').addClass('wrong');
    }  else {
      $('#emptyLogin')
      .html('Успех !');
      $('#emptyLogin').removeClass('hidden');
      $('#emptyLogin').addClass('visible');
      $('#emptyLogin').removeClass('wrong'); 
      $('#loginField').removeClass('wrong_field');
      $('#loginField').addClass('succhess_field');
      $('#emptyLogin').addClass('succhess'); 
    }
    }
    
    }), 
    
    
    
    $( "form" ).submit(function() {
    event.preventDefault();
    let name = this.username.value
    let pass = this.password.value
    const a = /^[а-яА-ЯЁё]+$/g;
    const b = /^\s+|\s+$/g;
    name = name.replace(b, '');
    if(!name) {
    $('#emptyLogin')
      .html('Поле не может быть пустым');
      $('#loginField').removeClass('succhess_field');
      $('#emptyLogin').removeClass('succhess');
      $('#loginField').addClass('wrong_field');
      $('#emptyLogin').removeClass('hidden');
      $('#emptyLogin').addClass('visible');
      $('#emptyLogin').addClass('wrong'); 
    } else {
    name = name.replace(a, '');
    if(!name) {
      $('#emptyLogin')
      .html('Допустимые символы: a-z, A-Z, 0-9');
      $('#loginField').removeClass('succhess_field');
      $('#emptyLogin').removeClass('succhess');
      $('#loginField').addClass('wrong_field');
      $('#emptyLogin').removeClass('hidden');
      $('#emptyLogin').addClass('visible');
      $('#emptyLogin').addClass('wrong'); 
    } else {
      pass = pass.replace(b, '');
      if(!pass){
        $('#emptyPass')
      .html('Поле не может быть пустым');
      $('#passField').removeClass('succhess_field');
      $('#emptyPass').removeClass('succhess');
      $('#passField').addClass('wrong_field');
      $('#emptyPass').removeClass('hidden');
      $('#emptyPass').addClass('visible');
      $('#emptyPass').addClass('wrong'); 
      } else {
        
        fetch('/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name, password: pass }),
        })
        .then((response) => response.json())
        .then((data) => {
          $('div.headerForm').addClass('hidden');
          $('#loginField').addClass('hidden');
          $('#passField').addClass('hidden');
          let obj = data;
          $('div.inputForm').html("<div class='response'>" + obj.message + "</div>");
          $('button.buttonForm').addClass('hidden');
          console.log(obj.token);
        });
      }
    }
    }
    });