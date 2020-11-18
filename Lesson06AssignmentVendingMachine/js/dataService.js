var DataService = function () {
    var self = this;
    self.getItems = function (callback, errorFunc) {
        $.ajax({
            url: 'http://tsg-vending.herokuapp.com/items',
            method: 'GET',
            success: callback,
            error: errorFunc
        })
    }

    self.purchaseItem = function (total, itemId, callback, errorFunc) {
        $.ajax({
            url: 'http://tsg-vending.herokuapp.com/money/'+total+'/item/'+itemId,
            method: 'POST',
            success: callback,
            error: errorFunc
        })
    }
}