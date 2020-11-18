//dollar , quarter, dine , nickle
var arr = [0,0,0,0]; 
var total = 0.0;
var coinsAdded = false; 

//selected item
var itemId = ""; 
var itemPrice = 0.0; 
var itemWasSelected = false; 

$("#dollar").on('click' ,function(){
    arr[0] = Number(arr[0]+1); 
    updateTotal();
});
$("#quarter").on('click' ,function(){
    arr[1] = Number(arr[1]+1); 
    updateTotal();
});
$("#dime").on('click' ,function(){
    arr[2] = Number(arr[2]+1); 
    updateTotal();
});
$("#nickle").on('click' ,function(){
    arr[3] = Number(arr[3]+1); 
    updateTotal();
});


function updateTotal(){
    let totalL = arr[0]+arr[1]*.25+arr[2]*.10+arr[3]*.05; 
    totalL = parseFloat(totalL);
    $("#money").val(totalL.toFixed(2)); 
    total = Number(totalL); 
    coinsAdded = new Boolean(true);
    calculatePriceDifference();
}


$("#changeReturn").on('click' ,function(){
    let change = $("#change");
    let st = ""
    if(coinsAdded==false){
        st = "No Coins were added"; 
    }else{
       
        if(arr[0]>0){
            st = arr[0]+"-Dollar"
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
        ///////////////////////////////////clear the forms totalin, messages, item selection , reset all the global variables , 
        resetMachine();
        change.val(st); 
        setTimeout(function(){
            change.val(""); 
        },3000);    
});


function resetMachine(){
    $("#change").val("");
    $("#message").val("");
    $("#money").val("");
    $("#itemSelected").val(""); 

    arr = [0,0,0,0]; 
    total = 0.0;
    coinsAdded = false; 
    itemId = ""; 
    itemPrice = 0.0; 
    itemWasSelected = false; 
}

$("#makePurchase").on('click' ,function(){
    MakePurchase();
});

function MakePurchase(){
    let change = $("#change");  //display the changes here 
    let message = $("#message");  // display items 
 

    //if(total>=itemPrice){
            $.ajax ({
            type: 'POST',
            url: 'http://tsg-vending.herokuapp.com/money/'+total+'/item/'+itemId,
            success: function (data, status) {
                let d = data; 
                //d = {quarters: 0, dimes: 0, nickels: 0, pennies: 1}
                let st = "";
                if(d.quarters>0){
                    st = d.quarters+" Quarters "
                }
                if(d.dimes>0){
                    st = st+d.dimes+" Dimes "
                }
                if(d.nickels>0){
                    st = st+d.nickels+" Nickels "
                }
                if(d.pennies>0){
                    st = d.pennies+" Pennies "
                }
              
                change.val(st);
                message.val(st.toString);
                loadItems(); 



            },
            error: function(data, status) {   
                let dd = data; 
                console.log(dd);
                console.log();
                message.val(dd.responseJSON.message);
            // $('#errorMessages')
            //     .append($('<li>')
            //     .attr({class: 'list-group-item list-group-item-danger'})
            //     .text('Error calling web service.  Please try again later.'));
            }
    });

   // }


}


function loadItems(){
    $("#itemHolder").empty();
    let holder = $("#itemHolder"); 
    holder.empty();
    $.ajax ({
            type: 'GET',
            url: 'http://tsg-vending.herokuapp.com/items',
            success: function (data, status) {
                let d = data; 
                for(let i=0;i<d.length;i++){
                    holder.append(formatData(d[i])); 
                }
            },
            error: function() {    
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
            }
    });
}

function formatData(item){
    let st = 
    `<div id="items${item.id}" onclick="selectedItem(`+item.id+`)"class = "col-md-4 btn" style="border:solid blue">`+
    `<p id='itemCounter${item.id}' style='text-align: justify'>`+item.id+`</p><br>`+
    `<P id='itemName${item.id}'>`+item.name+`</P><br>`+
    `<p id='price${item.id}'>$`+item.price.toFixed(2)+`</p><br>`+
    `<p id='quantity${item.id}'>Quantity Left: `+item.quantity+`</p>`+
    "</div>"; 
    return st; 
}

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

function calculatePriceDifference(){
    if(this.itemWasSelected && this.coinsAdded){
        let toShow = this.itemPrice -  Number(this.total); 
        if(toShow>0){
            toShow = toShow.toFixed(2);
            $('#message').val("Please deposit $"+toShow);
        }
        else{
            $('#message').val("Purchase ready");
        }
    }else if(this.itemWasSelected){
        $('#message').val("Please deposit $"+this.itemPrice.toFixed(2)); 
    }
}

   // $(document).on('click','#items',function(e) {
   //  	//e.preventDefault(); 
   //  	let aa = $(this).data("dvdid"); 
   //      console.log(aa);
    	
   //  });

$(document).ready(function(){
    loadItems(); 




}); 