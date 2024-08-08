// $(document).ready(function(){
//     refresh();
// });

// document.querySelector('#ItemManage #ItemForm').addEventListener('submit', function(event){
//     event.preventDefault();
// });

// $('#ItemManage .saveBtn').click(function(){
//     let itemCode = $('#ItemManage .itemId').val();
//     let itemName = $('#ItemManage .itemName').val();
//     let itemQty = $('#ItemManage .itemQty').val();
//     let itemPrice = $('#ItemManage .itemPrice').val();

//     console.log("Saving Item - Code: " + itemCode + ", Name: " + itemName + ", Qty: " + itemQty + ", Price: " + itemPrice);


//     let item = {
//         code: itemCode,
//         name: itemName,
//         qty: itemQty,
//         price: itemPrice
//     };

//     const itemJson = JSON.stringify(item);
//     console.log(itemJson);

//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item",
//         type: "POST",
//         data: itemJson,
//         headers: {"Content-Type": "application/json"},
//         success: function(res) {
//             console.log("Response from server: " + JSON.stringify(res));
//             refresh();
//         },
//         error: function(res) {
//             console.error("Error from server: " + JSON.stringify(res));
//         }
//     });
// });

// function generateId(){
//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item?function=getAll",
//         type: "GET",
//         success: function(res) {
//             let items = JSON.parse(res);
//             if (!items || items.length === 0){
//                 $('#ItemManage .itemId').val('I00-001');
//             } else {
//                 let lastItem = items[items.length - 1];
//                 let numbers = extractNumber(lastItem.code);
//                 numbers[1]++;
//                 if (numbers[1] > 999) {
//                     numbers[0]++;
//                     numbers[1] = 1;
//                 }
//                 $('#ItemManage .itemId').val('I' + String(numbers[0]).padStart(2, '0') + '-' + String(numbers[1]).padStart(3, '0'));
//             }
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//         }
//     });
// }

// function refresh(){
//     generateId();
//     $('#ItemManage .itemName').val('');
//     $('#ItemManage .itemQty').val('');
//     $('#ItemManage .itemPrice').val('');
//     $('#ItemManage .invalidCode').text('');
//     $('#ItemManage .invalidName').text('');
//     $('#ItemManage .invalidQty').text('');
//     $('#ItemManage .invalidPrice').text('');
//     loadTable();
// }

// function loadTable(){
//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item?function=getAll",
//         type: "GET",
//         success: function(res) {
//             let items = JSON.parse(res);
//             $('#ItemManage .tableRow').empty();
//             items.forEach(item => {
//                 $('#ItemManage .tableRow').append(
//                     '<tr>' +
//                         '<td>' + item.code + '</td>' +
//                         '<td>' + item.name + '</td>' +
//                         '<td>' + item.qty + '</td>' +
//                         '<td>' + item.price.toFixed(2) + '</td>' +
//                     '</tr>'
//                 );
//             });
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//         }
//     });
// }

// $('#ItemManage .tableRow').on('click', 'tr', function(){
//     let code = $(this).children('td:eq(0)').text();
//     let name = $(this).children('td:eq(1)').text();
//     let qty = $(this).children('td:eq(2)').text();
//     let price = $(this).children('td:eq(3)').text();

//     console.log("Selected Item - Code: " + code + ", Name: " + name + ", Qty: " + qty + ", Price: " + price);

//     $('#ItemManage .itemId').val(code);
//     $('#ItemManage .itemName').val(name);
//     $('#ItemManage .itemQty').val(qty);
//     $('#ItemManage .itemPrice').val(price);
// });

// $('#ItemManage .deleteBtn').click(function(){
//     let code = $('#ItemManage .itemId').val();

//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item?code=" + code,
//         type: "DELETE",
//         success: function(res) {
//             console.log("Response from server: " + JSON.stringify(res));
//             refresh();
//         },
//         error: function(res) {
//             console.error("Error from server: " + JSON.stringify(res));
//         }
//     });
// });

// $('#ItemManage .updateBtn').click(function(){
//     let item = {
//         code: $('#ItemManage .itemId').val(),
//         name: $('#ItemManage .itemName').val(),
//         qty: $('#ItemManage .itemQty').val(),
//         price: $('#ItemManage .itemPrice').val()
//     };

//     const itemJson = JSON.stringify(item);
//     console.log(itemJson);

//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item",
//         type: "PUT",
//         data: itemJson,
//         headers: {"Content-Type": "application/json"},
//         success: function(res) {
//             console.log("Response from server: " + JSON.stringify(res));
//             refresh();
//         },
//         error: function(res) {
//             console.error("Error from server: " + JSON.stringify(res));
//         }
//     });
// });

// $('#ItemManage .clearBtn').click(function(){
//     refresh();
// });

// $('#ItemManage .searchBtn').click(function(){
//     let code = $('#ItemManage .itemId').val();

//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item?function=getByCode&code=" + code,
//         type: "GET",
//         success: function(res) {
//             let item = JSON.parse(res);
//             if(item){
//                 $('#ItemManage .itemName').val(item.name);
//                 $('#ItemManage .itemQty').val(item.qty);
//                 $('#ItemManage .itemPrice').val(item.price.toFixed(2));
//             } else {
//                 $('#ItemManage .invalidCode').text('Item Code does not exist');
//             }
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//             $('#ItemManage .invalidCode').text('Item Code does not exist');
//         }
//     });
// });

// function extractNumber(code){
//     var match = code.match(/I(\d{2})-(\d{3})/);
//     if(match && match.length > 2){
//         return [parseInt(match[1]), parseInt(match[2])];
//     }
//     return [0, 0];
// }



$(document).ready(function(){
    refreshItem();
});

document.querySelector('#ItemManage #ItemForm').addEventListener('submit', function(event){
    event.preventDefault();
});

$('#ItemManage .saveBtn').click(function(){
    let item = getItemFromForm();
    saveItem(item);
});

$('#ItemManage .deleteBtn').click(function(){
    let code = $('#ItemManage .itemId').val();
    deleteItem(code);
});

$('#ItemManage .updateBtn').click(function(){
    let item = getItemFromForm();
    updateItem(item);
});

$('#ItemManage .clearBtn').click(function(){
    refreshItem();
});

$('#ItemManage .searchBtn').click(function(){
    let code = $('#ItemManage .itemId').val();
    searchItemByCode(code);
});

$('#ItemManage .tableRow').on('click', 'tr', function(){
    let code = $(this).children('td:eq(0)').text();
    let name = $(this).children('td:eq(1)').text();
    let qty = $(this).children('td:eq(2)').text();
    let price = $(this).children('td:eq(3)').text();

    console.log("Selected Item - Code: " + code + ", Name: " + name + ", Qty: " + qty + ", Price: " + price);

    $('#ItemManage .itemId').val(code);
    $('#ItemManage .itemName').val(name);
    $('#ItemManage .itemQty').val(qty);
    $('#ItemManage .itemPrice').val(price);
});
