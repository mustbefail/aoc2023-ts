"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_path_1 = __importDefault(require("node:path"));
var day01_1 = __importDefault(require("@/day01"));
describe('day01', function () {
    test('should return 142', function () {
        var filePath = node_path_1.default.resolve(__dirname, 'mockups/code.txt');
        expect((0, day01_1.default)(filePath)).toBe(142);
    });
    test('should return 29', function () {
        var filePath = node_path_1.default.resolve(__dirname, 'mockups/code_custom_check.txt');
        expect((0, day01_1.default)(filePath)).toBe(29);
    });
    test('should return 281', function () {
        var filePath = node_path_1.default.resolve(__dirname, 'mockups/code_part_2.txt');
        expect((0, day01_1.default)(filePath)).toBe(281);
    });
});
