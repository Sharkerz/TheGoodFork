/* JS pour la partie Menu */
$(document).ready(function () {
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
        $(".error").remove(); 
    })

    $('.add_category_items').click(function () {
        $title = $('.modal-title')[1].innerHTML;
        $categoryName = $(this)[0].closest('.menu_category').children[0].children[0].innerHTML;
        // $('.modal-title')[1].innerHTML = $title + $categoryName
        $("#addModalCategoryItem").css("display", "block");
    })

    $('#closeAddModalCategoryItem').click(function () {
        $("#addModalCategoryItem").css("display", "none");
        $(".error").remove(); 
    })

    // $('.tables').click(function (event) {
    //     $id = $(event.currentTarget).attr('id');
    //     $TableN = $(this)[0].closest(".tables").children[0].children[1].value;
    //     $nbPersons = $(this)[0].closest(".tables").children[0].children[2].value;
    //     $('#tableNumberEdit')[0].value = $TableN;
    //     $('#NbPersonEdit')[0].value = $nbPersons;
    //     $('#idEdit')[0].value = $id;
    //     $("#editModal").css("display", "block");
    // })

   

    $('#AddMenuCategoryName').on('input', function() { 
        $(".error").remove(); //remove error message
    });

    $('.butonAddMenuCategory').click(function () {
        $categoryName = $('#AddMenuCategoryName').val();
        $.ajax({
            type: 'POST',
            url: '/menus',
            data: { 'name': $categoryName},
            success: function (Response) {
                    $id = Response.id;
                    $name = Response.name;
                    $("#AddMenuCategoryName").val("");
                    $("#addModalMenuCategory").css("display", "none");
                    $div = $('.menu_categories');
                    $div.append(
                        '<div class="menu_category" id="'+ $id +'">\n'+
                            '<div class="category_header">\n'+
                                '<h1 class="menu_category_name">'+ $name +'</h1>\n'+
                                // '<i class="material-icons ">edit</i>\n'+
                                '<input  hidden value="'+ $name +'" name="'+ $name +'">\n'+
                                '<i class="material-icons remove_menu_category">remove_circle_outline</i>\n'+
                            '</div>\n'+
                            '<div class="category_items">\n'+
                                '<i class="material-icons add_category_items">add</i>\n'+
                        '</div>\n'+
                        '</div>\n'
                    )
            },
            error: function(error){
                $(".modal-body").append('<h5 class="error">'+ error.responseJSON.errors.name[0] +'</h5>\n')
            }
        });
    })


    $('.menu_categories').on('click', '.remove_menu_category', function() {
        $id = $(this).closest('.menu_category').attr('id');
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



});
