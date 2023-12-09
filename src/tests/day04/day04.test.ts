import { partOne, partTwo } from '../../day04'
import path from 'node:path'


describe('== Day 4 == Part One', () => {
  test('it should return 13', () => {
    const filePath = path.resolve(__dirname, './mockups/input1.txt')
    partOne(filePath)
  })
})

describe('== Day 4 == Part Two', () => {
  test('it should return 30', () => {
    const filePath = path.resolve(__dirname, './mockups/input1.txt')
    partTwo(filePath)
  })
})
