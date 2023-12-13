import { partOne, partTwo } from '../../day7'
import path from 'node:path'

describe('== Day 7 == Part One', () => {
  test('it should return 6440', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(6440)
  })
})

describe('== Day 7 == Part Two', () => {
  test('it should return 5905', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partTwo(filePath)).toBe(5905)
  })
})
