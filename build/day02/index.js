"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function cubeConundrum(inputPath) {
    var res = (0, fs_1.readFileSync)(inputPath, 'utf-8').trim().split('\n');
    console.log(res);
    return 0;
}
exports.default = cubeConundrum;
