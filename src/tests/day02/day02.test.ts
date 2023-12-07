import { readFileSync } from 'fs'
import path from 'node:path'
import cubeConundrum from '../../day02'

describe('== DAY 2 Cube Conundrum ==', () => {
  test('it should return 0', () => {
    const filePath = readFileSync(
      path.resolve(__dirname, 'mockups/records.txt'),
    )
    expect(cubeConundrum(filePath)).toBe(0)
  })
})
