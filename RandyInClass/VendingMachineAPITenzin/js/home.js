let ds = new DataService();

var totalDollar = 0;
var gridNumber = 1;
var itemSelected;
var itemId;

// for formats the number into dollar format
var numUSD = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD"
});

function formatItemList(item) {
    //onClick="selectItem('${item.name}')"
    let itemDiv = `<div class="cell" data-index=" ${gridNumber} - ${item.name} " data-itemid='${item.id}'>` + gridNumber + `<br/><br/>${item.name}<br/>${numUSD.format(item.price)}<br/><br/>Quantity Left: ${item.quantity}</div>`
    gridNumber++;
    return itemDiv;

}

function refreshItems(items) {
    gridNumber = 1;
    let listOfItems = $("#itemsList");
    listOfItems.empty();

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        $(listOfItems).append(formatItemList(item));

    }

}

$(document).ready(function () {

    // alert("wassup");
    // refreshItems(ds.getItems());
    ds.displayItems(refreshItems, errorFunc);

    //Adding money handler
    $(document).on('click', '#addDollar', addDollar);
    $(document).on('click', '#addQuarter', addQuarter);
    $(document).on('click', '#addDime', addDime);
    $(document).on('click', '#addNickel', addNickel);

    //Purchase item
    $(document).on('click', '.cell', selectItem);
    $(document).on('click', '#makePurchase', purchaseItem);

    //return change
    $(document).on('click', '#changeReturn', returnChange);


});

function addDollar(event) {
    reset();
    totalDollar += 1;
    $("#dollarInput").val(numUSD.format(totalDollar));
    // alert(totalDollar);

}

function addQuarter(event) {
    reset();
    totalDollar += 0.25;
    $("#dollarInput").val(numUSD.format(totalDollar));
    // alert(totalDollar);

}

function addDime(event) {
    reset();
    totalDollar += 0.10;
    $("#dollarInput").val(numUSD.format(totalDollar));
    // alert(totalDollar);

}

function addNickel(event) {
    reset();
    totalDollar += 0.05;
    $("#dollarInput").val(numUSD.format(totalDollar));
    // alert(totalDollar);

}

function errorFunc(msg) {
    message(msg.responseJSON.message);
}

function returnChange(event) {
    //reset everything to default
    reset();
    $('#item').val('');
    $("#dollarInput").val(numUSD.format(0));
    ds.displayItems(refreshItems, errorFunc);
}

function selectItem() {
    // console.log(itemInfo);
    // console.log(itemNumber);
    itemSelected = $(this).data('index');
    itemId = $(this).data('itemid');
    $('#item').val(itemSelected);
    // $('#item').val(itemId);
    // console.log(itemId);
    $("#dollarInput").val(numUSD.format(0));
    reset();
}

function purchaseItem() {

    // itemSelected = $(this).data('itemid');
    console.log(itemSelected);
    // let itemSelected = $(this).data('itemid');
    // alert(itemSelected);
    // console.log(itemSelected);
    if (itemId == "") {
        message("Please make a selection");
    } else {
        // alert("vend items");
        ds.buyItems(totalDollar, itemId, getChange, errorFunc);
        //refresh the items list
        ds.displayItems(refreshItems, errorFunc);
        totalDollar = 0;
        itemSelected == "";
        message("Thank You!!!");
    }
}

function message(msg) {
    // console.log(msg);
    $('#messages').val(msg);
}

function getChange(coins) {

    let quarter = coins.quarters;
    let dime = coins.dimes;
    let nickel = coins.nickels;
    let penny = coins.pennies;
    var changeMessage = "";

    if (quarter > 0) {
        changeMessage += quarter + " quarter(s), ";
    }
    if (dime > 0) {
        changeMessage += dime + " dime(s), ";
    }
    if (nickel > 0) {
        changeMessage += nickel + " nickel(s),";
    }
    if (penny > 0) {
        changeMessage += penny + " penny(s)";
    }

    $('#changeMessage').val(changeMessage);

    // console.log(coins);
}

function reset() {



    $('#changeMessage').val('');
    message('');

}