/**
 * a
 * @param value1 {number|string}
 * @param value2 {number|string}
 * @param fractionDigits {number}
 * @returns {number}
 */
function percentage(value1, value2, fractionDigits = 2) {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    if (!isNaN(v1) && !isNaN(v2)) {
        return parseFloat(((v1 / v2) * 100).toFixed(fractionDigits));
    } else {
        return NaN;
    }
}

export {
    percentage,
};
