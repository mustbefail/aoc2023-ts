import { readFileSync } from 'fs'
import path from 'node:path'
import { partOne, partTwo } from '../../day02'

describe('== DAY 2 == Part One', () => {
  test('it should return 8', () => {
    const filePath = path.resolve(__dirname, './mockups/records.txt')

    expect(partOne(filePath)).toBe(8)
  })
})

describe('== DAY 2 == Part Two', () => {
  test('Power of cubes should be ', () => {
    const filePath = path.resolve(__dirname, './mockups/records.txt')
    expect(partTwo(filePath)).toBe(2286)
  })
})
