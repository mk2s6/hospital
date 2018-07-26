$(function() {

    const next = $('#next');
    const prev = $('#previous');
    var count = 0;

    $(window).on('load', function(){
        fetch(count);
    });

    var patientTemplate = "\
                        <tr id='{{pid}}'>\
                            <td>{{pid}}</td>\
                            <td>{{pname}}</td>\
                            <td>{{pgender}}</td>\
                            <td>{{page}}</td>\
                            <td>{{regDate}}</td>\
                            <td>{{noV}}</td>\
                            <td style='max-width : 150px; max-height : 80px; overflow: auto'>{{status}}</td>\
                            <td>\
                                <div class='mdc-text-field' data-mdc-auto-init='MDCTextField'>\
                                    <input class='mdc-text-field__input' type='text' name='status' size='20' required>\
                                    <label for='status' class='mdc-floating-label'>Enter status of patient</label>\
                                    <div class='mdc-line-ripple'></div>\
                                </div>\
                                <button type='button' data-id='{{pid}}' data-statusText='status' class='update mdc-button mdc-button--raised'>\
                                    <i class='material-icons mdc-button__icon'>update</i>\
                                    Update\
                                </button> \
                            </td>\
                        </tr>\
                        ";
    next.on('click', function (event) {
        event.preventDefault;
        count++;
        fetch(count);
        if(count>0) prev.removeAttr('disabled');
    });
    prev.on('click', function (event) {
        event.preventDefault;
        count--;
        fetch(count);
        if(count === 0) prev.attr('disabled', 'true');
    });

    $('#patients').delegate('.update', 'click', function (event) {
        event.preventDefault;
        const pid = $(this).attr('data-id');
        const status = $(this).parent().children().find('input[name=status]').val();
        if (status != '') {
            var update = {
                pid : pid,
                status : status
            }
            $.ajax({
                url : '/updatePatient',
                method : 'POST',
                contentType : 'application/json',
                data : JSON.stringify(update),
                success : function (res) {
                    alert(res.msg);
                    window.location.reload(true);
                },
                error : function (e, ts, et) {
                 console.log("error");
                 console.log(e +"\nsome error\n" + ts + "\n" + et);
                }
            });   
        } else {
            alert('Please Enter the patient status then \nupdate the details for patient '+pid);
        }
    });
 
    function fetch(c) {
        if(c < 0) c = 0;
        $.ajax({
            url : '/patients/' + c*5,
            method : 'GET',
            async : false,
            contentType : 'application/json',
            success : function (res) {
                display(res);
            },
            error : function (e, ts, et) {
             console.log("error");
             console.log(e +"\nsome error\n" + ts + "\n" + et);
            }
        });
    }

    function display(patients) {
        var patientsContent = $('#patients');
        patientsContent.html('');
        $.each( patients ,function (i , patient) {
            patientsContent.append(Mustache.render(patientTemplate, patient));
		    window.mdc.autoInit();
        });
        if(patients.length === 0 && count >= 0) {
            alert('no previous patients registerd');
            prev.click();
        }
        if(patients.length < 5) next.attr('disabled', 'true');
        if(patients.length >= 5) next.removeAttr('disabled', 'true');

    }
});