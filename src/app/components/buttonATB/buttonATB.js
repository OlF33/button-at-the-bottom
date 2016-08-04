var bATB = angular.module('buttonAtTheBottom');
    bATB.directive('radButton', function () {
        function link(scope, element, attrs) {
            // element - это кнопка

            // Идея такая
            // Если содержимое вполне умещается на экране, то тупо всем родителям устанавливаем высоту 100%
            // Иначе parent'у высоту auto, previousElementSibling от parent'а 100% и скроллинг
            // Вопрос: как определить, что всё умещается?

            // Однако есть решение проще
            // "Папе" сделать высоту кнопки + margin, а "дяде" - 100% и scroll=auto
            // Это и лучше, потому что не надо реагировать на resize

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
                parents[i].style.height = "100%";
            }

            // Нам понадобятся непосредственный родитель ("папа") и его "брат" previousElementSibling ("дядя")
            var dad = parents[0];
            var uncle = dad;
            var limit = parseInt(attrs.radButton == "" ? "1" : attrs.radButton);
            for (i = 0; i < limit; i++) {
                uncle = uncle.previousElementSibling;
            }

            //var styles = window.getComputedStyle(element[0]);
            //var margin = parseInt(styles['marginTop']) + parseInt(styles['marginBottom']);
            //var dadsHeight = element[0].offsetHeight + margin;
            //dad.style.height = dadsHeight + "px";
            // "Папу" вообще не надо трогать, и так хорошо.
            // А если нехорошо, раскомментировать строки 33-36 и посмотреть,
            // что мешает установить нормальную высоту.
            // Например, flex может мешать.
            uncle.style.height = "100%";
            uncle.style.overflowY = "auto"
        }
        return {
            restrict: "A",
            link: link
        };
    });
