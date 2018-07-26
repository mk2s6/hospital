$(function () {
    $('#patient').on('submit', function () {
        var pname = $("input[name=pname]").val();
        var pgender = $("input[name='pgender']:checked").val();
        var page = $("select[name=age]").val();
        var patient = {
            pname : pname,
            pgender : pgender,
            page : page
        }
        console.log(patient);
        $.ajax({
            url : '/addPatient',
            method : 'POST',			
            contentType: 'application/json',
            data : JSON.stringify(patient),
            success : function (res) {
                alert(res.msg);
                window.location = res.redirectTo;
            },
            error : function (e, ts, et) {
                console.log(e + "some error" + ts + " " + et);
                alert("error");
            } 
        });
    });
});