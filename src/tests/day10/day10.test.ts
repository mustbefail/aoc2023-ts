import { partOne, partTwo } from '../../day10'
import path from 'node:path'

describe('== Day 10 == Part One', () => {
  test('it should return 8', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(8)
  })
  test('it should return 23', () => {
    const filePath = path.resolve(__dirname, './mockups/input2.txt')
    expect(partOne(filePath)).toBe(23) // result
  })
})

describe('== Day 10 == Part Two', () => {
  test('it should return 4', () => {
    const filePath = path.resolve(__dirname, './mockups/input2.txt')
    expect(partTwo(filePath)).toBe(4) // result
  })
  test('it should return 8', () => {
    const filePath = path.resolve(__dirname, './mockups/input3.txt')
    expect(partTwo(filePath)).toBe(8) // result
  })
  test('it should return 10', () => {
    const filePath = path.resolve(__dirname, './mockups/input4.txt')
    expect(partTwo(filePath)).toBe(10) // result
  })
})
