const HUNDRED_MILLION = 100000000;
const TEN_THOUSAND = 10000;
num2str.$inject = [];
export default function num2str() {
    return function(num) {
        // if (typeof num === 'number' || num instanceof Number) {
        if (Object.prototype.toString.call(num) === '[object Number]') {
            if (num >= HUNDRED_MILLION) {
                num = Math.round(num / HUNDRED_MILLION) + '亿';
            } else if (num >= TEN_THOUSAND) {
                num = Math.round(num / TEN_THOUSAND) + '万';
            }
        }
        return num;
    }
}