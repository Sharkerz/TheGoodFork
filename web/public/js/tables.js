/* Ajouter une nouvelle table */
$(document).ready(function () {
    const lang = $('#language_selected').val()
    let langURL = '//cdn.datatables.net/plug-ins/1.10.24/i18n/English.json'

    if(lang === 'fr') {
        langURL = '//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json'
    }

    $('#TablesGestion').DataTable( {
        "language": {
            url: langURL
        },
        'columnDefs': [ {
            'targets': [2], // column index (start from 0)
            'orderable': false, // set orderable false for selected columns
         }]
    });

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

    $('#TablesGestion').on('click', '.EditButon', function(event){
        $div = $(this).closest('.tableRow');
        $id = $div.attr('id');
        $TableN = $div[0].children[0].innerHTML;
        $NbPersons = $div[0].children[1].innerHTML;
        $('#tableNumberEdit')[0].value = $TableN;
        $('#NbPersonEdit')[0].value = $NbPersons;
        $('#idEdit')[0].value = $id;
        $("#editModal").css("display", "block");
    })

    $('.butonEditTable').click(function () {
        $id = $('#idEdit').val();
        $NbPersons = $('#NbPersonEdit').val();
        $.ajax({
            type: 'PUT',
            url: '/tables/' + $id,
            data: { 'id': $id, 'NbPersons': $NbPersons },
            success: function (Response) {
                    $("#editModal").css("display", "none");
                    $("#" + Response.id).children()[1].innerHTML = $NbPersons;
            },
            error: function(error){
                $(".modal-body").append('<h5 class="error">'+ error.responseJSON.errors.NbPersons[0] +'</h5>\n');
            }
        });
    });

    $('.butonAddTable').click(function () {
        (lang ==="fr")? $Edit = "Editer" : $Edit ="Edit";
        (lang ==="fr")? $Delete = "Supprimer" : $Edit ="Delete";
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
                    $div = $('#TablesGestion');
                    $div.append('<tr  class="tableRow" id="'+ $id+ '">\n'+
                    '<td class="TableN">'+ $TableN+ '</td>\n'+
                    '<td class="NbPersons">'+ $NbPersons+ '</td>\n'+
                    '<td class="form-inline ">\n'+
                        '<button type="button" class="btn btn-primary EditButon" >\n'+
                            $Edit +
                        '</button>\n'+

                        '<button type="button" class="btn btn-danger butonDelete" >\n'+
                            $Delete +
                        '</button>\n'+
                    '</td>\n'+
                '</tr>)\n')

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

    $('#TablesGestion').on('click', '.butonDelete',function () {
        $id = $(this).closest('.tableRow').attr('id');
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
