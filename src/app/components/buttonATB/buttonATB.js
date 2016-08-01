var bATB = angular.module('buttonAtTheBottom');
    bATB.directive('radButton', function () {
        function link(scope, element, attrs) {
            // element - это кнопка

            // Идея такая
            // Если содержимое вполне умещается на экране, то тупо всем родителям устанавливаем высоту 100%
            // Иначе parent'у высоту auto, previousSibling от parent'а 100% и скроллинг
            // Вопрос: как определить, что всё умещается?

            // сначала соберём всех родителей
            var parents = [];
            var curElement = element[0];
            for (;;) {
                curElement = curElement.parentElement;
                if (curElement == null) break;
                else parents.push(curElement);
            }

            // проставим высоту (кроме непосредственного родителя)
            for (var i = 1; i < parents.length; i++) {
//                 parents[i].css({
//                     height: "100%"
//                 })
                parents[i].style.height = "100%";
            }

            // самое скользкое место
            // определяем, будет ли скроллинг
            // т е надо взять высоту "дедушки" в пикселах и посчитать, умещаются ли его детки
            var a = 75;

        }
        return {
            restrict: "A",
            link: link
        };
    });
