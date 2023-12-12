import { partOne, partTwo } from '../../day6'
import path from 'node:path'


describe('== Day 6 == Part One', () => {
  test('it should return 288', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    partOne(filePath)
  })
})

describe('== Day 6 == Part Two', () => {
  test('it should return 46', () => {
    const filePath = path.resolve(__dirname, './mockups/input.txt')
    partTwo(filePath)
  })
})
