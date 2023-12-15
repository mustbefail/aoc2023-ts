import { partOne, partTwo } from '../../day9'
import path from 'node:path'

describe('== Day 9 == Part One', () => {
  test('it should return 114', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(114)
  })
})

describe('== Day 9 == Part Two', () => {
  test('it should return 2', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partTwo(filePath)).toBe(2) // result
  })
})
