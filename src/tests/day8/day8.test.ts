import { partOne, partTwo } from '../../day8'
import path from 'node:path'

describe('== Day 8 == Part One', () => {
  test('it should return 2', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(2) // result
  })
  test('it should return 6', () => {
    const filePath = path.resolve(__dirname, './mockups/input2.txt')
    expect(partOne(filePath)).toBe(6) // result
  })
})

describe('== Day 8 == Part Two', () => {
  test('it should return 6', () => {
    const filePath = path.resolve(__dirname, './mockups/input3.txt')
    expect(partTwo(filePath)).toBe(6)
  })
})
