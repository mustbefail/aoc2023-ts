import { partOne, partTwo } from '../../day5'
import path from 'node:path'


describe('== Day 5 == Part One', () => {
  test('it should return 35', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(35)
  })
})

describe('== Day 5 == Part Two', () => {
  test('it should return 46', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partTwo(filePath)).toBe(35)
  })
})
