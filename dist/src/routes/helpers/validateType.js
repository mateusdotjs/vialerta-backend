"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateType = void 0;
function validateType(type) {
    const types = [
        "Velocidade reduzida",
        "Paralisada - falha nos trens",
        "Greve",
        "Todas",
    ];
    const validation = types.includes(type);
    return validation;
}
exports.validateType = validateType;
