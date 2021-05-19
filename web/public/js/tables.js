/* Ajouter une nouvelle table */
$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#Create_Tables').click(function () {
        $("#addModal").css("display", "block");
    })

    $('#closeAddModal').click(function () {
        $("#addModal").css("display", "none");
    })

    $('.tables').click(function (event) {
        $id = $(event.currentTarget).attr('id');
        $TableN = $(this)[0].closest(".tables").children[0].children[1].value;
        $nbPersons = $(this)[0].closest(".tables").children[0].children[2].value;
        $('#tableNumberEdit')[0].value = $TableN;
        $('#NbPersonEdit')[0].value = $nbPersons;
        $('#idEdit')[0].value = $id;
        $("#editModal").css("display", "block");
    })

    $('.butonEditTable').click(function () {
        $id = $('#idEdit').val();
        $TableN = $('#tableNumberEdit').val();
        $NbPersons = $('#NbPersonEdit').val();
        $.ajax({
            type: 'PUT',
            url: '/tables/' + $id,
            data: { 'id': $id, 'TableN': $TableN, 'NbPersons': $NbPersons },
            success: function (Response) {
                if (Response.success == "true") {
                    $("#editModal").css("display", "none");
                    $("#" + Response.id).children()[0].children[0].text = $TableN;
                    $("#" + Response.id).children()[0].children[1].value = $TableN;
                    $("#" + Response.id).children()[0].children[2].value = $NbPersons;
                    $("#" + Response.id).children()[1].children[0].innerHTML = $NbPersons;
                }

            },
        });
    });

    $('.butonAddTable').click(function () {
        $TableN = $('#tableNumberAdd').val();
        $NbPersons = $('#NbPersonAdd').val();
        $.ajax({
            type: 'POST',
            url: '/tables',
            data: { 'TableN': $TableN, 'NbPersons': $NbPersons },
            success: function (Response) {
                console.log(Response.success)
                if (Response.success == true) {
                    $id = Response.id;
                    $TableN = Response.TableN;
                    $NbPersons = Response.NbPersons;
                    $("#addModal").css("display", "none");
                    $div = $('.tableList');
                    console.log($div[0]);
                    $div.append('<div class="tables" id="{{ $table->id }}">\n' +
                        '<div class="card-body">\n' +
                        '<h6 class="titre_tables">TableN°' + $TableN + ' </h6>\n' +
                        '<input  class="TableN" hidden value="' + $TableN + '" name=ValueTableN>\n' +
                        '<input  class="ValueNBPersons"  hidden value="' + $NbPersons + '" name=ValueNBPersons>\n' +
                        '</div>\n' +
                        '<div>\n' +
                        '<h4 class="NbPersonTables">' + $NbPersons + '\n' +
                        '</div>\n' +
                        '</div>\n')
                }

            },
        });
    })

    $('.butonDelete').click(function () {
        $id = $('#idEdit').val();
        $.ajax({
            type: 'DELETE',
            url: '/tables/' + $id,
            data: { 'id': $id },
            success: function (Response) {
                if (Response.success == "true") {
                    $("#editModal").css("display", "none");
                    $div = $("#" + Response.id)[0];
                    $div.remove();
                }
            },
        });
    })
    $('#closeEditModal').click(function () {
        $("#editModal").css("display", "none");
    })



});
