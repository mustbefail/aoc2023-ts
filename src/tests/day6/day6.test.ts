import { partOne, partTwo } from '../../day6'
import path from 'node:path'


describe('== Day 6 == Part One', () => {
  test('it should return 288', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(288)
  })
})

describe('== Day 6 == Part Two', () => {
  test('it should return 71504', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partTwo(filePath)).toBe(71504)
  })
})
