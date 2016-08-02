angular.module("buttonAtTheBottom").controller('PageController', ['$document', function($document) {
    var vm = this;
    vm.header = 'Button at the bottom';
    vm.quantity = "20";
    vm.text = "Строка №";
    vm.onQuantityChange = function() {
        var vm = this;
        vm.list = [];
        var elem = $document[0].getElementById("repeatQuantity");
        var txQuan = vm.quantity ? vm.quantity : elem.value;
        var quan = parseInt(txQuan);
        if (quan <= 0) return;
        for(var i1 = 1; i1 <= quan; i1++) {
            vm.list.push(i1);
        }
    }
    vm.OnClick = function() {
        alert("It's OK");
    }
    vm.onQuantityChange();
}]);
