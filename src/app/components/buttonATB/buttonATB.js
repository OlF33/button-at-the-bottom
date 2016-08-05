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

//               README
// Задача: есть <div layout="column">
// Он содержит 1 элемент (условно назовём его form), высота которого непредсказуема,
//   и 1 кнопку, которая должна располагаться в самом низу экрана.
//
// Решение:
// Кнопку помещаем в отдельный <div layout="column" layout-align="end end">
// (надо сделать руками).
// Кнопке устанавливаем атрибут rad-button.
// Если между form и div с кнопкой присутствуют ещё элементы, то нужно указать
//   директиве, сколько раз надо брать previousElementSibling, то есть количество
//   промежуточных элементов + 1.
// Например, если 1 элемент, устанавливаем rad-button="2".
// Если 10 промежуточных элементов, устанавливаем rad-button="11".
//
// Директива устанавливает для form вертикальный скроллинг auto и высоту 100%,
//   а также высоту 100% всем родителям.
// Таким образом, если элемент form занимает слишком мало места, он растянется
//   на всю доступную ему высоту, и div с кнопкой окажется внизу.
// А если элемент form занимает слишком много места, в нём включится скроллинг,
//    и он не вытеснит кнопку за пределы экрана, то есть div с кнопкой и в этом
//    случае окажется внизу.
