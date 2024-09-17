
    function rebindEventHandlers() {

        // Rebind click event for the delete links
        $('.edit-link').off('click').on('click', function (e) {
            e.stopPropagation();
            //var id = $(this).data('id');
            //var pageIndex = $(this).data('page-index');
            //handleDelete(id, pageIndex);
        });

    // Rebind click event for the clickable rows
    $('.clickable-row').off('click').on('click', function () {
            var id = $(this).data('id');
    if (id) {
        window.location.href = updatePublicationUrl + id;
            }
        });
    }
    function onSearchSuccess() {
        rebindEventHandlers();
        }

    function handlePageClick(pageIndex) {
            var form = $('#searchForm');
    var formData = form.serialize(); // Serialize the form data
    $.ajax({
        url: searchPublicationUrl,
    type: 'GET',
    data: formData + '&pageIndex=' + pageIndex,
    success: function (result) {

        $('#courses-container').html(result);
    rebindEventHandlers();

                }
            });
        }
    $(document).ready(function () {

        //$('.edit-link').on('click', function (e) {
        //    e.stopPropagation();
        //});
        rebindEventHandlers();


        });
    var $form = $('#searchForm');
    var $submitButton = $form.find('button[type="submit"]');

    // Handle form submission
    $form.on('submit', function (e) {
        // Prevent default form submission behavior
        e.preventDefault();

    // Perform client-side validation
    if ($form.valid()) {
        // If form is valid, disable the submit button and show the spinner
        $submitButton.prop('disabled', true);
    $submitButton.find('.spinner-border').show();

    // Perform AJAX form submission
    $.ajax({
        url: $form.attr('action'),
    type: $form.attr('method'),
    data: $form.serialize(),
    success: function(response) {
        // Handle successful response
        // Update target element if needed

    },
    error: function(xhr) {
        // Handle error response
        // Optionally show error message
        console.log('Error occurred:', xhr.responseText);
                },
    complete: function() {
        // Always re-enable button and hide spinner
    $submitButton.prop('disabled', false);
    $submitButton.find('.spinner-border').hide();
                }
            });
        } else {
        // If form is invalid, keep the submit button disabled and hide spinner
    $submitButton.prop('disabled', false);
    $submitButton.find('.spinner-border').hide();
        }
    });




    function handleDelete(id, pageIndex) {

        Swal.fire({
            title: "Are you sure delete this publication ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                $.ajax({
                    url: deletePublicationUrl + id,
                    type: 'POST',

                    success: function (result) {
                        if (result.success === false) {
                            Swal.fire({
                                title: "Error!",
                                text: result.errorMessage,
                                icon: "error"
                            });
                        } else {
                            $('#courses-container').html(result);
                            rebindEventHandlers();

                            Swal.fire({
                                title: "Deleted!",
                                text: "Publication was deleted successfully!",
                                icon: "success"
                            });
                        }

                    },
                    error: function (xhr, status, error) {
                        alert("An error occurred while deleting the course.");
                    }
                });

            }
        });

        }
if (isUpdate) {
        $.connection.hub.url = signalRBaseUrl;
    var updateCourse = $.connection.notificationHub;

    $.connection.hub.start().done(function () {
        updateCourse.server.notifyCourseUpdated(publicationId, 'The publication has been updated by another user.');
}).fail(function (error) {
        console.error("SignalR connection error: ", error);
});
           }


