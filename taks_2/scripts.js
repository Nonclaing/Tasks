$(document).ready(function () {
    let row = $('.row');
    let elements = row.children();
    let count = elements.length;

    changeHeight(row, elements, count);
    $(window).resize(function () {
        changeHeight(row, elements, count);
    })
});

function changeHeight (row, elements, count) {
    let size = row.width();
    let elementWidth = elements.eq(0).outerWidth();
    let countInRow = Math.floor(size / elementWidth);

    for (let i = 0; i < count ; i += countInRow + 1) {
        let maxHeight = findMaxInRow(elements, i, countInRow);
        SetHeight(elements, i, countInRow, maxHeight);
    }
}

function findMaxInRow(elements, firstElement, countInRow) {
    let maxHeight = 0;
    for (let j = firstElement; j < countInRow; j++) {
        let childHeight = elements.eq(j).outerHeight();
        if (childHeight > maxHeight)
            maxHeight = childHeight;
    }
    return maxHeight;
}
function SetHeight(elements, firstElement, countInRow, Height) {
    for (let j = firstElement; j < countInRow && j < elements.length; j++) {
        elements.eq(j).height(Height);
    }
}