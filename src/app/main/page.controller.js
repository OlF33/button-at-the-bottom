angular.module("buttonAtTheBottom").controller('PageController', ['$document', function($document) {
    var vm = this;
    vm.header = 'Button at the bottom';
    vm.quantity = "1";
    vm.text = "Строка №";
    vm.list = [1];
    vm.onQuantityChange = function() {
        var vm = this;
        vm.list = [];
        var elem = $document[0].getElementById("repeatQuantity");
        var txQuan = elem.value;
        var quan = +txQuan;
        if (quan <= 0) return;
        for(var i1 = 1; i1 <= quan; i1++) {
            vm.list.push(i1);
        }
    }
    vm.OnClick = function() {
        alert("It's OK");
    }
}]);
