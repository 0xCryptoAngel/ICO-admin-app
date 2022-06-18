export const getEllipsisTxt = (str, n = 6) => {
    return str;
    if (str.trim()) {
        return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
};
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}
export const floatConverter = (value) => {
    if (value == parseInt(value)) return value;
    const len = 1 / value;
    if (getBaseLog(10, len) > 4) {
        let multipled = value * 10 ** parseInt(getBaseLog(10, len) - 2);
        return "0.00.." + multipled.toFixed(6).toString().slice(4);
    } else if (value < 1) return value.toFixed(5);
    else if (value < 10) return value.toFixed(4);
    return value.toFixed(3);
};
