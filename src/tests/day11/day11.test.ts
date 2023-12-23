import { partOne, partTwo } from '../../day11'
import path from 'node:path'

describe('== Day 11 == Part One', () => {
  test('it should return 374', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partOne(filePath)).toBe(374)
  })
})

describe('== Day 11 == Part Two', () => {
  test('it should return 82000210', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    expect(partTwo(filePath)).toBe(82000210)
  })
})
