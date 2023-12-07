"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var day01_1 = __importDefault(require("./day01"));
var node_path_1 = __importDefault(require("node:path"));
var day02_1 = __importDefault(require("@/day02"));
var ANSWERS = {
    day01: function (path) { return (0, day01_1.default)(path); },
    day02: function (path) { return (0, day02_1.default)(path); },
};
console.log(ANSWERS.day02(node_path_1.default.resolve(__dirname, 'tests/day02/mockups/records.txt')));
