/* Ajouter une nouvelle table */
$(document).ready(function () {

    $('#Create_Tables').click(function () {
        var id = $(this).val();
        console.log('test');
        // $.ajax({
        //     type: 'POST',
        //     url: '/Delete_friend',
        //     data: {'id_ami':id},
        //     success: function (Response) {
        //         id_deleted = Response.supprime;
        //         document.getElementById('friend-' + id_deleted).innerHTML = '';
        //     },
        // });
    })

});
