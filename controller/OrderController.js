// $(document).ready(function() {
//     refreshOrderManagement();
// });

// // Refresh Order Management
// function refreshOrderManagement() {
//     $('#OrderManage .orderId').val(generateOrderId());
//     $('#OrderManage .orderDate').val(new Date().toISOString().split('T')[0]);
//     loadCustomers();
//     loadItems();
//     clearOrderFields();
// }

// function clearOrderFields() {
//     $('#OrderManage .Total').text("");
//     $('#OrderManage .SubTotal').text("");
//     $('#OrderManage .Balance').val("");
//     $('#OrderManage .Cash').val('');
//     $('#OrderManage .Discount').val('');
//     $('#OrderManage .itemCode').val('');
//     $('#OrderManage .itemName').val('');
//     $('#OrderManage .itemPrice').val('');
//     $('#OrderManage .itemQty').val('');
//     $('#OrderManage .orderQty').val('');
//     $('#OrderManage .itemCmb').val('');
// }

// // Generate Order ID
// function extractNumber(id) {
//     var match = id.match(/OD(\d+)/);
//     if (match && match.length > 1) {
//         return match[1];
//     }
//     return null;
// }

// function generateOrderId() {
//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/order?function=getAll",
//         type: "GET",
//         success: function(res) {
//             let orders = JSON.parse(res);
//             if (!orders || orders.length === 0) {
//                 $('#OrderManage .orderId').val('OD01');
//             } else {
//                 let orderId = orders[orders.length - 1].orderId;
//                 let number = extractNumber(orderId);
//                 number = (parseInt(number) + 1).toString().padStart(2, '0');
//                 $('#OrderManage .orderId').val('OD' + number);
//             }
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//         }
//     });
// }

// // Load Customers
// function loadCustomers() {
//     let cmb = $('#OrderManage .customers');
//     cmb.empty();
//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/customer?function=getAll",
//         type: "GET",
//         success: function(res) {
//             let customers = JSON.parse(res);
//             cmb.append($('<option>').val('').text('Select Customer'));
//             $.each(customers, function(index, customer) {
//                 cmb.append($('<option>').val(customer.id).text(customer.name));
//             });
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//         }
//     });
// }

// $('#OrderManage .customers').change(function() {
//     let customerId = $(this).val();
//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/customer?function=getById&id=" + customerId,
//         type: "GET",
//         success: function(res) {
//             let customer = JSON.parse(res);
//             $('#OrderManage .custId').val(customer.id);
//             $('#OrderManage .custName').val(customer.name);
//             $('#OrderManage .custAddress').val(customer.address);
//             $('#OrderManage .custSalary').val(customer.salary);
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//         }
//     });
// });

// // Load Items
// function loadItems() {
//     let cmb = $('#OrderManage .itemCmb');
//     cmb.empty();
//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item?function=getAll",
//         type: "GET",
//         success: function(res) {
//             let items = JSON.parse(res);
//             cmb.append($('<option>').val('').text('Select Item'));
//             $.each(items, function(index, item) {
//                 cmb.append($('<option>').val(item.code).text(item.name));
//             });
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//         }
//     });
// }

// $('#OrderManage .itemCmb').change(function() {
//     let itemCode = $(this).val();
//     $.ajax({
//         url: "http://localhost:8080/POS_Back_End_war_exploded/item?function=getByCode&code=" + itemCode,
//         type: "GET",
//         success: function(res) {
//             let item = JSON.parse(res);
//             $('#OrderManage .itemCode').val(item.code);
//             $('#OrderManage .itemName').val(item.name);
//             $('#OrderManage .itemPrice').val(item.price.toFixed(2));
//             $('#OrderManage .itemQty').val(item.qty);
//             $('#OrderManage .orderQty').val('');
//         },
//         error: function(err) {
//             console.error("Error from server: " + JSON.stringify(err));
//         }
//     });
// });

// let getItems = [];

// // Add Item to Order
// $('#OrderManage .addBtn').click(function() {
//     let itemCode = $('#OrderManage .itemCode').val();
//     let existingItem = getItems.find(I => I.itemCode === itemCode);
    
//     if (!existingItem) {
//         let getItem = {
//             itemCode: itemCode,
//             itemName: $('#OrderManage .itemName').val(),
//             itemPrice: parseFloat($('#OrderManage .itemPrice').val()),
//             itemQty: parseInt($('#OrderManage .orderQty').val(), 10),
//             total: parseFloat($('#OrderManage .itemPrice').val()) * parseInt($('#OrderManage .orderQty').val(), 10)
//         };
//         getItems.push(getItem);
//         loadTable();
//         clearOrderFields();
//         setTotal();
//     } else {
//         alert('Item already added to the order');
//     }
// });

// function loadTable() {
//     $('#OrderManage .tableRows').empty();
//     $.each(getItems, function(index, item) {
//         $('#OrderManage .tableRows').append(
//             '<div>' +
//             '<div>' + item.itemCode + '</div>' +
//             '<div>' + item.itemName + '</div>' +
//             '<div>' + item.itemPrice.toFixed(2) + '</div>' +
//             '<div>' + item.itemQty + '</div>' +
//             '<div>' + item.total.toFixed(2) + '</div>' +
//             '</div>'
//         );
//     });
// }

// function setTotal() {
//     let total = 0;
//     $.each(getItems, function(index, item) {
//         total += item.total;
//     });
//     $('#OrderManage .Total').text(total.toFixed(2));
// }

// // Place Order
// $('#OrderManage .placeOrder').click(function() {
//     let cash = parseFloat($('#OrderManage .Cash').val());
//     let total = parseFloat($('#OrderManage .Total').text());
//     let discount = parseFloat($('#OrderManage .Discount').val());

//     let subTotal = total - (total * discount / 100);
//     $('#OrderManage .SubTotal').text(subTotal.toFixed(2));
//     let balance = cash - subTotal;
//     $('#OrderManage .Balance').val(balance.toFixed(2));

//     let Order = {
//         orderId: $('#OrderManage .orderId').val(),
//         orderDate: $('#OrderManage .orderDate').val(),
//         custId: $('#OrderManage .custId').val(),
//         items: getItems,
//         total: total,
//         discount: discount,
//         subTotal: subTotal,
//         cash: cash,
//         balance: balance
//     };

//     $.ajax({
//         url: 'http://localhost:8080/POS_Back_End_war_exploded/order',
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify(Order),
//         success: function(response) {
//             console.log('Order saved successfully');
//             updateItemData();
//             getItems = [];
//             loadTable();
//             clearOrderFields();
//             refreshOrderManagement();
//         },
//         error: function(error) {
//             console.log('Error saving order:', error);
//         }
//     });
// });

// // Update Item Data
// function updateItemData() {
//     $.each(getItems, function(index, item) {
//         let updatedQty = item.itemQty;
//         $.ajax({
//             url: 'http://localhost:8080/POS_Back_End_war_exploded/item',
//             type: 'PUT',
//             contentType: 'application/json',
//             data: JSON.stringify({
//                 code: item.itemCode,
//                 qty: updatedQty
//             }),
//             success: function(response) {
//                 console.log('Item updated successfully');
//             },
//             error: function(error) {
//                 console.log('Error updating item:', error);
//             }
//         });
//     });
// }

// // Delete Item
// $('#OrderManage .tableRows').on('click', 'div', function() {
//     let itemCode = $(this).children('div:eq(0)').text();
//     let itemIndex = getItems.findIndex(I => I.itemCode === itemCode);
//     if (itemIndex !== -1) {
//         getItems.splice(itemIndex, 1);
//         loadTable();
//         setTotal();
//     }
// });


$(document).ready(function() {
    refreshOrderManagement();
});

// Refresh Order Management
function refreshOrderManagement() {
    $('#OrderManage .orderId').val(generateOrderId());
    $('#OrderManage .orderDate').val(new Date().toISOString().split('T')[0]);
    loadCustomers();
    loadItems();
    clearOrderFields();
}

function clearOrderFields() {
    $('#OrderManage .Total').text("");
    $('#OrderManage .SubTotal').text("");
    $('#OrderManage .Balance').val("");
    $('#OrderManage .Cash').val('');
    $('#OrderManage .Discount').val('');
    $('#OrderManage .itemCode').val('');
    $('#OrderManage .itemName').val('');
    $('#OrderManage .itemPrice').val('');
    $('#OrderManage .itemQty').val('');
    $('#OrderManage .orderQty').val('');
    $('#OrderManage .itemCmb').val('');
}

// Generate Order ID
function extractNumber(id) {
    var match = id.match(/OD(\d+)/);
    if (match && match.length > 1) {
        return match[1];
    }
    return null;
}

function generateOrderId() {
    $.ajax({
        url: "http://localhost:8080/POS_Back_End_war_exploded/order?function=getAll",
        type: "GET",
        success: function(res) {
            let orders = JSON.parse(res);
            if (!orders || orders.length === 0) {
                $('#OrderManage .orderId').val('OD01');
            } else {
                let orderId = orders[orders.length - 1].orderId;
                let number = extractNumber(orderId);
                number = (parseInt(number) + 1).toString().padStart(2, '0');
                $('#OrderManage .orderId').val('OD' + number);
            }
        },
        error: function(err) {
            console.error("Error from server: " + JSON.stringify(err));
        }
    });
}

// Load Customers
function loadCustomers() {
    let cmb = $('#OrderManage .customers');
    cmb.empty();
    $.ajax({
        url: "http://localhost:8080/POS_Back_End_war_exploded/customer?function=getAll",
        type: "GET",
        success: function(res) {
            let customers = JSON.parse(res);
            cmb.append($('<option>').val('').text('Select Customer'));
            $.each(customers, function(index, customer) {
                cmb.append($('<option>').val(customer.id).text(customer.name));
            });
        },
        error: function(err) {
            console.error("Error from server: " + JSON.stringify(err));
        }
    });
}

$('#OrderManage .customers').change(function() {
    let customerId = $(this).val();
    $.ajax({
        url: "http://localhost:8080/POS_Back_End_war_exploded/customer?function=getById&id=" + customerId,
        type: "GET",
        success: function(res) {
            let customer = JSON.parse(res);
            $('#OrderManage .custId').val(customer.id);
            $('#OrderManage .custName').val(customer.name);
            $('#OrderManage .custAddress').val(customer.address);
            $('#OrderManage .custSalary').val(customer.salary);
        },
        error: function(err) {
            console.error("Error from server: " + JSON.stringify(err));
        }
    });
});

// Load Items
function loadItems() {
    let cmb = $('#OrderManage .itemCmb');
    cmb.empty();
    $.ajax({
        url: "http://localhost:8080/POS_Back_End_war_exploded/item?function=getAll",
        type: "GET",
        success: function(res) {
            let items = JSON.parse(res);
            cmb.append($('<option>').val('').text('Select Item'));
            $.each(items, function(index, item) {
                cmb.append($('<option>').val(item.code).text(item.name));
            });
        },
        error: function(err) {
            console.error("Error from server: " + JSON.stringify(err));
        }
    });
}

$('#OrderManage .itemCmb').change(function() {
    let itemCode = $(this).val();
    $.ajax({
        url: "http://localhost:8080/POS_Back_End_war_exploded/item?function=getByCode&code=" + itemCode,
        type: "GET",
        success: function(res) {
            let item = JSON.parse(res);
            $('#OrderManage .itemCode').val(item.code);
            $('#OrderManage .itemName').val(item.name);
            $('#OrderManage .itemPrice').val(item.price.toFixed(2));
            $('#OrderManage .itemQty').val(item.qty);
            $('#OrderManage .orderQty').val('');
        },
        error: function(err) {
            console.error("Error from server: " + JSON.stringify(err));
        }
    });
});

let getItems = [];

// Add Item to Order
$('#OrderManage .addBtn').click(function() {
    let itemCode = $('#OrderManage .itemCode').val();
    let existingItem = getItems.find(I => I.itemCode === itemCode);
    
    if (!existingItem) {
        let getItem = {
            itemCode: itemCode,
            itemName: $('#OrderManage .itemName').val(),
            itemPrice: parseFloat($('#OrderManage .itemPrice').val()),
            itemQty: parseInt($('#OrderManage .orderQty').val(), 10),
            total: parseFloat($('#OrderManage .itemPrice').val()) * parseInt($('#OrderManage .orderQty').val(), 10)
        };
        getItems.push(getItem);
        loadTable();
        clearOrderFields();
        setTotal();
    } else {
        alert('Item already added to the order');
    }
});

function loadTable() {
    $('#OrderManage .tableRows').empty();
    $.each(getItems, function(index, item) {
        $('#OrderManage .tableRows').append(
            '<div>' +
            '<div>' + item.itemCode + '</div>' +
            '<div>' + item.itemName + '</div>' +
            '<div>' + item.itemPrice.toFixed(2) + '</div>' +
            '<div>' + item.itemQty + '</div>' +
            '<div>' + item.total.toFixed(2) + '</div>' +
            '</div>'
        );
    });
}

function setTotal() {
    let total = 0;
    $.each(getItems, function(index, item) {
        total += item.total;
    });
    $('#OrderManage .Total').text(total.toFixed(2));
}

// Place Order
$('#OrderManage .placeOrder').click(function() {
    let cash = parseFloat($('#OrderManage .Cash').val());
    let total = parseFloat($('#OrderManage .Total').text());
    let discount = parseFloat($('#OrderManage .Discount').val());

    let subTotal = total - (total * discount / 100);
    $('#OrderManage .SubTotal').text(subTotal.toFixed(2));
    let balance = cash - subTotal;
    $('#OrderManage .Balance').val(balance.toFixed(2));

    let Order = {
        orderId: $('#OrderManage .orderId').val(),
        orderDate: $('#OrderManage .orderDate').val(),
        custId: $('#OrderManage .custId').val(),
        items: getItems,
        total: total,
        discount: discount,
        subTotal: subTotal,
        cash: cash,
        balance: balance
    };

    $.ajax({
        url: 'http://localhost:8080/POS_Back_End_war_exploded/order',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(Order),
        success: function(response) {
            console.log('Order saved successfully');
            updateItemData();
            getItems = [];
            loadTable();
            clearOrderFields();
            refreshOrderManagement();
        },
        error: function(error) {
            console.log('Error saving order:', error);
        }
    });
});

// Update Item Data
function updateItemData() {
    $.each(getItems, function(index, item) {
        let updatedQty = item.itemQty;
        $.ajax({
            url: 'http://localhost:8080/POS_Back_End_war_exploded/item',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                code: item.itemCode,
                qty: updatedQty
            }),
            success: function(response) {
                console.log('Item updated successfully');
            },
            error: function(error) {
                console.log('Error updating item:', error);
            }
        });
    });
}

// Delete Item
$('#OrderManage .tableRows').on('click', 'div', function() {
    let itemCode = $(this).children('div:eq(0)').text();
    let itemIndex = getItems.findIndex(I => I.itemCode === itemCode);
    if (itemIndex !== -1) {
        getItems.splice(itemIndex, 1);
        loadTable();
        setTotal();
    }
});
