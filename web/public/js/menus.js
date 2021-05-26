/* JS pour la partie Menu */
$(document).ready(function () {
    const lang = $('#language_selected').val()
    let langURL = '//cdn.datatables.net/plug-ins/1.10.24/i18n/English.json'

    if(lang === 'fr') {
        langURL = '//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json'
    }

    $('#GestionduMenu').DataTable( {
        "language": {
            url: langURL
        },
        'columnDefs': [ {
            'targets': [1], // column index (start from 0)
            'orderable': false, // set orderable false for selected columns
         }]
    });

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#AddMenuCategory').click(function () {
        $("#addModalMenuCategory").css("display", "block");
    })

    $('#closeAddModalMenuCategory').click(function () {
        $("#addModalMenuCategory").css("display", "none");
        $("#AddMenuCategoryName").val("");
        $("#AddCategoryImage").val("");
        $(".error").remove(); 
    })

    $('#GestionduMenu').on('click', '.EditButon', function(event){
        $div = $(this).closest('.RowMenuCategory');
        $title = $('.modal-title')[1].innerText;
        $id = $div.attr('id');
        $name = $div[0].children[0].innerHTML;
        $('#EditCategoryName')[0].value = $name;
        $('#EditCategoryid')[0].value = $id;
        $('.modal-title')[1].innerText = $title + $name;
        $("#EditModalCategory").css("display", "block");
    })

    $('#closeEditModalCategory').click(function () {
        $('.modal-title')[1].innerText = $title;
        $("#EditModalCategory").css("display", "none");
        $(".error").remove(); 
    })


    $('#AddMenuCategoryName').on('input', function() { 
        $(".error").remove(); //remove error message
    });

    $('#FormAddCategoryMenu').on('submit',function (event) {
        (lang ==="fr")? $Edit = "Editer" : $Edit ="Edit";
        (lang ==="fr")? $Delete = "Supprimer" : $Edit ="Delete";
        (lang ==="fr")? $Display = "Voir les élements de la catégorie" : $Display ="Check category items";
        $categoryName = $('#AddMenuCategoryName').val();
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/menus',
            cache: false,
            processData: false, 
            contentType: false,
            data: new FormData($(this)[0]),
            success: function (Response) {
                    $id = Response.item.id;
                    console.log($id)
                    $name = Response.item.name;
                    $("#AddMenuCategoryName").val("");
                    $("#addModalMenuCategory").css("display", "none");
                    $div = $('#GestionduMenu');
                    $div.append(
                        '<tr class="RowMenuCategory odd" id="'+ Response.item.id+'">\n'+
                    '<td class="CategoryName">'+ $name +'</td>\n'+
                    '<td><img  alt="ItemImage" src="/Images/MenuCategory/'+Response.item.image +'"></td>\n'+
                    '<td class="ActionCase">\n'+
                        '<a href=menus/'+ $id+' type="button" class="btn btn-success Button SelectCategory" >\n'+
                                $Display +
                        '</a>\n'+

                        '<button type="button" class="btn btn-primary Button EditButon" >\n'+
                                $Edit +
                        '</button>\n'+

                        '<button type="button" class="btn btn-danger  Button butonDelete" >\n'+
                                $Delete +
                        '</button>\n'+
                    '</td>\n'+
                '</tr>\n'
                    )
            },
            error: function(error){
                for (const key in error.responseJSON.errors) {
                    $(".modal-body").append('<h5 class="error error'+ key +'">'+ error.responseJSON.errors[key] +'</h5>\n');
                }
            }
        });
    })

    $('#FormEditCategory').on('submit',function (event) {
        event.preventDefault();
        (lang ==="fr")? $Edit = "Editer" : $Edit ="Edit";
        (lang ==="fr")? $Delete = "Supprimer" : $Delete ="Delete";
        (lang ==="fr")? $PriceTag = "Prix :" : $PriceTag ="Price : ";
        $id = $('#EditCategoryid').val();
        $data = new FormData($(this)[0]);
        $data.append('_method','PUT');
        $.ajax({
            type: 'POST',
            url: '/menus/' + $id,
            cache: false,
            processData: false, 
            contentType: false,
            data: $data,
            success: function (Response) {
                    $("#EditModalCategory").css("display", "none");
                    $("#" + Response.item.id).children()[0].value = Response.item.name;
                    $("#" + Response.item.id).children()[1].children[0].src = "/Images/MenuCategory/" + Response.item.image;
            },
            error: function(error){
                for (const key in error.responseJSON.errors) {
                    $(".modal-body").append('<h5 class="error error'+ key +'">'+ error.responseJSON.errors[key] +'</h5>\n');
                }
            }
        });
    });

    $('#GestionduMenu').on('click', '.butonDelete', function() {
        $id = $(this).closest('.RowMenuCategory').attr('id');
        $.ajax({
            type: 'DELETE',
            url: '/menus/' + $id,
            data: { 'id': $id },
            success: function (Response) {
                    $div = $("#" + Response.id)[0];
                    $div.remove();
            },
        });
      
    });

    $('#closeEditModal').click(function () {
        $("#editModal").css("display", "none");
    })

    $('#AddCategoryImage').on('input', function() { 
        $errorname = $(this).attr('name');
       $(".error" + $errorname).remove(); //remove error message
   });

   $('#AddMenuCategoryName').on('input', function() { 
    $errorname = $(this).attr('name');
   $(".error" + $errorname).remove(); //remove error message
});



});
