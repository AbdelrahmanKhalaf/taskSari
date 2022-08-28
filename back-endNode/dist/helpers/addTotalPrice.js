"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.totla = void 0;
function totla(array) {
    var total = 0;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        total += element.totalPrice;
    }
    return total;
}
exports.totla = totla;
//# sourceMappingURL=addTotalPrice.js.map