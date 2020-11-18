var DataService = function () {
    var self = this;

    const itemList = [

        {
            id: 0,
            name: "Elephant",
            price: 0.99,
            quantity: 1
        }
    ];

    //http://tsg-vending.herokuapp.com/items/


    //////////////////////////////////////////////////
    //Data Manipulation methods

    // self.getItems = function () {
    //     return itemList;
    // }

    self.displayItems = function (callback, errorFunc) {
        $.ajax({
            url: 'http://tsg-vending.herokuapp.com/items',
            method: 'GET',
            success: callback,
            error: errorFunc
        })
    }

    self.buyItems = function (dollarAmount, itemId, callback, errorFunc) {
        $.ajax({
            url: 'http://tsg-vending.herokuapp.com/money/' + dollarAmount + '/item/' + itemId,
            method: 'POST',
            success: callback,
            error: errorFunc
        })
    }
}