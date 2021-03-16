$(document).ready(function () {
    $('#userTable').DataTable( {
        "language": {
            url: "//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json"
        }
    });


    //Ajax request update role
    $('.select_role').on("change", function () {
        const selected_role = $(this)[0].value;
        const user_id = $(this).parent()[0].children[1].value;
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/users/update",
            type: 'POST',
            data: {role:selected_role, user_id:user_id},
            success: function (data) {
                console.log(data)
            }
        });

    })
})
