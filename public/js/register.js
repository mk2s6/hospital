$(function () {

    $('#submitBtn').on('click', function(event) {
        event.preventDefault();
        var username = $('#adminId').val();
        var password = $('#pass').val();
        
    	var user = {
            username : username,
    		password : password,
    	};

        console.log(user);

        $.ajax({
            url : '/register',
            method : 'POST',
            contentType: 'application/json',
            data : JSON.stringify(user),
            success : function (res) {
                if(window.confirm(res.msg)) {
                    window.location = res.redirectTo;
                }
            },
            error : function (res,e, ts, et) {
                alert("error");
                console.log(res +"some error" + ts + " " + et);
            }
        });
    });
    
    $('input[type=password]').keyup(function(event) {
        event.preventDefault();

        pswd = $(this).val();
        var length = $('#length');
        var smallCh = $('#smallCh');
        var capital =  $('#capital');
        var number = $('#number');
        var matches = $('#matches');
        if ( pswd.length < 8 ) {
            length.removeClass('valid').addClass('invalid');
        } else {
            length.removeClass('invalid').addClass('valid');
        }
        if ( pswd.match(/[a-z]/) ) {
            smallCh.removeClass('invalid').addClass('valid');
        } else {
            smallCh.removeClass('valid').addClass('invalid');
        } 
        if ( pswd.match(/[A-Z]/) ) {
            capital.removeClass('invalid').addClass('valid');
        } else {
            capital.removeClass('valid').addClass('invalid');
        } 
        if ( pswd.match(/\d/)) {
            number.removeClass('invalid').addClass('valid');
        } else {
            number.removeClass('valid').addClass('invalid');
        }
        console.log($('#pass').val());
        console.log($('#rePass').val());
        if($('#rePass').val() == $('#pass').val()) {
        matches.removeClass('invalid').addClass('valid');
        } else {
        matches.removeClass('valid').addClass('invalid');
        }

        }).focus(function() {
            var info = $('#' + $(this).attr('data-type'));
            info.show();

        }).blur(function() {
            var info = $('#' + $(this).attr('data-type'));
            info.hide();
    });
    $('#regForm').on('keyup', function(event) {
        var submitBtn = $('#submitBtn');
        var valid = $(this).children('#pwd-info1, #pwd-info2').children('.invalid').length;
        if(valid === 0 ) {
            submitBtn.removeAttr('disabled');
        	password = pswd;
        }
        else submitBtn.attr('disabled', 'true');
    });
});