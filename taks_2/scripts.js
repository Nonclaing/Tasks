$(document).ready(function () {
    makeAdaptiveHeight();
});

/**
 * Адаптирует высоту списка c классом 'row'
 *
 * @return {void} адаптирует высоту блоков в строках
 */
function makeAdaptiveHeight() {
    /**
     * @property {Object} row - объект списка для выравнивания
     * @property {Object} elements - элементы списка
     * @property {number} count - количество элементов в списке
     * @property {number} margin - нижний осттуп строк
     */
    let row = $('.row');
    let elements = row.children();
    let count = elements.length;
    let margin = parseInt(elements.eq(0).children().css('margin-bottom'));

    changeHeight(row, elements, count, margin);
    $(window).resize(function () {
        changeHeight(row, elements, count, margin);
    })
}

/**
 * Адаптирует высоту списка c классом 'row'
 *
 * @param {Object} row - объект списка для выравнивания
 * @param {Object} elements -  элементы списка
 * @param {number} count - количество элементов в списке
 * @param {number} margin - нижний осттуп строк
 * @return {void} адаптирует высоту блоков в строках
 */
function changeHeight (row, elements, count, margin) {
    /**
     * @property {number} size - ширина списка
     * @property {number} elementWidth - ширина каждого элемента
     * @property {number} countInRow - количество элементов в строке
     * @property {number} maxHeight - максимальная высота элемента в строке
     */
    let size = row.width();
    let elementWidth = elements.eq(0).outerWidth();
    let countInRow = Math.ceil(size / elementWidth);

    for (let i = 0; i < count ; i += countInRow + 1) {
        let maxHeight = findMaxInRow(elements, i, countInRow);
        SetHeight(elements, i, countInRow, maxHeight, margin);
    }
}

/**
 * Находит максимальный по высоте элемент в строке списка
 *
 * @param {Object} elements - элементы списка
 * @param {number} firstElement - первый элемент в будущей строке
 * @param {number} countInRow - количество элементов в строке
 * @return {number} maxHeight - высота максимального элемента
 */
function findMaxInRow(elements, firstElement, countInRow) {
    /**
     * @property {number} maxHeight - максимальная высота элемента
     * @property {number} childHeight - высота элемента для сравнения
     */
    let maxHeight = 0;
    for (let j = firstElement; j < countInRow; j++) {
        let childHeight = elements.eq(j).children().outerHeight();
        if (childHeight > maxHeight)
            maxHeight = childHeight;
    }
    return maxHeight;
}

/**
 * Устанавлиает всем элементам в строке максимальную высоту
 *
 * @param {Object} elements - элементы списка
 * @param {number} firstElement - номер первого элемента в будущей строке
 * @param {number} countInRow - количество элементов в строке
 * @param {number} Height - размер максимального элемента в строке
 * @param {number} margin - нижний отступ во всей строке
 * @return {void} - устанавливает элементам строки высоту
 */
function SetHeight(elements, firstElement, countInRow, Height, margin) {
    for (let j = firstElement; j < countInRow && j < elements.length; j++) {
        elements.eq(j).height(Height + margin)
    }
}