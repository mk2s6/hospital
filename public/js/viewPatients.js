$(function() {

    $(window).on('load', function(){
        $.ajax({
            url : '/patients',
            method : 'GET',
            contentType : 'application/json',
            success : function (res) {
                display(res);
            },
            error : function (res,e, ts, et) {
             alert("error");
             console.log(res +"some error" + ts + " " + et);
            }
         });
    });

    var patientTemplate = '\
                            <tr>\
                                <td>{{pid}}</td>\
                                <td>{{pname}}</td>\
                                <td>{{pgender}}</td>\
                                <td>{{page}}</td>\
                                <td>{{regDate}}</td>\
                            </tr>\
                            ';

    function display(patients) {
        var patientsContent = $('#patients');
        $.each( patients ,function (i , patient) {
            console.log(patient);
            patientsContent.append(Mustache.render(patientTemplate, patient))
        })
    }
})