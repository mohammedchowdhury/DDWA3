//dollar , quarter, dine , nickle
let ds = new DataService();

var arr = [0,0,0,0]; 
var total = 0.0;
var coinsAdded = false; 

//selected item
var itemId = ""; 
var itemPrice = 0.0; 
var itemWasSelected = false; 

function resetMachine(){
    $("#money").val("");
    $("#itemSelected").val(""); 

    arr = [0,0,0,0]; 
    total = 0.0;
    coinsAdded = false; 
    itemId = ""; 
    itemPrice = 0.0; 
    itemWasSelected = false; 
}

function getChange(coins){
    let change = $("#change");  //display the changes here 
    let st = ""; 

    if(coins.quarters>0){
        st = String(coins.quarters)+" Quarters "
    }
    if(coins.dimes>0){
        st = st+String(coins.dimes)+" Dimes "
    }
    if(coins.nickels>0){
        st = st+String(coins.nickels)+" Nickels "
    }
    if(coins.pennies>0){
        st = st+String(coins.pennies)+" Pennies "
    } 
    change.val(st);
    resetMachineAfterPurchase();
}

 function resetMachineAfterPurchase(){    
        $("#message").val("Thank you enjoy your "+$("#itemName"+itemId).text());
        resetMachine();
        setTimeout(function(){
            $("#change").val("");
            $("#message").val("");
        },4000); 
        loadItems(); 
}

//call to the dataservice
function MakePurchase(){
    ds.purchaseItem(total, itemId, getChange, errorFunc); 
}

function errorFunc(data){
    let message = $("#message");
    message.val(data.responseJSON.message);
}

function loadItems(){
    ds.getItems(displayItems, errorFunc);
}
function displayItems(items){
    let holder = $("#itemHolder"); 
    holder.empty();
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        holder.append(formatData(item,i+1)); 
    }
}
//formatting data coming from api
function formatData(item,index){
    let st = 
    `<div id="items${item.id}" onclick="selectedItem(`+item.id+`)"class = "col-md-4 btn" style="border:solid blue">`+
    `<p id='itemCounter${item.id}' style='text-align: justify'>`+index+`</p><br>`+
    `<P id='itemName${item.id}'>`+item.name+`</P><br>`+
    `<p id='price${item.id}'>$`+item.price.toFixed(2)+`</p><br>`+
    `<p id='quantity${item.id}'>Quantity Left: `+item.quantity+`</p>`+
    "</div>"; 
    return st; 
}

function calculatePriceDifference(){
    if(this.itemWasSelected && this.coinsAdded){
        let toShow = this.itemPrice -  Number(this.total); 
        if(toShow>0){
            toShow = toShow.toFixed(2);
            $('#message').val("💵 Please deposit $"+toShow);
        }
        else{
            $('#message').val("Purchase ready 🐻");
        }
    }else if(this.itemWasSelected){
        $('#message').val("💵 Please deposit $"+this.itemPrice.toFixed(2)); 
    }
}

//selecting item Buttons
function selectedItem(data){
    let itemName = $("#itemCounter"+data).text() + " - " +$("#itemName"+data).text(); 
    let itemSelection =$("#itemSelected"); 
    itemSelection.val(itemName); 
    let price = $(`#price${data}`).text();
    price = price.replace("$","");
    itemPrice = Number(price);
    itemWasSelected = true; 
    itemId = data;
    calculatePriceDifference();
}
//updates the total
function updateTotal(){
    let totalL = arr[0]+arr[1]*.25+arr[2]*.10+arr[3]*.05; 
    totalL = parseFloat(totalL);
    $("#money").val(totalL.toFixed(2)); 
    total = Number(totalL); 
    coinsAdded = new Boolean(true);
    calculatePriceDifference();
}

//adding money Buttons
function addDollar(){
    arr[0] = Number(arr[0]+1); 
    updateTotal();
}
function addQuarter(){
    arr[1] = Number(arr[1]+1); 
    updateTotal();
}
function addDime(){
    arr[2] = Number(arr[2]+1); 
    updateTotal();
}
function addNickel(){
    arr[3] = Number(arr[3]+1); 
    updateTotal();
}

function chnangeReturn(){
    let change = $("#change");
    let st = ""
    if(coinsAdded==false){
        st = "No Coins were added"; 
    }else{
        if(arr[0]>0){
            arr[1] = arr[1]+arr[0]*4;  
        }
        if(arr[1]>0){
            st = st+" "+arr[1]+"-Quarter"
        }
        if(arr[2]>0){
            st = st+" "+arr[2]+"-Dime"
        }
        if(arr[3]>0){
            st = st+" "+arr[3]+"-Nickle"
        }
        change.val(st); 
    }  
//clear the forms, total in, messages, item selection , reset all the global variables 
        resetMachine();
        change.val(st); 
        $("#message").val("Dispensing coins 💰");
        setTimeout(function(){
            change.val(""); 
            $("#message").val("");
        },3000);    
}

$(document).ready(function(){
    loadItems(); 
    $(document).on('click', '#dollar', addDollar);
    $(document).on('click', '#quarter', addQuarter);
    $(document).on('click', '#dime', addDime);
    $(document).on('click', '#nickle', addNickel);

    $(document).on('click', '#makePurchase', MakePurchase);
    $(document).on('click', '#changeReturn', chnangeReturn);
}); 