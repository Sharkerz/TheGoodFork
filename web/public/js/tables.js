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
        $(".error").remove();
    })

    $('#tableNumberAdd').on('input', function() { 
        $(".error").remove(); //remove error message
    });

    $('#NbPersonAdd').on('input', function() { 
        $(".error").remove(); 
    });

    $('#NbPersonEdit').on('input', function() { 
        $(".error").remove(); 
    });

    $('.tableList').on('click', '.tables', function(event){
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
                    $("#editModal").css("display", "none");
                    $("#" + Response.id).children()[0].children[0].text = $TableN;
                    $("#" + Response.id).children()[0].children[1].value = $TableN;
                    $("#" + Response.id).children()[0].children[2].value = $NbPersons;
                    $("#" + Response.id).children()[1].children[0].innerHTML = $NbPersons;
            },
            error: function(error){
                $(".modal-body").append('<h5 class="error">'+ error.responseJSON.errors.NbPersons[0] +'</h5>\n');
            }
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
                $TableN = $('#tableNumberAdd').val('');
                $NbPersons = $('#NbPersonAdd').val('');
                    $id = Response.id;
                    $TableN = Response.TableN;
                    $NbPersons = Response.NbPersons;
                    $("#addModal").css("display", "none");
                    $div = $('.tableList');
                    $div.append('<div class="tables" id="'+ $id + '">\n' +
                        '<div class="card-body">\n' +
                        '<h6 class="titre_tables">TableN° ' + $TableN + ' </h6>\n' +
                        '<input  class="TableN" hidden value="' + $TableN + '" name=ValueTableN>\n' +
                        '<input  class="ValueNBPersons"  hidden value="' + $NbPersons + '" name=ValueNBPersons>\n' +
                        '</div>\n' +
                        '<div>\n' +
                        '<h4 class="NbPersonTables">' + $NbPersons + '\n' +
                        '</div>\n' +
                        '</div>\n')

            },
            error: function(error){
                if('TableN' in error.responseJSON.errors && !('NbPersons' in error.responseJSON.errors)){
                    $(".modal-body").append('<h5 class="error">'+ error.responseJSON.errors.TableN[0] +'</h5>\n');
                }
                else if('NbPersons' in error.responseJSON.errors && !('TableN' in error.responseJSON.errors)){
                    $(".modal-body").append('<h5 class="error">'+ error.responseJSON.errors.NbPersons[0] +'</h5>\n');
                }
                else{
                    $(".modal-body").append('<h5 class="error">'+ error.responseJSON.errors.TableN[0] +'</h5>\n</br>'
                    +'<h5 class="error">'+ error.responseJSON.errors.NbPersons[0] +'</h5>\n');
                }
                
                
            }
        });
    })

    $('.butonDelete').click(function () {
        $id = $('#idEdit').val();
        $.ajax({
            type: 'DELETE',
            url: '/tables/' + $id,
            data: { 'id': $id },
            success: function (Response) {
                    $("#editModal").css("display", "none");
                    $div = $("#" + Response.id)[0];
                    $div.remove();
            },
        });
    })
    $('#closeEditModal').click(function () {
        $("#editModal").css("display", "none");
    })



});
