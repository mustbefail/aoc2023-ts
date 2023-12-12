import path from 'node:path'
import { partOne, partTwo } from '../../day3'

describe('== DAY 3 == Part One', () => {
  test('it should return 8', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(4361)
  })
})

describe('== DAY 3 == Part Two', () => {
  test('Power of cubes should be ', () => {
    const filePath = path.resolve(__dirname, './mockups/records.txt')
    expect(partTwo(filePath)).toBe(2286)
  })
})
