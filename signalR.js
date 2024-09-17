$(function () {
    var baseUrl = window.baseUrl || '';
    $.connection.hub.url = baseUrl + "/signalr";

    var updateCourse = $.connection.notificationHub;

    updateCourse.client.receiveUpdateNotification = function (errorMessage) {
        applyToastrSettings(true); // Apply persistent toast settings


        var reloadUrl = window.reloadUrl || '';
        toastr.error(
            errorMessage + ' <a href="' + reloadUrl + '" style="font-weight:bold; color: #ffffff;">Click here</a>' + ' to reload the latest version.'
        );
    };

    // Start the connection.
    $.connection.hub.start().done(function () {
        var courseId = window.courseId || '';
        updateCourse.server.joinCourseGroup(courseId);
    }).fail(function (error) {
        console.error("SignalR connection error: ", error);
    });


    $('form').on('submit', function () {
        var $submitButton = $(this).find('button[type="submit"]');
        $submitButton.prop('disabled', true);
        $submitButton.find('.spinner-border').show();
    });

    $(document).ajaxComplete(function () {
        var $submitButton = $('form').find('button[type="submit"]');
        $submitButton.prop('disabled', false);
        $submitButton.find('.spinner-border').hide();
    });
});


function notifyUpdate(baseUrl, courseId, message) {
   
        $.connection.hub.url = baseUrl + '/signalr';
        var updateCourse = $.connection.notificationHub;

        $.connection.hub.start().done(function () {
            updateCourse.server.notifyCourseUpdated(courseId, message);
        }).fail(function (error) {
            console.error("SignalR connection error: ", error);
        });
    
}

