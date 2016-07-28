angular.module("buttonAtTheBottom").controller('PageController', function($scope) {
    $scope.header = 'Button at the bottom';
    $scope.quantity = "1";
    $scope.text = "Строка №";
    $scope.list = [1];
    $scope.onQuantityChange = function() {
        $scope.list = [];
        var elem = document.getElementById("repeatQuantity");
        var txQuan = elem.value;
        var quan = +txQuan;
        if (quan <= 0) return;
        for(i = 1; i <= quan; i++) {
            $scope.list.push(i);
        }
        elem.ngChange="onQuantityChange()"
    }
});
