  let selectedStatus = '';
        let name = '';
        let debounceTimeout;

        function stringFormat(input) {
            if (!input) { // undefined, null, empty
                return '';
            }
            return input
                .trim()
                .replace(/\s+/g, ' '); // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng đơn
        }
        function performSearch(page = 1, name = '', isActive = null) {
            const formattedName = stringFormat(name);
            $.ajax({
                url: searchCoursesUrl,
                type: 'GET',
                data: {
                    pageIndex: page,
                    name: formattedName,
                    isActive: isActive
                },
                success: function (data) {
                    // Update the partial view with the returned data
                    $('#courses-container').html(data);
                },
                error: function (xhr, status, error) {
                    console.error("Error: " + error);
                }
            });
            }
        function handlePageClick(page) {
            performSearch(page, name, selectedStatus);
        }
        $(document).ready(function () {
            $('#searchInput').on('input', function () {
                clearTimeout(debounceTimeout); // Clear the previous timeout if there's any
                 name = $(this).val();

                debounceTimeout = setTimeout(function () {
                    performSearch(null, name, selectedStatus);
                }, 500); // Delay of 500 milliseconds
            });
            // Handle dropdown item selection
            $('.dropdown-item').on('click', function () {
                selectedStatus = $(this).data('value');
                $('#dropdownMenuButton').text($(this).text());
                performSearch(null,name, selectedStatus);
            });


              

            if (isUpdate) {
                $.connection.hub.url = signalRBaseUrl;
                var updateCourse = $.connection.notificationHub;

                 $.connection.hub.start().done(function () {
                     updateCourse.server.notifyCourseUpdated(courseId, 'The course has been updated by another user.');
                 }).fail(function (error) {
                     console.error("SignalR connection error: ", error);
                 });
            }
  });