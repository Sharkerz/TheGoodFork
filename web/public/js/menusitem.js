$(document).ready(function () {
    const lang = $('#language_selected').val();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('#AddItemCategory').click(function () {
        $categoryid = $('#Category_id').val();
        $('#AddCategoryItemCategory_Id')[0].value = $categoryid;
        $("#addModalCategoryItem").css("display", "block");
    })


    $('#closeAddModalCategoryItem').click(function () {
        $("#addModalCategoryItem").css("display", "none");
        $('#AddCategoryItemName').val('');
        $('#AddCategoryItemPrice').val('');
        $('#AddCategoryItemStock').val('');
        $('#ItemImage').val('');
        $(".error").remove(); 
    })

    $('.row').on('click', '.DeleteButton', function() {
        $id = $(this).closest('.column').attr('id');
        $.ajax({
            type: 'DELETE',
            url: '/menusItem/' + $id,
            data: { 'id': $id },
            success: function (Response) {
                    $div = $("#" + Response.id)[0];
                    $div.remove();
            },
        });
      
    });
    $('.row').on('click', '.EditButton', function() {
        $div = $(this).closest('.column');
        $title = $('.modal-title')[1].innerText;
        $id = $div.attr('id');
        $itemName = $div[0].children[0].children[1].children[0].innerText;
        $itemPrice = $div[0].children[0].children[1].children[1].getAttribute('id');
        $itemStock = $div[0].children[0].children[1].children[2].getAttribute('id');
        $itemimage = $div[0].children[0].children[0].getAttribute('src');
        $('#EditCategoryItemName')[0].value = $itemName;
        $('#EditCategoryItemId')[0].value = $id;
        $('#EditCategoryItemPrice')[0].value = $itemPrice;
        $('#EditCategoryItemStock')[0].value = $itemStock;
        $('.modal-title')[1].innerText = $title + $itemName;
        $("#editModal").css("display", "block");
        $("#EditModalCategoryItem").css("display", "block");
    });

    $('#closeEditModalCategoryItem').click(function () {
        $('.modal-title')[1].innerText = $title;
        $("#EditModalCategoryItem").css("display", "none");
        $(".error").remove(); 
    })
    

    $('#FormAdditemcategory').on('submit',function (event) {
        (lang ==="fr")? $Edit = "Editer" : $Edit ="Edit";
        (lang ==="fr")? $Delete = "Supprimer" : $Delete ="Delete";
        (lang ==="fr")? $PriceTag = "Prix :" : $PriceTag ="Price : ";
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/menusItem',
            cache: false,
            processData: false, 
            contentType: false,
            data: new FormData($(this)[0]),
            success: function (Response) {
                    $id = Response.id;
                    $name = Response.name;
                    $image = Response.image;
                    $price = Response.price;
                    $stock = Response.stock;
                    $("#addModalCategoryItem").css("display", "none");
                    $(".error").remove(); 
                    $div = $('.AddElement')[0];
                    $div.insertAdjacentHTML('beforebegin', '<div class="column" id="'+ $id +'">\n'+
                        '<div class="card">\n'+
                                '<img  alt="ItemImage" src="/Images/MenuItem/'+ $image +'">\n'+
                                '<div class="cardinfo">\n' +
                                        '<h3 class="CardTitle"><b>'+ $name +'</b></h3>\n' + 
                                        '<p id="'+ $price.toFixed(2) +'">'+ $PriceTag + $price.toFixed(2) +' €</p>\n' +
                                        '<p id="'+ $stock +'">Stock : '+ $stock +' </p>\n' +
                                '</div class="cardinfo">\n'+
                                '<div class="cardAction">\n'+  
                                        '<button type="button" class="btn btn-primary Button EditButton">\n'+
                                                $Edit +
                                        '</button>\n'+
                                        '<button type="button" class="btn btn-danger  Button DeleteButton">\n'+
                                                $Delete +
                                        '</button>\n'+
                                '</div>\n'+
                        '</div>\n'+
                    '</div>\n'     );
                    $('#AddCategoryItemName').val('');
                    $('#AddCategoryItemPrice').val('');
                    $('#AddCategoryItemStock').val('');
                    $('#ItemImage').val('');
            },
            error: function(error){
                for (const key in error.responseJSON.errors) {
                    $(".modal-body").append('<h5 class="error error'+ key +'">'+ error.responseJSON.errors[key] +'</h5>\n');
                }
            }
        });
    })

    $('#FormEdititemcategory').on('submit',function (event) {
        $id = $('#EditCategoryItemId').val();
        event.preventDefault();
        (lang ==="fr")? $Edit = "Editer" : $Edit ="Edit";
        (lang ==="fr")? $Delete = "Supprimer" : $Delete ="Delete";
        (lang ==="fr")? $PriceTag = "Prix :" : $PriceTag ="Price : ";
        $data = new FormData($(this)[0]);
        $data.append('_method','PUT');
        $.ajax({
            type: 'POST',
            url: '/menusItem/' +$id,
            cache: false,
            processData: false, 
            contentType: false,
            data: $data,
            success: function (Response) {
                    $id = Response.id;
                    $image = Response.item.image;
                    $name = Response.name;
                    $div = $("#" + Response.id)[0];
                    $div.children[0].children[0].src = "/Images/MenuItem/" +$image;
                    $div.children[0].children[1].children[0].innerHtml = '<b>' + Response.item.name+ '</b>';
                    $div.children[0].children[1].children[1].innerText = "Price : " + Response.item.price.toFixed(2) + ' €';
                    $PriceElement = $div.children[0].children[1].children[1];
                    $PriceElement.setAttribute('id',Response.item.price.toFixed(2));
                    $StockElement = $div.children[0].children[1].children[2];
                    $StockElement.setAttribute('id',Response.item.stock);
                    $StockElement.innerText = "Stock : " + Response.item.stock;
                    $("#EditModalCategoryItem").css("display", "none");
            },
            error: function(error){
                for (const key in error.responseJSON.errors) {
                    $(".modal-body").append('<h5 class="error error'+ key +'">'+ error.responseJSON.errors[key] +'</h5>\n');
                }
            }
        });
    })

    $('#ItemImage').on('input', function() { 
         $errorname = $(this).attr('name');
        $(".error" + $errorname).remove(); //remove error message
    });

    $('#AddCategoryItemStock').on('input', function() { 
        $errorname = $(this).attr('name');
        $(".error" + $errorname).remove(); 
    });

    $('#AddCategoryItemPrice').on('input', function() { 
        $errorname = $(this).attr('name');
        $(".error" + $errorname).remove(); 
    });

    $('#AddCategoryItemName').on('input', function() { 
        $errorname = $(this).attr('name');
        $(".error" + $errorname).remove(); 
    });

    $('#EditCategoryItemName').on('input', function() { 
        $errorname = $(this).attr('name');
        $(".error" + $errorname).remove();  
    });

    $('#EditCategoryItemPrice').on('input', function() { 
        $errorname = $(this).attr('name');
        $(".error" + $errorname).remove();  
    });

    $('#EditCategoryItemStock').on('input', function() { 
        $errorname = $(this).attr('name');
        $(".error" + $errorname).remove();  
    });

    $('#EditItemImage').on('input', function() { 
        $errorname = $(this).attr('name');
        $(".error" + $errorname).remove();  
    });
})