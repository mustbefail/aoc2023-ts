import path from 'node:path'
import { partOne, partTwo } from '../../day3'

describe('== DAY 3 == Part One', () => {
  test('it should return 4361', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(4361)
  })
})

describe('== DAY 3 == Part Two', () => {
  test('Power of cubes should be 467835', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partTwo(filePath)).toBe(467835)
  })
})
