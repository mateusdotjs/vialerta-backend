"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = exports.getAll = void 0;
const cheerio = __importStar(require("cheerio"));
function getAll(html) {
    let dados = [];
    const $ = cheerio.load(html);
    const listaLinhas = $("ol").find("li");
    for (let i = 0; i < listaLinhas.length; i++) {
        dados[i] = {
            id: $(listaLinhas[i]).find("span[title]").text(),
            titulo: $(listaLinhas[i]).find("span").attr("title"),
            status: $(listaLinhas[i]).find(".status").text(),
        };
    }
    //tratamento das strings
    let linhas = dados.map((linha) => {
        let titulo;
        if (linha.titulo.includes("-")) {
            let arr = linha.titulo.split("-");
            titulo = `${arr[1].trim()}`;
        }
        else {
            let maiusculo = linha.titulo.slice(0, 1);
            let minusculo = linha.titulo.slice(1).toLowerCase();
            titulo = `${maiusculo}${minusculo}`;
        }
        return {
            id: linha.id,
            titulo,
            status: linha.status === "Circulação de Trens"
                ? "Velocidade reduzida"
                : linha.status,
        };
    });
    return linhas;
}
exports.getAll = getAll;
function getOne(linhas, id) {
    const [linha] = linhas.filter((item) => item.id == id);
    if (!linha)
        throw new Error("Linha inexistente");
    return linha;
}
exports.getOne = getOne;
