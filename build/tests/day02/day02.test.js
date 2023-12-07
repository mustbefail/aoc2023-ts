"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var node_path_1 = __importDefault(require("node:path"));
var day02_1 = __importDefault(require("@/day02"));
describe('== DAY 2 Cube Conundrum ==', function () {
    test('it should return 0', function () {
        var filePath = (0, fs_1.readFileSync)(node_path_1.default.resolve(__dirname, 'mockups/records.txt'));
        expect((0, day02_1.default)(filePath)).toBe(0);
    });
});
