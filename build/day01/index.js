"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = __importDefault(require("node:fs"));
var numbersDict = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
var numbersNames = Object.keys(numbersDict);
function convertToDigit(substr) {
    if (!substr || substr.length < 3)
        return '';
    var number = '';
    numbersNames.forEach(function (name) {
        if (substr.includes(name)) {
            var replaced = substr.replace(new RegExp(name), "".concat(numbersDict[name]));
            number = replaced.replace(/[^0-9]+/g, '');
        }
    });
    return number;
}
function findNumbers(str) {
    var first, last;
    for (var i = 0; i <= str.length; i += 1) {
        first = convertToDigit(str.slice(0, i));
        if (first) {
            break;
        }
        else if (!isNaN(parseInt(str[i]))) {
            first = str[i];
            break;
        }
    }
    for (var i = str.length - 1; i >= 0; i -= 1) {
        last = convertToDigit(str.slice(i));
        if (last) {
            break;
        }
        else if (!isNaN(parseInt(str[i]))) {
            last = str[i];
            break;
        }
    }
    return "".concat(first).concat(last === null || last === void 0 ? void 0 : last.slice(-1));
}
function trebuchet(filePath) {
    return node_fs_1.default
        .readFileSync(filePath, 'utf-8')
        .trim()
        .split('\n')
        .reduce(function (acc, el) {
        var numbers = findNumbers(el);
        return acc + Number(numbers);
    }, 0);
}
exports.default = trebuchet;
